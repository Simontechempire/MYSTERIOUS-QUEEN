const {
    requestPairingCode
} = require("../whatsapp/connection");

async function pairCommand(ctx) {
    try {
        const args = ctx.message.text.trim().split(/\s+/);
        const phoneNumber = args[1];

        if (!phoneNumber) {
            return ctx.reply(
                "👑 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡\n\n" +
                "📱 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗣𝗔𝗜𝗥𝗜𝗡𝗚\n\n" +
                "Send your WhatsApp phone number.\n\n" +
                "𝗘𝘅𝗮𝗺𝗽𝗹𝗲:\n" +
                "/PAIR 2348012345678"
            );
        }

        const number = phoneNumber.replace(/[^0-9]/g, "");

        await ctx.reply(
            "⏳ 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗜𝗡𝗚 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘..."
        );

        const code = await requestPairingCode(number);

        await ctx.reply(
            "✅ 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘 𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗘𝗗\n\n" +
            `📱 𝗡𝘂𝗺𝗯𝗲𝗿: ${number}\n` +
            `🔐 𝗖𝗼𝗱𝗲: ${code}\n\n` +
            "𝗢𝗽𝗲𝗻 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 → 𝗟𝗶𝗻𝗸𝗲𝗱 𝗗𝗲𝘃𝗶𝗰𝗲𝘀 → " +
            "𝗟𝗶𝗻𝗸 𝗮 𝗗𝗲𝘃𝗶𝗰𝗲 → 𝗟𝗶𝗻𝗸 𝘄𝗶𝘁𝗵 𝗽𝗵𝗼𝗻𝗲 𝗻𝘂𝗺𝗯𝗲𝗿"
        );

    } catch (error) {
        console.error("❌ Pairing error:", error);

        await ctx.reply(
            "❌ 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗙𝗔𝗜𝗟𝗘𝗗\n\n" +
            `Reason: ${error.message}\n\n` +
            "Try again:\n" +
            "/PAIR 2348012345678"
        );
    }
}

module.exports = {
    pairCommand
};
