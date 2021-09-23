const { leaguepedia } = require("poro");
const { MessageEmbed } = require("discord.js");

const getPlayers = async (player) => {
  const players = await leaguepedia.fetch({
    tables: ["Players"],
    fields: [
      "Players.Name",
      "Players.ID",
      "Players.Country",
      "Players.Team",
      "Players.Image",
      "Players.Role",
    ],
    where: `Players.ID = "${player}"`,
  });
  return players;
};

module.exports = {
  name: "getPlayer",
  description: "get a player duh",
  execute(message, args) {
    if (args.length === 1) {
      const res = getPlayers(args[0]).then((file) => {
        console.log(file[0]);
        const exampleEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(`${file[0].ID}`)
          .setAuthor(`${file[0].Name}`, "https://i.imgur.com/AfFp7pu.png")
          .setDescription("Some description here")
          .setThumbnail("https://i.imgur.com/AfFp7pu.png")
          .addFields(
            {
              name: "Position",
              value: `${file[0].Role}`,
            },
            {
              name: "Team",
              value: `${file[0].Team}`,
              inline: true,
            },
            {
              name: "Country",
              value: `${file[0].Country}`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("thanks leaguepedia api and poro wrapper");
        message.channel.send({ embeds: [exampleEmbed] });
      });
    } else {
      message.channel.send("ur dumb lol this player dont exist");
    }
  },
};
