module.exports = {
    data: {
        name: "clear",
        name_localizations: {
            "en-US": "clear",
            fr: "clear"
        },
        description: "Delete messages in the channel in which the command is used",
        description_localizations: {
            "en-US": "Delete messages in the channel in which the command is used",
            fr: "Supprime des messages dans le salon où la commande est utilisé"
        },
        default_member_permissions: "ManageMessages",
        options: [
            {
                name: 'number',
                name_localizations: {
                    fr: "numbre",
                    "en-US": "number"
                },
                description: 'Number of messages to delate',
                description_localizations: {
                    fr: "Nombre de messages a supprimer",
                    "en-US": "The number of messages to delate"
                },
                required: true,
                type: "Number",
            },
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Delete all messages from the member',
                description_localizations: {
                    fr: "Supprimer tous les messages du membre",
                    "en-US": "Delete all messages from the member"
                },
                required: false,
                type: 6,
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
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
        let amount = interaction.options.getNumber("number");
        if (!amount) {
            await interaction.deleteReply();
            interaction.followUp({ embeds: [{
                title: '<a:no:1209518375169167391> - You must specify a number of messages to delete',
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
        
        if (amount > 100) amount = 100;
        try {
            const messages = await interaction.channel.messages.fetch({ limit: amount })
            .then(messages => messages.filter((msg) => 1_209_600_000 > Date.now() - msg.createdAt && msg.bulkDeletable && (!interaction.options.getUser("member") || msg.member.id === interaction.options.getUser("member").id)));
            await interaction.channel.bulkDelete(messages);
            await interaction.deleteReply();
            interaction.followUp({ embeds: [{
                title: `<:trash:1205985915160371221> - ${(messages.size) > 1 ? "Multiple " : ""}Messages Deleted (${messages.size} message${messages.size > 1 ? "s" : ""})`,
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
        } catch(err) { return {err, line: 68, file: "/commands/slash/clear.js"}; }
    }
}