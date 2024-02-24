module.exports = {
    data: {
        name: "leave",
        name_localizations: {
            "en-US": "leave",
            fr: "quitter"
        },
        description: "Make the bot leave a guild",
        description_localizations: {
            "en-US": "Make the bot leave a guild",
            fr: "Fait quitter le bot d'un server"
        },
        default_member_permissions: "8",
        options: [
            {
                name: 'id',
                name_localizations: {
                    fr: "id",
                    "en-US": "id"
                },
                description: 'The id of the guild',
                description_localizations: {
                    fr: "The id of the guild",
                    "en-US": "L'id du serveur"
                },
                required: true,
                type: "string",
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        if (interaction.member.id === client.ownerId) {
            if (!interaction.options.getString("id")) {
                await interaction.deleteReply();
                interaction.followUp({ content: `Please enter a good id`, ephemeral: true });
                return;
            }
            if (!client.guilds.cache.has(interaction.options.getString("id")) || interaction.guild.id === interaction.options.getString("id")) {
                await interaction.deleteReply();
                interaction.followUp({ content: `Please enter a good id`, ephemeral: true });
                return;
            }
            await client.guilds.cache.get(interaction.options.getString("id")).leave();
            await interaction.deleteReply();
            interaction.followUp({ content: `The bot left server **${interaction.options.getString("id")}**`, ephemeral: true });
        } else {
            await interaction.deleteReply();
            interaction.followUp({ content: `<a:no:1211019198881472622> - <@${interaction.member.id}>, you do not have the necessary permissions to use this command`, ephemeral: true });
        }
    }
}