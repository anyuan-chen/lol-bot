const { cargoQuery } = require("poro");

const getPlayers = async (player) => {
  console.log(cargoQuery)
  const playerReq = await cargoQuery({
    tables: ["Players"],
    fields: ["Players.Role"],
    where: `Players.Name = ${player}`,
  });
  return playerReq;
};

module.exports = {
  name: "getPlayer",
  description: "get a player duh",
  execute(message, args) {
    if (args.length === 1) {
      getPlayers(args[0]);
      console.log(playerReq);
    }
  },
};
