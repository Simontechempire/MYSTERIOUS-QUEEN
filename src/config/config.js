const config = {
    botName: process.env.BOT_NAME || "Mysterious Queen",
    ownerId: process.env.OWNER_ID || "",
    prefix: process.env.PREFIX || ".",

    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN || ""
    }
};

module.exports = config;
