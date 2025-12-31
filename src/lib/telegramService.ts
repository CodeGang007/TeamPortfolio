
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
      return `
🚀 *New Project Published!*

*Project:* ${project.projectName}
*Client:* ${project.userName || 'Unknown'} 
*Email:* ${project.userEmail || 'No Email'}
*Budget:* ${project.currency} ${project.budget}
*Type:* ${project.projectType || 'Not specified'}
*Timeline:* ${project.deliveryTime || 'Not specified'}

*Description:*
${project.description.substring(0, 300)}${project.description.length > 300 ? '...' : ''}

[View in Dashboard](https://team-portfolio-cg3e.vercel.app/dashboard/projects)
      `.trim();
  }
};
