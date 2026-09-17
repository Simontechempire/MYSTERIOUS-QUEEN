const { Telegraf } = require("telegraf");
const config = require("../config/config");

const bot = new Telegraf(config.telegram.token);


// ═══════════════════════════════════════
// 👑 MYSTERIOUS QUEEN MENU
// ═══════════════════════════════════════

const MENU = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
│
🤖 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
│
✦ ɴᴀᴍᴇ    : 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘ᴇɴ
│
✦ ᴅᴇᴠ     : 『simon tech』
│
✦ ᴠᴇʀsɪᴏɴ : 1.0.0
│
✦ sᴛᴀᴛᴜs  : 𝗢𝗡𝗟𝗜ɴᴇ ✅
│
✦ ᴘʟᴀᴛғᴏʀᴍ : 𝗧ᴇʟᴇɢʀᴀᴍ
│
✦ ᴘʀᴇғɪx  : /
│
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━〘 ⚔ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 ⚔ 〙━━━━╮
│
✧ /PAIR
─ Pair WhatsApp device
│
✧ /DEPAIR
─ Unpair WhatsApp device
│
✧ /LISTPAIR
─ View paired devices
│
✧ /SESSION
─ View session information
│
✧ /STATUS
─ Show bot status
│
✧ /LOGOUT
─ Logout WhatsApp session
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━〘 📱 𝐇𝐎𝐖 𝐓𝐎 𝐏𝐀𝐈𝐑 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 〙━━━━╮
│
➊ Send /PAIR
│
➋ Enter your WhatsApp number
│
➌ Wait for the pairing code
│
➍ Open WhatsApp
│
➎ Go to Settings
│
➏ Select Linked Devices
│
➐ Select Link a Device
│
➑ Choose Link with phone number
│
➒ Enter the pairing code
│
➓ Use /STATUS to check
│
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━〘 🔐 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 〙━━━━╮
│
✧ /SESSION
─ View session information
│
✧ /LISTPAIR
─ View paired devices
│
✧ /DEPAIR
─ Remove pairing
│
✧ /LOGOUT
─ Disconnect WhatsApp
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

⚠️ 𝗦𝗘𝗖𝗨𝗥𝗜𝗧𝗬 𝗡𝗢𝗧𝗜𝗖𝗘
│
Never share your WhatsApp
pairing code with anyone.
Only enter it in your own
WhatsApp application.
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

ᴘᴏᴡᴇʀᴇᴅ ʙʏ 『simon tech』
`;


// ═══════════════════════════════════════
// 🚀 START
// ═══════════════════════════════════════

bot.start(async (ctx) => {
    await ctx.reply(MENU);
});


// ═══════════════════════════════════════
// 📖 HELP
// ═══════════════════════════════════════

bot.command("help", async (ctx) => {
    await ctx.reply(MENU);
});


// ═══════════════════════════════════════
// 📋 MENU
// ═══════════════════════════════════════

bot.command("menu", async (ctx) => {
    await ctx.reply(MENU);
});


module.exports = bot;
