module.exports = {
    data: {
        name: "stop",
        name_localizations: {
            "en-US": "stop",
            fr: "arret"
        },
        description: "Stop the bot",
        description_localizations: {
            "en-US": "Stop the bot",
            fr: "Arrête le bot"
        },
        default_member_permissions: "8",
        options: [],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        if (interaction.member.id === client.ownerId) {
            setTimeout(() => {
                client.destroy(client.config.token);
            }, 4990);
        } else {
            await interaction.deleteReply()
            interaction.followUp({ content: `<a:no:1211019198881472622> - <@${interaction.member.id}>, you do not have the necessary permissions to use this command`, ephemeral: true });
        }
    }
}