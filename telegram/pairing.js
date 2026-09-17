const { Markup } = require("telegraf");

// Store simple pairing state per Telegram user
const pairingState = new Map();


// ═══════════════════════════════════════
// 📱 PAIRING MENU
// ═══════════════════════════════════════

async function showPairingMenu(ctx) {
    await ctx.reply(
`╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
│
🤖 𝗠𝗬𝗦𝗧𝗘𝗥𝗜𝗢𝗨𝗦 𝗤𝗨𝗘𝗘𝗡
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━━〘 📱 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 〙━━━━╮
│
│  Choose an option below.
│
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`,
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
            ],
            [
                Markup.button.callback(
                    "💾 Session",
                    "pair_session"
                ),
                Markup.button.callback(
                    "📋 List Pair",
                    "pair_list"
                )
            ]
        ])
    );
}


// ═══════════════════════════════════════
// 📱 START PAIRING
// ═══════════════════════════════════════

async function startPairing(ctx) {
    const userId = ctx.from.id;

    pairingState.set(userId, {
        waitingForNumber: true
    });

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
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
}


// ═══════════════════════════════════════
// 📊 STATUS
// ═══════════════════════════════════════

async function pairingStatus(ctx) {
    await ctx.reply(
`╭━━━━〘 📊 𝗦𝗧𝗔𝗧𝗨𝗦 〙━━━━╮
│
│ 👑 Mysterious Queen
│
│ 🟢 Telegram : ONLINE
│ 📱 WhatsApp : CHECKING...
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
}


// ═══════════════════════════════════════
// 💾 SESSION
// ═══════════════════════════════════════

async function pairingSession(ctx) {
    await ctx.reply(
`╭━━━━〘 💾 𝗦𝗘𝗦𝗦𝗜𝗢𝗡 〙━━━━╮
│
│ Session information will
│ appear here after WhatsApp
│ has been successfully paired.
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
}


// ═══════════════════════════════════════
// 📋 LIST PAIRED DEVICES
// ═══════════════════════════════════════

async function listPairing(ctx) {
    await ctx.reply(
`╭━━━━〘 📋 𝗣𝗔𝗜𝗥𝗘𝗗 𝗗𝗘𝗩𝗜𝗖𝗘𝗦 〙━━━━╮
│
│ No connected device
│ information available yet.
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
}


// ═══════════════════════════════════════
// 🚪 LOGOUT
// ═══════════════════════════════════════

async function logoutPairing(ctx) {
    pairingState.delete(ctx.from.id);

    await ctx.reply(
`╭━━━━〘 🚪 𝗟𝗢𝗚𝗢𝗨𝗧 〙━━━━╮
│
│ WhatsApp logout request
│ received.
│
╰━━━━━━━━━━━━━━━━━━━━━━━━╯`
    );
}


// ═══════════════════════════════════════
// 🔐 GET USER PAIRING STATE
// ═══════════════════════════════════════

function getPairingState(userId) {
    return pairingState.get(userId);
}


// ═══════════════════════════════════════
// 🧹 CLEAR USER STATE
// ═══════════════════════════════════════

function clearPairingState(userId) {
    pairingState.delete(userId);
}


module.exports = {
    showPairingMenu,
    startPairing,
    pairingStatus,
    pairingSession,
    listPairing,
    logoutPairing,
    getPairingState,
    clearPairingState
};
