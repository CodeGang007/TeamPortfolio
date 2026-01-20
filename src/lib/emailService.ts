interface Developer {
    name: string;
    email: string;
    role: string;
}

interface ProjectEmailData {
    projectName: string;
    clientName: string;
    clientEmail: string;
    developers: Developer[];
}

export const emailService = {
    async sendTeamAssignmentEmail(data: {
        developers: { name: string; email: string }[];
        projectName: string;
        projectId: string;
        clientName: string;
    }) {
        const { developers, projectName, projectId, clientName } = data;
        const projectUrl = `https://codegang.online/dashboard/projects/${projectId}`;
        const allEmails = developers.map(d => d.email).join(", ");
        const developerNames = developers.map(d => d.name).join(", ");

        const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #09090b; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; }
            .header { background-color: #09090b; padding: 30px; text-align: center; border-bottom: 1px solid #27272a; }
            .content { padding: 40px 30px; }
            .footer { background-color: #0f0f10; padding: 20px; text-align: center; font-size: 12px; color: #52525b; border-top: 1px solid #27272a; }
            .button { display: inline-block; background-color: #00ff9d; color: #000000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
            .team-list { margin-top: 20px; padding: 15px; background-color: #18181b; border-radius: 8px; border: 1px solid #27272a; }
        </style>
    </head>
    <body style="background-color: #09090b; color: #ffffff;">
        <div class="container">
            <div class="header">
                 <h1 style="color: #00ff9d; margin: 0; font-size: 24px;">New Team Assignment</h1>
            </div>
            <div class="content">
                <h2 style="color: #ffffff; margin-top: 0;">Hello Team,</h2>
                <p style="color: #d4d4d8; line-height: 1.6;">
                    You have been assigned to the project <strong style="color: #ffffff;">"${projectName}"</strong> by ${clientName}.
                </p>
                
                <div class="team-list">
                    <p style="color: #a1a1aa; font-size: 12px; margin-bottom: 8px; text-transform: uppercase;">Assigned Members:</p>
                    <p style="color: #ffffff; margin: 0; font-weight: 500;">${developerNames}</p>
                </div>

                <p style="color: #a1a1aa; font-size: 14px; margin-top: 24px;">
                    Please collaborate and start working on the milestones.
                </p>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="${projectUrl}" class="button">View Project Dashboard</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} CodeGang. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: allEmails,
                    subject: `👥 Team Assignment: ${projectName}`,
                    html: htmlContent
                })
            });

            return response.ok;
        } catch (e) {
            console.error("Failed to call email API", e);
            return false;
        }
    },

    async sendProjectActiveEmail(data: ProjectEmailData) {
        const { projectName, clientName, clientEmail, developers } = data;

        // Default contact if no developers are assigned
        const defaultContactEmail = "admin@codegang.online";

        // Construct Developer Cards HTML
        let developerSectionHtml = "";

        if (developers && developers.length > 0) {
            const devCards = developers.map(dev => `
            <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
                <p style="margin: 0; color: #ffffff; font-weight: bold; font-size: 16px;">${dev.name}</p>
                <p style="margin: 4px 0 0 0; color: #a1a1aa; font-size: 14px;">${dev.role}</p>
                <p style="margin: 8px 0 0 0; color: #00ff9d; font-size: 14px;">
                    <a href="mailto:${dev.email}" style="color: #00ff9d; text-decoration: none;">${dev.email}</a>
                </p>
            </div>
        `).join("");

            developerSectionHtml = `
            <h3 style="color: #ffffff; margin-top: 24px; margin-bottom: 16px;">Assigned Developers</h3>
            ${devCards}
            <p style="color: #a1a1aa; font-size: 14px; margin-top: 16px;">
                Feel free to reach out to them directly for updates on your project.
            </p>
        `;
        } else {
            developerSectionHtml = `
            <div style="background-color: #1a1a1a; border-left: 4px solid #00ff9d; padding: 16px; margin-top: 24px; border-radius: 4px;">
                <p style="margin: 0; color: #ffffff; font-size: 16px;">
                    Our team is currently finalizing the developer assignment for your project.
                </p>
                <p style="margin: 8px 0 0 0; color: #a1a1aa; font-size: 14px;">
                    For any immediate queries or updates, please reach out to our support team at:
                    <br>
                    <a href="mailto:${defaultContactEmail}" style="color: #00ff9d; font-weight: bold; text-decoration: none;">${defaultContactEmail}</a>
                </p>
            </div>
        `;
        }

        // Full Email Template
        const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #09090b; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; }
            .header { background-color: #09090b; padding: 30px; text-align: center; border-bottom: 1px solid #27272a; }
            .content { padding: 40px 30px; }
            .footer { background-color: #0f0f10; padding: 20px; text-align: center; font-size: 12px; color: #52525b; border-top: 1px solid #27272a; }
            .button { display: inline-block; background-color: #00ff9d; color: #000000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        </style>
    </head>
    <body style="background-color: #09090b; color: #ffffff;">
        <div class="container">
            <div class="header">
                 <h1 style="color: #00ff9d; margin: 0; font-size: 24px;">Project Activated</h1>
            </div>
            <div class="content">
                <h2 style="color: #ffffff; margin-top: 0;">Hello ${clientName},</h2>
                <p style="color: #d4d4d8; line-height: 1.6;">
                    Great news! Your project <strong>"${projectName}"</strong> has been reviewed and is now <span style="color: #00ff9d; font-weight: bold;">Active</span>.
                </p>
                
                ${developerSectionHtml}

                <div style="text-align: center; margin-top: 40px;">
                    <a href="https://codegang.online/dashboard/projects" class="button" style="background-color: #00ff9d; color: #000000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">View Project Dashboard</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} CodeGang. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: clientEmail,
                    subject: `🚀 Project Active: ${projectName}`,
                    html: htmlContent
                })
            });

            return response.ok;
        } catch (e) {
            console.error("Failed to call email API", e);
            return false;
        }
    },

    async sendProjectCompletedEmail(data: {
        projectName: string;
        clientName: string;
        clientEmail: string;
        projectId: string;
    }) {
        const { projectName, clientName, clientEmail, projectId } = data;
        const projectUrl = `https://codegang.online/dashboard/projects/${projectId}`;

        const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #09090b; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; }
            .header { background-color: #09090b; padding: 30px; text-align: center; border-bottom: 1px solid #27272a; }
            .content { padding: 40px 30px; }
            .footer { background-color: #0f0f10; padding: 20px; text-align: center; font-size: 12px; color: #52525b; border-top: 1px solid #27272a; }
            .button { display: inline-block; background-color: #00ff9d; color: #000000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px; }
        </style>
    </head>
    <body style="background-color: #09090b; color: #ffffff;">
        <div class="container">
            <div class="header">
                 <h1 style="color: #00ff9d; margin: 0; font-size: 24px;">🎉 Project Completed!</h1>
            </div>
            <div class="content">
                <h2 style="color: #ffffff; margin-top: 0;">Congratulations ${clientName},</h2>
                <p style="color: #d4d4d8; line-height: 1.6;">
                    We are thrilled to inform you that your project <strong style="color: #ffffff;">"${projectName}"</strong> has been successfully completed and delivered.
                </p>
                
                <p style="color: #d4d4d8; line-height: 1.6;">
                    We hope the final result exceeds your expectations. To access your project deliverables and provide your feedback, please visit your dashboard.
                </p>

                <div style="text-align: center; margin-top: 40px;">
                    <a href="${projectUrl}" class="button">View Dashboard & Rate</a>
                </div>
                
                <p style="color: #a1a1aa; font-size: 14px; margin-top: 30px; text-align: center;">
                    Thank you for trusting CodeGang with your vision. It was a pleasure building this with you!
                </p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} CodeGang. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: clientEmail,
                    subject: `🎉 Project Completed: ${projectName}`,
                    html: htmlContent
                })
            });

            return response.ok;
        } catch (e) {
            console.error("Failed to send completion email", e);
            return false;
        }
    }
};
