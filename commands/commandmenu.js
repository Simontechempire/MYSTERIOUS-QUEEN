const config = require("../config/config");

const PREFIX = config.prefix || ".";

const commands = {
    // 👑 OWNER
    owner: {
        category: "OWNER",
        commands: [
            "owner",
            "creator",
            "ownerlist",
            "addowner",
            "delowner",
            "ownerinfo",
            "menu",
            "help",
            "ping",
            "alive",
            "runtime",
            "botinfo",
            "status",
            "mode",
            "public",
            "private",
            "restart",
            "shutdown",
            "update",
            "reload",
            "broadcast",
            "bcall",
            "setprefix",
            "prefix",
            "setname",
            "setbio",
            "setpp",
            "setstatus"
        ]
    },

    // 🛡️ MODERATOR
    moderator: {
        category: "MODERATOR",
        commands: [
            "ban",
            "unban",
            "kick",
            "add",
            "promote",
            "demote",
            "mute",
            "unmute",
            "warn",
            "unwarn",
            "warnings",
            "resetwarn",
            "delete",
            "purge",
            "tagall",
            "hidetag",
            "tagadmins"
        ]
    },

    // 🔐 SECURITY
    security: {
        category: "SECURITY",
        commands: [
            "hijacked",

            "antilink",
            "antilink delete",
            "antilink kick",
            "antilink warn",

            "antispam",
            "antispam delete",
            "antispam warn",
            "antispam kick",

            "antiflood",
            "antiflood delete",
            "antiflood warn",
            "antiflood kick",

            "antibot",
            "antibot delete",
            "antibot warn",
            "antibot kick",

            "antiword",
            "antiword delete",
            "antiword warn",
            "antiword kick",
            "addword",
            "delword",
            "listwords",

            "antidelete",
            "antidelete save",

            "antiviewonce",

            "antimention",
            "antimention delete",

            "antiphishing",
            "antiphishing delete",

            "antistatus",
            "antimedia",
            "antinsfw",

            "security",
            "security status",
            "security reset",

            "whitelist",
            "whitelist add",
            "whitelist remove",
            "whitelist list",

            "blacklist",
            "blacklist add",
            "blacklist remove",
            "blacklist list"
        ]
    },

    // 🤖 AUTO
    auto: {
        category: "AUTO",
        commands: [
            "auto",
            "autoread",
            "autotyping",
            "autorecording",
            "autoreact",
            "autoview",
            "autostatus",
            "autolike",
            "autoreply",
            "autotag",
            "autoban",
            "autowarn",
            "autokick",
            "autosettings",
            "welcome",
            "setwelcome",
            "resetwelcome",
            "goodbye",
            "setgoodbye",
            "resetgoodbye"
        ]
    },

    // 👥 GROUP
    group: {
        category: "GROUP",
        commands: [
            "groupinfo",
            "grouplink",
            "revoke",
            "setname",
            "setdesc",
            "setpp",
            "delpp",
            "open",
            "close",
            "lock",
            "unlock",
            "listadmins",
            "listmembers",
            "join",
            "leave"
        ]
    },

    // 👤 USER
    user: {
        category: "USER",
        commands: [
            "profile",
            "avatar",
            "bio",
            "afk",
            "register",
            "level",
            "rank",
            "points"
        ]
    },

    // 🎮 GAMES
    games: {
        category: "GAMES",
        commands: [
            "quiz",
            "guess",
            "riddle",
            "tictactoe",
            "rps",
            "dice",
            "coin",
            "slots",
            "trivia",
            "truth",
            "dare",
            "hangman"
        ]
    },

    // 😂 FUN
    fun: {
        category: "FUN",
        commands: [
            "joke",
            "meme",
            "roast",
            "compliment",
            "ship",
            "love",
            "rate",
            "8ball",
            "fact",
            "quote",
            "pickup"
        ]
    },

    // 🤖 AI
    ai: {
        category: "AI",
        commands: [
            "ai",
            "ask",
            "chat",
            "imagine",
            "translate",
            "summarize",
            "explain",
            "rewrite",
            "grammar",
            "code"
        ]
    },

    // 🎨 STICKER
    sticker: {
        category: "STICKER",
        commands: [
            "sticker",
            "s",
            "toimg",
            "attp",
            "emojimix",
            "take"
        ]
    },

    // 🖼️ MEDIA
    media: {
        category: "MEDIA",
        commands: [
            "toimage",
            "tomedia",
            "tomp3",
            "tomp4",
            "gif",
            "crop",
            "resize",
            "rotate",
            "blur",
            "enhance"
        ]
    },

    // 📥 DOWNLOADER
    downloader: {
        category: "DOWNLOADER",
        commands: [
            "play",
            "song",
            "youtube",
            "ytmp3",
            "ytmp4",
            "tiktok",
            "instagram",
            "facebook",
            "twitter",
            "pinterest",
            "mediafire"
        ]
    },

    // 🔎 SEARCH
    search: {
        category: "SEARCH",
        commands: [
            "google",
            "image",
            "news",
            "wikipedia",
            "lyrics",
            "github",
            "weather",
            "movie",
            "anime"
        ]
    },

    // 🔧 TOOLS
    tools: {
        category: "TOOLS",
        commands: [
            "calc",
            "qr",
            "readqr",
            "shorten",
            "screenshot",
            "base64",
            "encode",
            "decode",
            "password",
            "uuid"
        ]
    },

    // 📊 INFO
    info: {
        category: "INFO",
        commands: [
            "info",
            "botinfo",
            "runtime",
            "speed",
            "stats",
            "botstats",
            "userstats",
            "groupstats",
            "commandstats"
        ]
    },

    // 📢 POSTING
    posting: {
        category: "POSTING",
        commands: [
            "post",
            "posttext",
            "postmedia",
            "settarget",
            "target",
            "cleartarget"
        ]
    },

    // 💾 SESSION
    session: {
        category: "SESSION",
        commands: [
            "session",
            "sessions",
            "logout",
            "clear-session",
            "backup",
            "restore"
        ]
    },

    // ⭐ PREMIUM
    premium: {
        category: "PREMIUM",
        commands: [
            "premium",
            "premiumlist",
            "addpremium",
            "delpremium"
        ]
    },

    // 🎵 MUSIC
    music: {
        category: "MUSIC",
        commands: [
            "music",
            "playmusic",
            "song",
            "lyrics",
            "album"
        ]
    },

    // 🆘 SUPPORT
    support: {
        category: "SUPPORT",
        commands: [
            "report",
            "feedback",
            "request",
            "support",
            "rules"
        ]
    }
};


