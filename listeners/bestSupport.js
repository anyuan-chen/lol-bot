const { MessageEmbed } = require("discord.js");



module.exports = {
  name: "bestSupport",
  description: "insult missing?",
  execute(message) {
    if (message.content.toLowerCase().includes("best support")) {
      const helpPage = new MessageEmbed()
        .setColor("#ff0000")
        .setTitle("你好. Greetings, comrades.")
        .setAuthor(
          "Missing 娄运峰",
          "https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/02/WE_Missing_2021_Split_2.png/revision/latest/scale-to-width-down/220?cb=20210604183939"
        )
        .setDescription("我们都是WE的粉丝. All hail WE。 | Prefix: `!`")
        .addFields({
          name: "**MODERATION**",
          value:
            "`kick` - 提你" +
            "\n`punish` - 傻逼再见" + // go to the gulag with babushka
            "\n`redeem` - 给我道歉",
        });
      message.channel.send({ embeds: [helpPage] }); // sending the help page
    }
  },
};
