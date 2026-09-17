const { Telegraf } = require("telegraf");

const config = require("../config/config");

const {
    requestPairingCode
} = require("../whatsapp/connection");

const bot = new Telegraf(
    config.telegram.token
);

const waitingForNumber = new Set();


// ═══════════════════════════════════════
// 👑 PREMIUM MENU
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
✦ sᴛᴀᴛᴜs  : 𝗢𝗡𝗟ɪɴᴇ ✅
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
➎ Settings → Linked Devices
│
➏ Link a Device
│
➐ Link with phone number
│
➑ Enter the pairing code
│
➒ Wait for connection
│
➓ Use /STATUS
│
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

⚠️ 𝗡𝗘𝗩𝗘𝗥 𝗦𝗛𝗔𝗥𝗘 𝗬𝗢𝗨𝗥 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘.

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


// ═══════════════════════════════════════
// 📱 PAIR
// ═══════════════════════════════════════

bot.command("pair", async (ctx) => {

    waitingForNumber.add(ctx.from.id);

    await ctx.reply(
`╭━━━━〘 📱 𝗣𝗔𝗜𝗥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 〙━━━━╮
│
│ Send your WhatsApp number.
│
│ Example:
│ +2348012345678
│
│ ⚠️ Use international format.
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
});


// ═══════════════════════════════════════
// 📱 RECEIVE PHONE NUMBER
// ═══════════════════════════════════════

bot.on("text", async (ctx) => {

    const userId = ctx.from.id;

    if (!waitingForNumber.has(userId)) {
        return;
    }

    const phoneNumber =
        ctx.message.text.trim();

    waitingForNumber.delete(userId);

    await ctx.reply(
        "⏳ Generating WhatsApp pairing code..."
    );

    try {

        const code =
            await requestPairingCode(
                phoneNumber
            );

        await ctx.reply(
`╭━━━━〘 🔐 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘 〙━━━━╮
│
│ 📱 WhatsApp Number
│ ${phoneNumber}
│
│ 🔑 Pairing Code:
│
│    ${code}
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

📱 Open WhatsApp
→ Settings
→ Linked Devices
→ Link a Device
→ Link with phone number

Then enter the code above.

⚠️ 𝗡𝗘𝗩𝗘𝗥 𝗦𝗛𝗔𝗥𝗘 𝗧𝗛𝗜𝗦 𝗖𝗢𝗗𝗘.`
        );

    } catch (error) {

        console.error(
            "❌ Pairing error:",
            error
        );

        await ctx.reply(
`❌ 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗙𝗔𝗜𝗟𝗘𝗗

${error.message}

Try /PAIR again.`
        );
    }
});


// ═══════════════════════════════════════
// 📊 STATUS
// ═══════════════════════════════════════

bot.command("status", async (ctx) => {

    const {
        getWhatsAppSocket
    } = require("../whatsapp/connection");

    const sock =
        getWhatsAppSocket();

    const whatsappStatus =
        sock ? "🟢 ONLINE" : "🔴 OFFLINE";

    await ctx.reply(
`╭━━━━〘 📊 𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦 〙━━━━╮
│
│ 🤖 Telegram : 🟢 ONLINE
│ 📱 WhatsApp : ${whatsappStatus}
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
});


module.exports = bot;
