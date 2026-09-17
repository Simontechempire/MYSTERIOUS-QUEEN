const { handleCommand } = require("./commandHandler");

async function handleMessage(sock, message) {
    try {
        if (!message || message.key?.fromMe) {
            return;
        }

        if (!message.message) {
            return;
        }

        await handleCommand(sock, message);
    } catch (error) {
        console.error(
            "❌ Message handler error:",
            error
        );
    }
}

module.exports = {
    handleMessage
};
