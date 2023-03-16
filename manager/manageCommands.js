const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const config = require('../config');
const commands = [];

const manageCommands = async (client) => {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        console.log(`La commande /${command.data.name} à été chargée avec succès !`)
    }

    const rest = new REST({version: '10'}).setToken(config.token);
    rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {body: commands})
    .then().catch(console.error);
}

module.exports = { manageCommands };