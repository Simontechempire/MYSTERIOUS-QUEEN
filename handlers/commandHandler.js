const config = require("../config/config");

async function handleCommand(sock, message) {
    try {
        const text =
            message?.message?.conversation ||
            message?.message?.extendedTextMessage?.text ||
            "";

        if (!text.startsWith(config.prefix)) {
            return;
        }

        const parts = text
            .slice(config.prefix.length)
            .trim()
            .split(/\s+/);

        const command = parts.shift()?.toLowerCase();

        if (!command) {
            return;
        }

        const jid = message.key.remoteJid;

        switch (command) {
            case "ping":
                await sock.sendMessage(jid, {
                    text: "🏓 Pong!\n\n👑 Mysterious Queen is online."
                });
                break;

            case "alive":
                await sock.sendMessage(jid, {
                    text: "👑 Mysterious Queen is alive!"
                });
                break;

            case "menu":
                await sock.sendMessage(jid, {
                    text:
                        "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
                        "   👑 MYSTERIOUS QUEEN\n" +
                        "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +
                        "👑 Owner\n" +
                        "🛡️ Security\n" +
                        "🤖 Auto\n" +
                        "👥 Group\n" +
                        "🎮 Games\n" +
                        "😂 Fun\n" +
                        "🤖 AI\n" +
                        "🎨 Sticker\n" +
                        "🖼️ Media\n" +
                        "📥 Downloader\n" +
                        "🔧 Tools\n" +
                        "📊 Info\n" +
                        "📢 Posting\n"
                });
                break;

            default:
                await sock.sendMessage(jid, {
                    text:
                        `❌ Unknown command: ${command}\n\n` +
                        `Use ${config.prefix}menu`
                });
        }
    } catch (error) {
        console.error(
            "❌ Command handler error:",
            error
        );
    }
}

module.exports = {
    handleCommand
};
