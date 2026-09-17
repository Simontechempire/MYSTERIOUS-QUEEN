const { Markup } = require("telegraf");

function pairingMenu() {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback("📱 Pair WhatsApp", "pair_whatsapp")
        ],
        [
            Markup.button.callback("📊 Status", "pair_status"),
            Markup.button.callback("🚪 Logout", "pair_logout")
        ]
    ]);
}

async function showPairingMenu(ctx) {
    await ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "📱 WhatsApp Pairing\n\n" +
        "Choose an option below:",
        pairingMenu()
    );
}

module.exports = {
    showPairingMenu
};
