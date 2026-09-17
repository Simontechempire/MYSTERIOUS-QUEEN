const { Markup } = require("telegraf");

async function pairCommand(ctx) {
    await ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "📱 WhatsApp Pairing\n\n" +
        "Enter the WhatsApp phone number you want to pair.\n\n" +
        "Example:\n" +
        "2348012345678",
        Markup.inlineKeyboard([
            [
                Markup.button.callback("❌ Cancel", "pair_cancel")
            ]
        ])
    );
}

module.exports = {
    pairCommand
};
