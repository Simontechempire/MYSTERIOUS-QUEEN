require("dotenv").config();

console.log("╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮");
console.log("     👑 MYSTERIOUS QUEEN");
console.log("╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯");
console.log("");
console.log("🤖 Telegram pairing system starting...");
console.log("📱 WhatsApp bot system loading...");
console.log("");

if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.log("❌ TELEGRAM_BOT_TOKEN is missing from .env");
    process.exit(1);
}

console.log("✅ Configuration loaded");
console.log("👑 Mysterious Queen is ready to start");
