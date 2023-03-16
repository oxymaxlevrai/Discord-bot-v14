const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Permet de clear entre 1 et 100 messages.')
        .addStringOption(option =>
            option
                .setName('value')
                .setDescription('Nombre de messages a supprimé.')),
    async execute(client, interaction) {
        const eError = new EmbedBuilder().setColor(0xff0060).setTimestamp().setFooter({ text: `Requis par ${interaction.user.username}` });
        const eSuccess = new EmbedBuilder().setColor(0x00ff60).setTimestamp().setFooter({ text: `Requis par ${interaction.user.username}` });
        const value = interaction.options.getString('value') ?? '1';

        if(value == 0) return interaction.reply({ embeds: [eError.setDescription("Impossible de supprimé 0 Messages.")], ephemeral: false });

        if(value < 1) {
            interaction.reply({ embeds: [eError.setDescription("Impossible de supprimé 0 Messages.")], ephemeral: false });
        }

        if(value > 100) {
            interaction.reply({ embeds: [eError.setDescription("Impossible de supprimé plus de 100 Messages.")], ephemeral: false });
        }

        interaction.channel.bulkDelete(value);
        await interaction.reply({ embeds: [eSuccess.setDescription(`Vous venez de supprimés ${value} messages dans ce salon.`)], ephemeral: false });
    },
};