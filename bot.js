require("dotenv").config();
const token = process.env.TOKEN;
const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity("destroying EDG !help");
});

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./cmds/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./cmds/${file}`);
  client.commands.set(command.name, command);
}
client.listener = new Collection();
const listenerFiles = fs
  .readdirSync("./listeners/")
  .filter((file) => file.endsWith(".js"));
for (const file of listenerFiles) {
  const listeners = require(`./listeners/${file}`);
  client.listener.set(listeners.name, listeners);
}

const listenFiles = fs.readdirSync("listeners").map((file) => {
  return file.slice(0, file.length - 3);
});
console.log(listenFiles);

// login to discord
client.login(token);

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!")) {
    const [cmd, ...args] = message.content.trim().substring(1).split(/\s+/);
    console.log("author: " + message.author);
    console.log(args);

    if (!client.commands.has(cmd)) return;
    try {
      client.commands.get(cmd).execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply({
        content: "TEAM WE IS THE BEST TEAM",
        ephemeral: true,
      });
    }
  } else {
    listenFiles.forEach((file) => {
      client.listener.get(file).execute(message, client);
    });
  }
});
