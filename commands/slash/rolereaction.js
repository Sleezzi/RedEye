module.exports = {
    data: {
        name: "rolereaction",
        name_localizations: {
            "en-US": "rolereaction",
            fr: "rolereaction"
        },
        description: "Adds a reaction to a message, when a member reacts to it, a role is added to them",
        description_localizations: {
            "en-US": "Adds a reaction to a message, when a member reacts to it, a role is added to them",
            fr: "Ajoute une réaction à un message, lorsqu'un membre réagit a celle-ci, un role lui est ajouté"
        },
        default_permission: undefined,
        dm_permission: undefined,
        options: [
            {
                name: 'reaction',
                name_localizations: {
                    fr: "reaction",
                    "en-US": "reaction"
                },
                description: 'The emoji used for the reaction',
                description_localizations: {
                    fr: "L'émoji utilisé pour la réaction",
                    "en-US": "The emoji used for the reaction"
                },
                required: true,
                type: "string",
            },
            {
                name: 'message',
                name_localizations: {
                    fr: "message",
                    "en-US": "message"
                },
                description: 'The id of the message under which the bot must add the reaction',
                description_localizations: {
                    fr: "L'id du message sous lequel le bot doit ajouter la réaction",
                    "en-US": "The id of the message under which the bot must add the reaction"
                },
                required: true,
                type: "string"
            },
            {
                name: 'role',
                name_localizations: {
                    fr: "role",
                    "en-US": "role"
                },
                description: 'The role to add to the member when he reacts to the message',
                description_localizations: {
                    fr: "Le role a ajouter au membre quand il réagi au message",
                    "en-US": "The role to add to the member when he reacts to the message"
                },
                required: true,
                type: "role",
            },
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            if (!interaction.member.permissions.has("ManageMember")) {
                await interaction.deleteReply();
                interaction.followUp({ content: `You don't have the permission to do this.`, ephemeral: true });
                return;
            }

            // if (!interaction.channel.messages.cache.has("1200811838162599956")) {//interaction.options.getString("message"))) {
            //     await interaction.deleteReply();
            //     interaction.followUp({ content: `The message \`${interaction.options.getString("message")}\` doesn't existe.`, ephemeral: true  });
            //     return;
            // }

            if (!interaction.options.getString("reaction").startsWith(":") || !interaction.options.getString("reaction").endsWith(":")) {
                await interaction.deleteReply();
                interaction.followUp({ content: `The emoji \`${interaction.options.getString("reaction")}\` is not a valid emoji.`, ephemeral: true  });
                return;
            }
// interaction.options.getString("message")
            interaction.channel.messages.cache.fetch("1200811838162599956").react(interaction.options.getString("reaction"));

            const embed = {
                color: 0x0099ff,
                title: 'Role reaction added',
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: "",
                },
                fields: [
                    { name: `__Message:__`, value: `> \`${interaction.options.getString("message")}\``, inline: true},
                    { name: `__Reaction:__`, value: `> ${interaction.options.getString("emoji")}`, inline: true},
                    { name: `__Role:__`, value: `> ${interaction.options.getRole("role")}`, inline: true},
                    { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: false},
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };
            await interaction.deleteReply();
            interaction.followUp({ embeds: [embed], ephemeral: true  });
        } catch(err) { return err; }
    }
}