const { getSocket } = require("./connect");

async function generatePairingCode(phoneNumber) {
    const sock = getSocket();

    if (!sock) {
        throw new Error("WhatsApp connection is not ready.");
    }

    const number = phoneNumber.replace(/\D/g, "");

    if (!number) {
        throw new Error("WhatsApp phone number is required.");
    }

    const code = await sock.requestPairingCode(number);

    return code;
}

module.exports = {
    generatePairingCode
};
