const { Telegraf } = require("telegraf");
const config = require("../config/config");

const bot = new Telegraf(config.telegram.token);

bot.start(async (ctx) => {
    await ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "Welcome to your Telegram control panel.\n\n" +
        "Use /pair to connect WhatsApp."
    );
});

bot.command("help", async (ctx) => {
    await ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "📋 Commands\n\n" +
        "/start - Start bot\n" +
        "/pair - Pair WhatsApp\n" +
        "/help - Show help"
    );
});

module.exports = bot;
