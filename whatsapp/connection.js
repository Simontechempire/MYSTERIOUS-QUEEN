const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const path = require("path");

let currentSocket = null;


// ═══════════════════════════════════════
// 📱 CREATE WHATSAPP CONNECTION
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

                const shouldReconnect =
                    lastDisconnect?.error
                        ?.output?.statusCode !==
                    DisconnectReason.loggedOut;

                if (shouldReconnect) {
                    console.log(
                        "🔄 WhatsApp reconnecting..."
                    );

                    createWhatsAppConnection()
                        .catch(console.error);
                } else {
                    console.log(
                        "❌ WhatsApp logged out"
                    );
                }
            }
        }
    );

    return sock;
}


// ═══════════════════════════════════════
// 🔎 GET CURRENT SOCKET
// ═══════════════════════════════════════

function getWhatsAppSocket() {
    return currentSocket;
}


// ═══════════════════════════════════════
// 📱 REQUEST PAIRING CODE
// ═══════════════════════════════════════

async function requestPairingCode(phoneNumber) {

    const sock = getWhatsAppSocket();

    if (!sock) {
        throw new Error(
            "WhatsApp connection is not ready."
        );
    }

    const number = String(phoneNumber)
        .replace(/[^0-9]/g, "");

    if (number.length < 8) {
        throw new Error(
            "Invalid WhatsApp number."
        );
    }

    console.log(
        `📱 Requesting pairing code for ${number}`
    );

    const code =
        await sock.requestPairingCode(number);

    return code;
}


module.exports = {
    createWhatsAppConnection,
    getWhatsAppSocket,
    requestPairingCode
};
