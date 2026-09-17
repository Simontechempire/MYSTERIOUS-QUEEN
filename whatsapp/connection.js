const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const path = require("path");

let currentSocket = null;


// ═══════════════════════════════════════
// 📱 CREATE NORMAL WHATSAPP CONNECTION
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
// 🔐 GENERATE PAIRING CODE
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
        `📱 Creating pairing session for ${number}`
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

    await new Promise((resolve, reject) => {

        let settled = false;

        const timeout = setTimeout(() => {
            if (!settled) {
                settled = true;
                reject(
                    new Error(
                        "Pairing connection timed out."
                    )
                );
            }
        }, 30000);

        sock.ev.on(
            "connection.update",
            ({ connection, lastDisconnect }) => {

                console.log(
                    `📡 Pairing connection: ${connection || "connecting"}`
                );

                if (
                    connection === "open" &&
                    !settled
                ) {
                    settled = true;
                    clearTimeout(timeout);
                    resolve();
                }

                if (
                    connection === "close" &&
                    !settled
                ) {
                    settled = true;
                    clearTimeout(timeout);

                    const reason =
                        lastDisconnect?.error?.message ||
                        "Connection Closed";

                    reject(
                        new Error(reason)
                    );
                }
            }
        );
    });

    const code =
        await sock.requestPairingCode(number);

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
