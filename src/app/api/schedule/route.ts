import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const { name, email, time, description } = await req.json();

        if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/calendar.events"],
        });

        const calendar = google.calendar({ version: "v3", auth });

        const startTime = new Date(time);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

        const event = {
            summary: `Consultation with ${name}`,
            description: `Description: ${description}\n\nContact: ${email}`,
            start: {
                dateTime: startTime.toISOString(),
            },
            end: {
                dateTime: endTime.toISOString(),
            },
            // attendees: [{ email }], // Removed to prevent Service Account error (No DWD)
            conferenceData: {
                createRequest: {
                    requestId: Math.random().toString(36).substring(7),
                },
            },
        };

        const response = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
            requestBody: event,
            conferenceDataVersion: 1,
        });

        const meetLink = response.data.htmlLink;

        // Send email invitation manually
        if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.SMTP_EMAIL,
                        pass: process.env.SMTP_PASSWORD,
                    },
                });

                const mailOptions = {
                    from: process.env.SMTP_EMAIL,
                    to: [email, "codegang0077@gmail.com"],
                    subject: `Consultation Scheduled: ${startTime.toLocaleString()}`,
                    html: `
                    <h2>Consultation Confirmed</h2>
                    <p>Hi ${name},</p>
                    <p>Your consultation has been scheduled for <strong>${startTime.toLocaleString()}</strong>.</p>
                    <p>Details: ${description}</p>
                    <p><a href="${meetLink}">Join Google Meet</a></p>
                    <p>Link: ${meetLink}</p>
                    <br/>
                    <p>Best regards,<br/>The Team</p>
                `,
                };

                await transporter.sendMail(mailOptions);
                console.log("Invitation email sent to", email);
            } catch (mailError) {
                console.error("Failed to send email invite:", mailError);
                // Don't fail the request if email fails, but maybe log it
            }
        }

        return NextResponse.json({ success: true, link: meetLink });
    } catch (error: any) {
        console.error("Calendar Error:", error);
        return NextResponse.json({ success: false, error: error.message || "Failed to schedule call" }, { status: 500 });
    }
}
