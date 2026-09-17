require("dotenv").config();

const http = require("http");

const bot = require("./telegram/bot");

const {
    createWhatsAppConnection
} = require("./whatsapp/connection");

const {
    handleMessage
} = require("./handlers/messageHandler");

const {
    ensureSessionsDirectory
} = require("./whatsapp/session");

const PORT = process.env.PORT || 3000;


// ═══════════════════════════════════════
// 🌐 RENDER WEB SERVER
// ═══════════════════════════════════════

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("👑 Mysterious Queen is online!");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Web server running on port ${PORT}`);
});


// ═══════════════════════════════════════
// 👑 START BOT
// ═══════════════════════════════════════

async function startBot() {
    try {
        console.log("");
        console.log("╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮");
        console.log("     👑 MYSTERIOUS QUEEN");
        console.log("╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯");
        console.log("");

        if (!process.env.TELEGRAM_BOT_TOKEN) {
            throw new Error(
                "TELEGRAM_BOT_TOKEN is missing from environment variables"
            );
        }

        ensureSessionsDirectory();

        console.log("🤖 Starting Telegram bot...");

        await bot.launch();

        console.log("✅ Telegram bot started");

        console.log("📱 Starting WhatsApp connection...");

        const sock = await createWhatsAppConnection();

        sock.ev.on(
            "messages.upsert",
            async ({ messages }) => {
                for (const message of messages) {
                    try {
                        await handleMessage(
                            sock,
                            message
                        );
                    } catch (error) {
                        console.error(
                            "❌ Message handler error:",
                            error
                        );
                    }
                }
            }
        );

        console.log("✅ Mysterious Queen is running");

    } catch (error) {
        console.error(
            "❌ Failed to start Mysterious Queen:"
        );

        console.error(error);

        process.exit(1);
    }
}

startBot();


// ═══════════════════════════════════════
// 🛑 SHUTDOWN
// ═══════════════════════════════════════

async function shutdown(signal) {
    console.log(`\n🛑 Received ${signal}`);

    try {
        bot.stop(signal);

        server.close(() => {
            console.log("🌐 Web server stopped");
        });

        console.log("👑 Mysterious Queen stopped");
        process.exit(0);

    } catch (error) {
        console.error(
            "❌ Shutdown error:",
            error
        );

        process.exit(1);
    }
}

process.once("SIGINT", () => {
    shutdown("SIGINT");
});

process.once("SIGTERM", () => {
    shutdown("SIGTERM");
});
