require("dotenv").config();

const config = {
    botName: "Mysterious Queen",

    prefix: process.env.PREFIX || ".",

    ownerId: process.env.OWNER_ID || "",

    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN || ""
    },

    whatsapp: {
        sessionPath: "./sessions"
    }
};

module.exports = config;
