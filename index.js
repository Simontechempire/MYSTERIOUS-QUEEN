require("dotenv").config();

const bot = require("./src/telegram/bot");
const { createWhatsAppConnection } = require("./src/whatsapp/connection");
const { handleMessage } = require("./src/handlers/messageHandler");
const {
    ensureSessionsDirectory
} = require("./src/whatsapp/session");

async function startBot() {
    try {
        console.log("╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮");
        console.log("     👑 MYSTERIOUS QUEEN");
        console.log("╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯");
        console.log("");

        if (!process.env.TELEGRAM_BOT_TOKEN) {
            throw new Error("TELEGRAM_BOT_TOKEN is missing from .env");
        }

        ensureSessionsDirectory();

        console.log("🤖 Starting Telegram bot...");

        await bot.launch();

        console.log("✅ Telegram bot started");

        console.log("📱 Starting WhatsApp connection...");

        const sock = await createWhatsAppConnection();

        sock.ev.on("messages.upsert", async ({ messages }) => {
            for (const message of messages) {
                await handleMessage(sock, message);
            }
        });

        console.log("✅ Mysterious Queen is running");
    } catch (error) {
        console.error("❌ Failed to start Mysterious Queen:");
        console.error(error);
        process.exit(1);
    }
}

startBot();

process.once("SIGINT", () => {
    bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
});
