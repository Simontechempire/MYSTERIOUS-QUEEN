const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const path = require("path");

let currentSocket = null;


// ═══════════════════════════════════════
// 📱 NORMAL WHATSAPP CONNECTION
// ═══════════════════════════════════════

async function createWhatsAppConnection() {
    const sessionPath = path.join(
        process.cwd(),
        "sessions"
    );

    const { state, saveCreds } =
        await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: [
            "Mysterious Queen",
            "Chrome",
            "1.0.0"
        ]
    });

    currentSocket = sock;

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on(
        "connection.update",
        ({ connection, lastDisconnect }) => {

            if (connection === "open") {
                console.log("✅ WhatsApp connected");
            }

            if (connection === "close") {
                currentSocket = null;

                const status =
                    lastDisconnect?.error?.output?.statusCode;

                if (status !== DisconnectReason.loggedOut) {
                    console.log(
                        "🔄 WhatsApp connection closed."
                    );
                } else {
                    console.log(
                        "❌ WhatsApp logged out."
                    );
                }
            }
        }
    );

    return sock;
}


// ═══════════════════════════════════════
// 🔐 REQUEST WHATSAPP PAIRING CODE
// ═══════════════════════════════════════

async function requestPairingCode(phoneNumber) {

    const number = String(phoneNumber)
        .replace(/[^0-9]/g, "");

    if (number.length < 8) {
        throw new Error(
            "Invalid WhatsApp phone number."
        );
    }

    console.log(
        `📱 Requesting pairing code for ${number}`
    );

    const pairingPath = path.join(
        process.cwd(),
        "pairing_sessions",
        number
    );

    const { state, saveCreds } =
        await useMultiFileAuthState(pairingPath);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: [
            "Mysterious Queen",
            "Chrome",
            "1.0.0"
        ]
    });

    sock.ev.on("creds.update", saveCreds);

    // Give the socket a moment to initialize.
    await new Promise(resolve => setTimeout(resolve, 1500));

    // IMPORTANT:
    // Request the pairing code BEFORE waiting for "open".
    const code =
        await sock.requestPairingCode(number);

    console.log(
        `✅ Pairing code generated for ${number}`
    );

    return code;
}


function getWhatsAppSocket() {
    return currentSocket;
}


module.exports = {
    createWhatsAppConnection,
    getWhatsAppSocket,
    requestPairingCode
};
