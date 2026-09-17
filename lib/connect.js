
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const pino = require("pino");

let sock = null;

async function connectWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info");

    sock = makeWASocket({
        auth: state,
        logger: pino({ level: "silent" }),
        printQRInTerminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
        if (connection === "open") {
            console.log("✅ WhatsApp connected");
        }

        if (connection === "close") {
            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;

            console.log("❌ WhatsApp disconnected");

            if (shouldReconnect) {
                connectWhatsApp();
            }
        }
    });

    return sock;
}

function getSocket() {
    return sock;
}

module.exports = {
    connectWhatsApp,
    getSocket
};
