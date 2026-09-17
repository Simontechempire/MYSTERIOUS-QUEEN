const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const path = require("path");

let currentSocket = null;
let connectionPromise = null;


// ═══════════════════════════════════════
// 📱 CREATE WHATSAPP CONNECTION
// ═══════════════════════════════════════

async function createWhatsAppConnection() {

    if (currentSocket) {
        return currentSocket;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = (async () => {

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
                    connectionPromise = null;

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

    })();

    try {
        return await connectionPromise;
    } catch (error) {
        connectionPromise = null;
        currentSocket = null;
        throw error;
    }
}


// ═══════════════════════════════════════
// 🔎 GET CURRENT SOCKET
// ═══════════════════════════════════════

function getWhatsAppSocket() {
    return currentSocket;
}


// ═══════════════════════════════════════
// 🔐 REQUEST PAIRING CODE
// ═══════════════════════════════════════

async function requestPairingCode(phoneNumber) {

    let sock = getWhatsAppSocket();

    // Create the connection if it doesn't exist yet
    if (!sock) {
        console.log(
            "📱 WhatsApp connection not ready. Creating connection..."
        );

        sock = await createWhatsAppConnection();
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

    // Wait until the socket is actually usable
    if (!sock.authState) {
        throw new Error(
            "WhatsApp authentication is not ready."
        );
    }

    const code =
        await sock.requestPairingCode(number);

    return code;
}


module.exports = {
    createWhatsAppConnection,
    getWhatsAppSocket,
    requestPairingCode
};
