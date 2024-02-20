module.exports = {
    data: {
        name: "delete",
        name_localizations: {
            "fr": "supprimer"
        },
        type: "message",
        default_permission: undefined,
        default_member_permissions: "8192",
        dm_permission: undefined
    },
    async execute(interaction, client, Discord) {
        try {
            const message = interaction.channel.messages.cache.get(interaction.targetId);
            if (!message) {
                await interaction.deleteReply();
                interaction.followUp({ embeds: [
                    {
                        title: "<a:no:1209518375169167391> - Unable to find the messsage",
                        color: 0xFF0000,
                        author: {
                            name: message.member.tag,
                            icon_url: message.member.user.avatarURL(),
                            url: message.url,
                        },
                        footer: {
                            text: `Id: ${message.id}`,
                            icon_url: client.user.avatarURL(),
                        },
                    }
                ], ephemeral: true });
                return;
            }
            if (!interaction.member.permissions.has("ManageMessages")) {
                await interaction.deleteReply();
                interaction.followUp({ embeds: [{
                    title: "<a:no:1209518375169167391> - You do not have permission to delete messages",
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
                }], ephemeral: true });
                return;
            }
            if (!message.deletable) {
                await interaction.deleteReply();
                interaction.followUp({ embeds: [
                    {
                        title: `<a:no:1209518375169167391> - I can't delete this message`,
                        color: 0xFF0000,
                        author: {
                            name: message.member.tag,
                            icon_url: message.member.user.avatarURL(),
                            url: message.url,
                        },
                        footer: {
                            text: `Id: ${message.id}`,
                            icon_url: client.user.avatarURL(),
                        },
                    }
                ], ephemeral: true });
                return;
            }
            await message.delete();
            await interaction.deleteReply();
            interaction.followUp({ embeds: [
                {
                    title: `<:trash:1205985915160371221> - Message deleted`,
                    color: 0x00FF00,
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                }
            ], ephemeral: true });
        } catch (err) { console.error(err); }
    }
}