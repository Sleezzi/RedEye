module.exports = {
    data: {
        name: "say",
        name_localizations: {
            fr: "dire",
            "en-US": "say"
        },
        description: "Make the bot say something",
        description_localizations: {
            fr: "Fait dire quelque chose au bot",
            "en-US": "Make the bot say something"
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
    async execute(interaction, client, Discord) {
        if (interaction.member.permissions.has("Administrator")) {
            try {
                interaction.channel.send({ content: interaction.options.getString("text") });
            } catch(err) { return err; }
        } else {
            interaction.followUp({ content: "<a:no:1209518375169167391> - You do not have permission to do that.", ephemeral: true });
        }
    }
}