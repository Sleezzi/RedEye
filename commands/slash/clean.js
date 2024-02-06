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
        if (interaction.member.permissions.has("ManageMessages")) {
            try {
                let fetchedMessages = { size: 1};
                let messagesDeleted = 0;
                do {
                    fetchedMessages = await interaction.channel.messages.fetch({ limit: 100, filter: (msg) => msg && 1_209_600 > Math.floor((Date.now() - msg.createdTimestamp) / 1_000) && msg.bulkDeletable && msg.member.id === client.user.id});
                    
                    try {
                        await interaction.channel.bulkDelete(fetchedMessages);
                    } catch(err) { return err; }
                    messagesDeleted += fetchedMessages.size;
                } while (fetchedMessages.size >= 2);
                interaction.followUp({ embeds: [{
                    title: `:put_litter_in_its_place: - **Channel content delete** (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`,
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
        } else {
            await interaction.deleteReply();
            interaction.followUp({ embeds: [
                {
                    title: ":x: - You do not have permission to delete messages",
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
        }
    }
}