// ═══════════════════════════════════════
// 👑 MAIN MENU
// ═══════════════════════════════════════

function getMainMenu() {
    return `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
       👑 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡
          𝗠𝗔𝗜𝗡 𝗠𝗘𝗡𝗨
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

👑 𝗢𝗪𝗡𝗘𝗥
🛡️ 𝗠𝗢𝗗𝗘𝗥𝗔𝗧𝗢𝗥
🔐 𝗦𝗘𝗖𝗨𝗥𝗜𝗧𝗬
🤖 𝗔𝗨𝗧𝗢
👥 𝗚𝗥𝗢𝗨𝗣
👤 𝗨𝗦𝗘𝗥
🎮 𝗚𝗔𝗠𝗘𝗦
😂 𝗙𝗨𝗡
🤖 𝗔𝗜
🎨 𝗦𝗧𝗜𝗖𝗞𝗘𝗥
🖼️ 𝗠𝗘𝗗𝗜𝗔
📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥
🔎 𝗦𝗘𝗔𝗥𝗖
🔧 𝗧𝗢𝗢𝗟𝗦
📊 𝗜𝗡𝗙𝗢
📢 𝗣𝗢𝗦𝗧𝗜𝗡𝗚
💾 𝗦𝗘𝗦𝗦𝗜𝗢𝗡
⭐ 𝗣𝗥𝗘𝗠𝗜𝗨𝗠
🎵 𝗠𝗨𝗦𝗜𝗖
🆘 𝗦𝗨𝗣𝗣𝗢𝗥𝗧

╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
       👑 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡
`;
}


// ═══════════════════════════════════════
// 🔎 FIND COMMAND
// ═══════════════════════════════════════

function findCommand(commandName) {
    const name = commandName.toLowerCase().trim();

    for (const category of Object.values(commands)) {
        const found = category.commands.find(
            command => command === name
        );

        if (found) {
            return {
                command: found,
                category: category.category
            };
        }
    }

    return null;
}


// ═══════════════════════════════════════
// 📋 GET CATEGORY COMMANDS
// ═══════════════════════════════════════

function getCategory(categoryName) {
    const category = Object.values(commands).find(
        item =>
            item.category.toLowerCase() ===
            categoryName.toLowerCase()
    );

    if (!category) {
        return null;
    }

    return category;
}


// ═══════════════════════════════════════
// 📊 ALL COMMANDS
// ═══════════════════════════════════════

function getAllCommands() {
    return commands;
}


module.exports = {
    commands,
    getMainMenu,
    findCommand,
    getCategory,
    getAllCommands,
    PREFIX
};
