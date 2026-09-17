const fs = require("fs");
const path = require("path");

const sessionsDir = path.join(process.cwd(), "sessions");

function ensureSessionsDirectory() {
    if (!fs.existsSync(sessionsDir)) {
        fs.mkdirSync(sessionsDir, { recursive: true });
    }
}

function getSessionPath(sessionId = "default") {
    ensureSessionsDirectory();

    return path.join(sessionsDir, sessionId);
}

function sessionExists(sessionId = "default") {
    return fs.existsSync(getSessionPath(sessionId));
}

function deleteSession(sessionId = "default") {
    const sessionPath = getSessionPath(sessionId);

    if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, {
            recursive: true,
            force: true
        });

        return true;
    }

    return false;
}

module.exports = {
    ensureSessionsDirectory,
    getSessionPath,
    sessionExists,
    deleteSession
};
