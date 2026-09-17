const config = require("../config/config");

const {
    commands,
    getMainMenu,
    findCommand,
    getCategory,
    getAllCommands
} = require("../commands/commandmenu");

const PREFIX = config.prefix || ".";

async function handleCommand(sock, message) {
    try {
        const text =
            message?.message?.conversation ||
            message?.message?.extendedTextMessage?.text ||
            "";

        if (!text.startsWith(PREFIX)) {
            return;
        }

        const input = text
            .slice(PREFIX.length)
            .trim();

        if (!input) {
            return;
        }

        const parts = input.split(/\s+/);
        const command = parts.shift().toLowerCase();
        const args = parts;

        const jid = message.key.remoteJid;

        if (!jid) {
            return;
        }

        // ═══════════════════════════════
        // 📋 MAIN MENU
        // ═══════════════════════════════

        if (
            command === "menu" ||
            command === "help"
        ) {
            await sock.sendMessage(jid, {
                text: getMainMenu()
            });

            return;
        }

        // ═══════════════════════════════
        // 🔎 FIND COMMAND
        // ═══════════════════════════════

        const commandInfo =
            findCommand(command);

        if (!commandInfo) {
            await sock.sendMessage(jid, {
                text:
                    `❌ Unknown command: ${PREFIX}${command}\n\n` +
                    `Use ${PREFIX}menu to view all commands.`
            });

            return;
        }

        // ═══════════════════════════════
        // 🏓 BASIC COMMANDS
        // ═══════════════════════════════

        if (command === "ping") {
            const start = Date.now();

            await sock.sendMessage(jid, {
                text: "🏓 Checking..."
            });

            const speed =
                Date.now() - start;

            await sock.sendMessage(jid, {
                text:
                    "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
                    "       🏓 𝗣𝗢𝗡𝗚!\n" +
                    "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +
                    `⚡ Response: ${speed} ms\n` +
                    "👑 Mysterious Queen is online."
            });

            return;
        }

        // ═══════════════════════════════
        // 💚 ALIVE
        // ═══════════════════════════════

        if (command === "alive") {
            await sock.sendMessage(jid, {
                text:
                    "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
                    "   👑 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡\n" +
                    "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +
                    "🟢 Status: ONLINE\n" +
                    "🤖 Bot: ACTIVE\n" +
                    "📱 WhatsApp: CONNECTED"
            });

            return;
        }

        // ═══════════════════════════════
        // ⏱️ RUNTIME
        // ═══════════════════════════════

        if (command === "runtime") {
            const seconds =
                Math.floor(
                    process.uptime()
                );

            const days =
                Math.floor(
                    seconds / 86400
                );

            const hours =
                Math.floor(
                    (seconds % 86400) / 3600
                );

            const minutes =
                Math.floor(
                    (seconds % 3600) / 60
                );

            const secs =
                seconds % 60;

            await sock.sendMessage(jid, {
                text:
                    "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
                    "       ⏱️ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘\n" +
                    "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +
                    `📅 Days: ${days}\n` +
                    `🕐 Hours: ${hours}\n` +
                    `⏱️ Minutes: ${minutes}\n` +
                    `⚡ Seconds: ${secs}`
            });

            return;
        }

        // ═══════════════════════════════
        // 🤖 BOT INFO
        // ═══════════════════════════════

        if (command === "botinfo") {
            await sock.sendMessage(jid, {
                text:
                    "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
                    "      👑 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢\n" +
                    "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +
                    "🤖 Name: Mysterious Queen\n" +
                    `⚡ Prefix: ${PREFIX}\n` +
                    "💻 Language: JavaScript\n" +
                    "📱 Platform: WhatsApp\n" +
                    "🟢 Status: Online"
            });

            return;
        }

        // ═══════════════════════════════
        // 📂 CATEGORY COMMAND
        // ═══════════════════════════════

        if (args.length === 0) {
            const category =
                getCategory(command);

            if (category) {
                await sock.sendMessage(jid, {
                    text:
                        `╭━━━━━━━━━━━━━━━━━━━━╮\n` +
                        `      ${category.category}\n` +
                        `╰━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                        category.commands
                            .map(
                                cmd =>
                                    `${PREFIX}${cmd}`
                            )
                            .join("\n")
                });

                return;
            }
        }

        // ═══════════════════════════════
        // ⚙️ REGISTERED COMMAND
        // ═══════════════════════════════

        await sock.sendMessage(jid, {
            text:
                "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
                "    ✅ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗙𝗢𝗨𝗡𝗗\n" +
                "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +
                `📌 Command: ${PREFIX}${command}\n` +
                `📂 Category: ${commandInfo.category}\n\n` +
                "⚙️ Command handler received it.\n" +
                "🚧 Feature logic will be connected next."
        });

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
