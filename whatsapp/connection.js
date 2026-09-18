const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers
} = require("@whiskeysockets/baileys");

const path = require("path");
const fs = require("fs");

let currentSocket = null;


// ═══════════════════════════════════════
// 📁 CREATE DIRECTORY
// ═══════════════════════════════════════

function ensureDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}


// ═══════════════════════════════════════
// 📱 NORMAL WHATSAPP CONNECTION
// ═══════════════════════════════════════

async function createWhatsAppConnection() {

    const sessionPath = path.join(
        process.cwd(),
        "sessions"
    );

    ensureDirectory(sessionPath);

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(
        sessionPath
    );

    const sock = makeWASocket({
        auth: state,

        printQRInTerminal: false,

        browser: Browsers.macOS("Safari")
    });

    currentSocket = sock;

    sock.ev.on(
        "creds.update",
        saveCreds
    );

    sock.ev.on(
        "connection.update",
        ({
            connection,
            lastDisconnect
        }) => {

            if (connection === "open") {

                console.log(
                    "✅ WhatsApp connected"
                );
            }

            if (connection === "close") {

                currentSocket = null;

                const status =
                    lastDisconnect
                        ?.error
                        ?.output
                        ?.statusCode;

                if (
                    status !==
                    DisconnectReason.loggedOut
                ) {

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
// 🔐 WHATSAPP PAIRING CODE
// ═══════════════════════════════════════

async function requestPairingCode(
    phoneNumber
) {

    // Clean number
    const number =
        String(phoneNumber)
            .replace(/[^0-9]/g, "");

    if (number.length < 8) {

        throw new Error(
            "Invalid WhatsApp phone number."
        );
    }


    console.log(
        `📱 Starting pairing for ${number}`
    );


    // Create unique session directory
    const pairingPath =
        path.join(
            process.cwd(),
            "pairing_sessions",
            number
        );

    ensureDirectory(pairingPath);


    // Load authentication state
    const {
        state,
        saveCreds
    } =
        await useMultiFileAuthState(
            pairingPath
        );


    // Create pairing socket
    const sock = makeWASocket({

        auth: state,

        printQRInTerminal: false,

        browser:
            Browsers.macOS("Safari")
    });


    // Save credentials
    sock.ev.on(
        "creds.update",
        saveCreds
    );


    // Listen for connection
    sock.ev.on(
        "connection.update",
        ({
            connection,
            lastDisconnect
        }) => {

            if (connection === "open") {

                console.log(
                    `✅ WhatsApp connected: ${number}`
                );
            }


            if (connection === "close") {

                const status =
                    lastDisconnect
                        ?.error
                        ?.output
                        ?.statusCode;

                console.log(
                    `📴 Pairing connection closed: ${status || "unknown"}`
                );
            }
        }
    );


    try {

        console.log(
            "⏳ Requesting WhatsApp pairing code..."
        );


        /*
         * WhatsApp pairing codes should be
         * requested from the pairing socket.
         */

        const code =
            await sock.requestPairingCode(
                number
            );


        console.log(
            `✅ Pairing code generated: ${code}`
        );


        return code;

    } catch (error) {

        console.error(
            "❌ Pairing code error:",
            error
        );

        try {
            sock.end(undefined);
        } catch (_) {}

        throw error;
    }
}


// ═══════════════════════════════════════
// 📡 GET CURRENT SOCKET
// ═══════════════════════════════════════

function getWhatsAppSocket() {

    return currentSocket;
}


// ═══════════════════════════════════════
// 📂 GET PAIRING SESSION PATH
// ═══════════════════════════════════════

function getPairingSessionPath(
    phoneNumber
) {

    const number =
        String(phoneNumber)
            .replace(/[^0-9]/g, "");

    return path.join(
        process.cwd(),
        "pairing_sessions",
        number
    );
}


// ═══════════════════════════════════════
// 🚪 REMOVE PAIRING SESSION
// ═══════════════════════════════════════

function removePairingSession(
    phoneNumber
) {

    const sessionPath =
        getPairingSessionPath(
            phoneNumber
        );

    if (fs.existsSync(sessionPath)) {

        fs.rmSync(
            sessionPath,
            {
                recursive: true,
                force: true
            }
        );

        return true;
    }

    return false;
}


module.exports = {

    createWhatsAppConnection,

    requestPairingCode,

    getWhatsAppSocket,

    getPairingSessionPath,

    removePairingSession
};
