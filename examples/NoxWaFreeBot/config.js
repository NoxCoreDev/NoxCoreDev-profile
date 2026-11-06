export const NoxCoreDevConfig = {
  botName: "NoxWaFreeBot",
  ownerName: "NoxCoreDev",
  ownerNumber: "OWNER_NUMBER",
  prefix: ".",
  mode: "public",
  sessionDirectory: "session",
  pairingCode: true,
  reconnectDelayMs: 3000,
  autoFollowNewsletters: true,
  autoReactNewsletters: true,
  newsletterJids: Object.freeze([
    "120363434925681370@newsletter",
    "120363428923746817@newsletter",
  ]),
  reactionEmojis: Object.freeze([
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "😊",
    "😎", "😍", "🥰", "😘", "🤩", "🥳", "🤔", "🤗", "🤝", "👏",
    "👍", "👎", "🙏", "💪", "🔥", "✨", "⭐", "🌟", "🎉", "💯",
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💖",
    "💫", "⚡", "🚀", "🎯", "✅", "🙌", "💡", "🎵", "🌈", "☀️",
    "🌻", "🍀", "🌍", "💎", "📌", "📣", "🤖", "🧠", "📱", "💻",
  ]),
  commands: Object.freeze([
    ".ping", ".alive", ".menu", ".mode", ".self", ".public",
    ".owner", ".welcome on/off", ".goodbye on/off",
  ]),
  welcome: {
    enabled: false,
    message: "Bienvenue @user dans le groupe !",
  },
  goodbye: {
    enabled: false,
    message: "Au revoir @user, bonne continuation !",
  },
};
