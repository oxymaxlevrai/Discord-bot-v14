const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Permet de kick un membre.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for banning')),
    async execute(client, interaction) {
        const eError = new EmbedBuilder().setColor(0xff0060).setTimestamp().setFooter({ text: `Requis par ${interaction.user.username}` });
        const eSuccess = new EmbedBuilder().setColor(0x00ff60).setTimestamp().setFooter({ text: `Requis par ${interaction.user.username}` });

        const target = interaction.options.getMember('target') || interaction.options.get('target');
        const reason = interaction.options.getString('reason') ?? 'Aucune raison fournie.';

        const owner = await interaction.guild.fetchOwner();

        if(target.id == owner.user.id) return interaction.reply({ embeds: [eError.setDescription("Impossible de kick le propiétaire du serveur.")], ephemeral: false });
        if(interaction.member.roles.highest.position < target.roles.highest.position) interaction.reply({ embeds: [eError.setDescription("Impossible de kick un membre plus haut gradé que vous.")], ephemeral: false })
        else {
            target.ban({reason: reason});
            await interaction.reply({ embeds: [eSuccess.setDescription(`Le membre ${target.user.username} viens d'être banni avec comme raison : "${reason}".`)], ephemeral: false });
        }


    },
};