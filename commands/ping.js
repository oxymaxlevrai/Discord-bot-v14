const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répond pong !'),
    async execute(client, interaction) {
        const embed = new EmbedBuilder().setColor(0x101010).setTimestamp().setFooter({ text: `Requis par ${interaction.user.username}` });
        interaction.reply({ embeds: [embed.setDescription(`🏓 Pong !`)], ephemeral: false });
    },
};