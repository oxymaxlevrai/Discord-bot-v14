const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require("./config");
const { manageCommands } = require('./manager/manageCommands');
const { manageEvents } = require('./manager/manageEvents');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
manageCommands(client);
manageEvents(client);


client.login(config.token);