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
  async sendProjectActiveEmail(data: ProjectEmailData) {
    const { projectName, clientName, clientEmail, developers } = data;

    // Default contact if no developers are assigned
    const defaultContactEmail = "codegang0077@gmail.com";
    
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
                    <a href="https://team-portfolio-cg3e.vercel.app/dashboard/projects" class="button" style="background-color: #00ff9d; color: #000000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">View Project Dashboard</a>
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
  }
};
