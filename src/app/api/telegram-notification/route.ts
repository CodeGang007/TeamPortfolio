
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        
        console.log("Telegram Notification API called");
        
        console.log("Telegram Notification API called");
        
        // Direct attempt without pre-check (reverted validation)

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Telegram API Error:', JSON.stringify(errorData, null, 2));
            return NextResponse.json(
                { error: 'Failed to send message to Telegram', details: errorData },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Server Error sending Telegram message:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
