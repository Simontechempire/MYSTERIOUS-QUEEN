const { Markup } = require("telegraf");

async function showPairingMenu(ctx) {
    await ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "📱 WHATSAPP PAIRING\n\n" +
        "Choose an option:",
        Markup.inlineKeyboard([
            [
                Markup.button.callback(
                    "📱 Pair WhatsApp",
                    "pair_whatsapp"
                )
            ],
            [
                Markup.button.callback(
                    "📊 Status",
                    "pair_status"
                ),
                Markup.button.callback(
                    "🚪 Logout",
                    "pair_logout"
                )
            ]
        ])
    );
}

module.exports = {
    showPairingMenu
};
