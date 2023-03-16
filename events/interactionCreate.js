const { Events } = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    async execute(client, interaction) {
        /*----------[COMMANDS]----------*/
        if (!interaction.isChatInputCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`Aucune commande correspondant à ${interaction.commandName} n'a été trouvée.`); return;
        }
        try {
            await command.execute(client, interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({
                content: "Une erreur s'est produite, lors de l'exécution de cette commande !",
                ephemeral: true
            })
        }
    }
}