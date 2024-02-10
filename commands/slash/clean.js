module.exports = {
    data: {
        name: "clean",
        name_localizations: {
            fr: "nettoyer",
            "en-US": "clean"
        },
        description: "Delete messages in the channel in which the command is used",
        description_localizations: {
            fr: "Supprime tous les messages du bot sur le salon",
            "en-US": "Delete messages in the channel in which the command is used"
        },
        default_permission: undefined,
        default_member_permissions: "8192",
        dm_permission: undefined,
        options: [],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        if (!interaction.member.permissions.has("ManageMessages")) {
            await interaction.deleteReply();
            interaction.followUp({ embeds: [
                {
                    title: "<a:no:1205984659524296744> - You do not have permission to delete messages",
                    color: 0xFF0000,
                    author: {
                        name: interaction.member.tag,
                        icon_url: interaction.member.user.avatarURL(),
                        url: interaction.url,
                    },
                    footer: {
                        text: `Id: ${interaction.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                }
            ], ephemeral: true });
            return;
        }
        try {
            let messages = { size: 1};
            let messagesDeleted = 0;
            do {
                messages = await interaction.channel.messages.fetch({ limit: 100 })
                .then(messages => messages.filter((msg) => msg.member.id === client.user.id && 1_209_600_000 > Date.now() - msg.createdAt && msg.bulkDeletable));
                try {
                    await interaction.channel.bulkDelete(messages);
                } catch(err) { return err; }
                messagesDeleted += messages.size;
            } while (messages.size >= 2);
            interaction.followUp({ embeds: [{
                title: `<:trash:1205985915160371221> - **Channel content delete** (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`,
                color: 0x00FF00,
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url,
                },
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            }], ephemeral: true });
        } catch(err) { return err; }
    }
}