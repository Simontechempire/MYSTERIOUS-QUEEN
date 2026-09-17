const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const path = require("path");

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

    sock.ev.on("creds.update", saveCreds);

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
                    lastDisconnect?.error?.output
                        ?.statusCode !==
                    DisconnectReason.loggedOut;

                if (shouldReconnect) {
                    console.log(
                        "🔄 Reconnecting..."
                    );

                    createWhatsAppConnection();
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

module.exports = {
    createWhatsAppConnection
};

