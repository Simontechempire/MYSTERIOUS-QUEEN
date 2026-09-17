const { generatePairingCode } = require("../lib/pairing");

async function pairCommand(ctx) {
    try {
        const args = ctx.message.text.trim().split(/\s+/);
        const phoneNumber = args[1];

        if (!phoneNumber) {
            return ctx.reply(
                "👑 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡\n\n" +
                "📱 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗣𝗔𝗜𝗥𝗜𝗡𝗚\n\n" +
                "Please provide your WhatsApp phone number.\n\n" +
                "𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n" +
                "/PAIR 2348012345678"
            );
        }

        await ctx.reply(
            "⏳ 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗜𝗡𝗚 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘..."
        );

        const code = await generatePairingCode(phoneNumber);

        await ctx.reply(
            "✅ 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘 𝗥𝗘𝗔𝗗𝗬\n\n" +
            `📱 𝗡𝘂𝗺𝗯𝗲𝗿: ${phoneNumber.replace(/\D/g, "")}\n` +
            `🔐 𝗖𝗼𝗱𝗲: ${code}\n\n` +
            "Open WhatsApp → Linked Devices → Link a Device → " +
            "Link with phone number instead."
        );

    } catch (error) {
        console.error("Pairing error:", error);

        await ctx.reply(
            "❌ 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗙𝗔𝗜𝗟𝗘𝗗\n\n" +
            `Reason: ${error.message}\n\n` +
            "Try again with:\n" +
            "/PAIR 2348012345678"
        );
    }
}

module.exports = {
    pairCommand
};
