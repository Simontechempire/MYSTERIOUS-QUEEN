const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const path = require("path");


// ═══════════════════════════════════════
// 📱 WHATSAPP CONNECTION
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

    // Save authentication information
    sock.ev.on(
        "creds.update",
        saveCreds
    );


    // ═══════════════════════════════════
    // 🔌 CONNECTION EVENTS
    // ═══════════════════════════════════

    sock.ev.on(
        "connection.update",
        ({ connection, lastDisconnect }) => {

            if (connection === "open") {
                console.log(
                    "✅ WhatsApp connected"
                );
            }

            if (connection === "close") {

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
// 🔐 REQUEST PAIRING CODE
// ═══════════════════════════════════════

async function requestPairingCode(
    sock,
    phoneNumber
) {

    if (!sock) {
        throw new Error(
            "WhatsApp connection is not available."
        );
    }

    if (!phoneNumber) {
        throw new Error(
            "WhatsApp phone number is required."
        );
    }

    // Remove +, spaces, brackets and dashes
    const number =
        phoneNumber
            .replace(/[^0-9]/g, "");

    if (number.length < 8) {
        throw new Error(
            "Invalid WhatsApp phone number."
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
    requestPairingCode
};
