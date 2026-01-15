import { google } from "googleapis";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"],
});

export async function POST(req: Request) {
  try {
    const { name, email, time, description } = await req.json();

    let start = new Date(time);
    if (isNaN(start.getTime())) {
        console.warn("Invalid time received, defaulting to now");
        start = new Date();
    }
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    // Generate a Jitsi Meet link since Service Accounts cannot create Google Meets without DWD
    const meetingId = `CodeGang-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const videoLink = `https://meet.jit.si/${meetingId}`;
    console.log("Generated Video Link:", videoLink);

    const event = {
      summary: `Consultation with ${name}`,
      description: `Description: ${description}\n\nContact: ${email}\n\nVideo Meeting Link: ${videoLink}`,
      location: videoLink,
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() },
    };

    // Attempt to use the SMTP email as the calendar ID (assuming the user shared their calendar with the service account)
    // If not, it falls back to 'primary' which is the service account's own calendar
    const calendarId = process.env.GOOGLE_CALENDAR_ID || process.env.SMTP_EMAIL || "primary";

    const calendar = google.calendar({ version: "v3", auth });
    
    // Insert event without conference data first to avoid 400 errors with Service Accounts
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    const meetLink = response.data.hangoutLink;
    const eventId = response.data.id;
    const eventLink = response.data.htmlLink;

    // Send confirmation email manually since we couldn't add them as an attendee
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Generate ICS content for the calendar attachment
    const formatDateForICS = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//CodeGang//Consultation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${eventId}@codegang.com`,
      `DTSTAMP:${formatDateForICS(new Date())}`,
      `DTSTART:${formatDateForICS(start)}`,
      `DTEND:${formatDateForICS(end)}`,
      `SUMMARY:${event.summary}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${videoLink}`,
      `ORGANIZER;CN=CodeGang:mailto:${process.env.SMTP_EMAIL}`,
      `ATTENDEE;RSVP=TRUE;CN=${name};X-NUM-GUESTS=0:mailto:${email}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Consultation Scheduled - Add to Calendar',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #00d26a;">Consultation Confirmed</h2>
          <p>Hi ${name},</p>
          <p>Your consultation has been successfully scheduled.</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Time:</strong> ${start.toLocaleString()}</p>
            <p><strong>Topic:</strong> ${description}</p>
            <p><strong>Meeting Link:</strong> <a href="${videoLink}" style="color: #00d26a; font-weight: bold;">Join Video Call</a></p>
            ${eventLink ? `<p><small><a href="${eventLink}" style="color: #888;">View Calendar Event</a></small></p>` : ''}
          </div>
          <p><strong>Please open the attached "invite.ics" file to add this event to your calendar.</strong></p>
          <p>If you need to reschedule, please reply to this email.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'invite.ics',
          content: icsContent,
          contentType: 'text/calendar; method=REQUEST'
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      videoLink,
      eventId
    });
  } catch (err: any) {
    console.error("Calendar/Email error:", err);
    return NextResponse.json({ error: err.message || "Failed to schedule meeting" }, { status: 500 });
  }
}
