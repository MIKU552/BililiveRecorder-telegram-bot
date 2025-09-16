import { VercelRequest, VercelResponse } from '@vercel/node';
import { bot } from '../bot';
import { WebhookBody, FileClosedEventData } from '../types';

function buildMessage(webhookData: WebhookBody): string {
    const { EventType, EventData } = webhookData;
    const { Name, Title } = EventData;
    
    switch (EventType) {
        case 'StreamStarted':
            return `**${Name}** 已开播。\n\n**标题:** ${Title}`;
            
        case 'SessionStarted':
            return `**${Name}** 已开始录制。`;

        case 'FileClosed':
            const fileData = EventData as FileClosedEventData;
            const fileSize = (fileData.FileSize / 1024 / 1024).toFixed(2);
            return `✅ **文件已保存**\n\n**主播:** ${Name}\n**路径:** \`${fileData.RelativePath}\`\n**大小:** ${fileSize} MB\n**时长:** ${fileData.Duration.toFixed(2)}s`;

        case 'StreamEnded':
            return `**${Name}** 已下播。`;

        case 'SessionEnded':
            return `**${Name}** 录制已结束。`;
            
        case 'FileOpening':
            // 默认不处理文件打开事件，避免消息过多
            return '';
            
        default:
            console.log(`Received an unhandled event: ${EventType}`);
            return '';
    }
}

export default async (req: VercelRequest, res: VercelResponse) => {
    const chatId = req.query['chatId'] as string;
    if (!chatId) {
        return res.status(400).send('Missing chatId');
    }

    const webhookData = req.body as WebhookBody;
    const text = buildMessage(webhookData);

    if (text) {
        try {
            await bot.api.sendMessage(chatId, text, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error("Failed to send Telegram message:", error);
        }
    }

    res.status(204).send('');
};