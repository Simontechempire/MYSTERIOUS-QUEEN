const config = require("../config/config");

async function handleCommand(sock, message) {
    try {
        const text = message?.message?.conversation ||
            message?.message?.extendedTextMessage?.text ||
            "";

        if (!text.startsWith(config.prefix)) {
            return;
        }

        const args = text
            .slice(config.prefix.length)
            .trim()
            .split(/\s+/);

        const command = args.shift()?.toLowerCase();

        if (!command) {
            return;
        }

        console.log(`📩 Command received: ${command}`);

        switch (command) {
            case "ping":
                await sock.sendMessage(message.key.remoteJid, {
                    text: "🏓 Pong!\n\n👑 Mysterious Queen is online."
                });
                break;

            case "alive":
                await sock.sendMessage(message.key.remoteJid, {
                    text: "👑 Mysterious Queen is alive and running!"
                });
                break;

            case "menu":
                await sock.sendMessage(message.key.remoteJid, {
                    text:
                        "╭━━━━━━━━━━━━━━━━━━╮\n" +
                        "   👑 MYSTERIOUS QUEEN\n" +
                        "╰━━━━━━━━━━━━━━━━━━╯\n\n" +
                        "📌 Available Commands\n\n" +
                        "• .ping\n" +
                        "• .alive\n" +
                        "• .menu\n" +
                        "• .owner\n"
                });
                break;

            default:
                await sock.sendMessage(message.key.remoteJid, {
                    text: `❌ Unknown command: ${command}\n\nUse ${config.prefix}menu`
                });
        }
    } catch (error) {
        console.error("❌ Command handler error:", error);
    }
}

module.exports = {
    handleCommand
};
