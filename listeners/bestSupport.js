const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bestSupport",
  description: "insult missing?",
  execute(message) {
    if (message.content.toLowerCase().contains("best support")) {
      const helpPage = new MessageEmbed();
    }
  },
};
