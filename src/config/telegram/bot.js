const { Telegraf } = require("telegraf");
const config = require("../config/config");

const bot = new Telegraf(config.telegram.token);

bot.start((ctx) => {
    ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "Welcome to the Telegram control panel.\n\n" +
        "Use /pair to connect a WhatsApp account."
    );
});

bot.command("help", (ctx) => {
    ctx.reply(
        "👑 MYSTERIOUS QUEEN\n\n" +
        "/start - Start the bot\n" +
        "/pair - Pair WhatsApp\n" +
        "/status - Check status\n" +
        "/logout - Logout WhatsApp"
    );
});

module.exports = bot;
