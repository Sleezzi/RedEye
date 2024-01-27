module.exports = {
    data: {
        name: "say",
        name_localizations: {
            fr: "dire",
            "en-US": "say"
        },
        description: "Delete messages in the channel in which the command is used",
        description_localizations: {
            fr: "Supprime tous les messages du bot sur le salon",
            "en-US": "Delete messages in the channel in which the command is used"
        },
        default_permission: undefined,
        default_member_permissions: "8",
        dm_permission: undefined,
        options: [
            {
                name: 'text',
                name_localizations: {
                    fr: "texte",
                    "en-US": "text"
                },
                description: 'Text to say',
                description_localizations: {
                    fr: "Le texte à dire",
                    "en-US": "Text to say"
                },
                required: true,
                type: "String",
            }
        ],
        nsfw: false
    },
    async execute(interaction, _, client, Discord) {
        if (interaction.member.permissions.has("Administrator")) {
            try {
                interaction.channel.send({ content: interaction.options.getString("text") });
            } catch(err) { return err; }
        } else {
            interaction.followUp({ content: "You do not have permission to do that.", ephemeral: true });
        }
    }
}