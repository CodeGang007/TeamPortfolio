
// Telegram Service for sending notifications
import { TELEGRAM_CONFIG } from "@/config/telegram";

// Telegram Service for sending notifications
const TELEGRAM_BOT_TOKEN = TELEGRAM_CONFIG.BOT_TOKEN;
const TELEGRAM_CHAT_ID = TELEGRAM_CONFIG.CHAT_ID;

export const telegramService = {
  // Send a message to the configured Telegram chat
  // Send a message via our internal API route (Server-Side Proxy)
  // This avoids CORS issues and hides the Bot Token from the client network tab
  async sendMessage(message: string): Promise<boolean> {
    try {
      const response = await fetch('/api/telegram-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        console.error(`Failed to send Telegram message (Status: ${response.status})`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error sending Telegram message:', error);
      return false;
    }
  },

  // Helper to escape HTML special characters for Telegram
  escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  // Helper to format a new project notification
  formatProjectNotification(project: { 
      projectName: string; 
      description: string; 
      budget: string; 
      currency: string;
      userName?: string; 
      userEmail?: string; 
      projectType?: string;
      deliveryTime?: string;
  }): string {
      const projectName = this.escapeHtml(project.projectName);
      const userName = this.escapeHtml(project.userName || 'Unknown');
      const userEmail = this.escapeHtml(project.userEmail || 'No Email');
      const budget = this.escapeHtml(`${project.currency} ${project.budget}`); 
      const projectType = this.escapeHtml(project.projectType || 'Not specified');
      const deliveryTime = this.escapeHtml(project.deliveryTime || 'Not specified');
      
      let desc = project.description || '';
      if (desc.length > 300) desc = desc.substring(0, 300) + '...';
      const description = this.escapeHtml(desc);

      // Format Attachments
      // Reverted to not include attachments in Telegram message as it causes 500/Timeout errors on user's env
      let attachmentsHtml = '';


      return `
🚀 <b>New Project Published!</b>

<b>Project:</b> ${projectName}
<b>Client:</b> ${userName} 
<b>Email:</b> ${userEmail}
<b>Budget:</b> ${budget}
<b>Type:</b> ${projectType}
<b>Timeline:</b> ${deliveryTime}

<b>Description:</b>
${description}

<a href="https://codegang.online/dashboard/projects">View in Dashboard</a>
      `.trim();
  }
};
