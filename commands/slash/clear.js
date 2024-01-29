module.exports = {
    permissions: "ManageMessages",
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
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        if (!interaction.member.permissions.has("ManageMessages")) {
            await interaction.deleteReply();
            interaction.followUp({ content: "You do not have permission to delete interactions", ephemeral: true });
            return;
        }
        let amount = interaction.options.getNumber("number");
        if (!amount) {
            await interaction.deleteReply();
            interaction.followUp({ content: 'You must specify a number of messages to delete', ephemeral: true });
            return;
        }
        amount++
        if (amount > 100) amount = 100;
            
        try {
            interaction.channel.messages.fetch({ limit: amount }).then(async (messages) => {
                try {
                    await interaction.channel.bulkDelete(messages.filter((msg) => 1_209_600 > Math.floor((Date.now() - msg.createdTimestamp) / 1000)))
                    await interaction.deleteReply();
                    interaction.followUp({ content: `Multiple Messages Deleted (${messages.filter((msg) => 1_209_600 > Math.floor((Date.now() - msg.createdTimestamp) / 1000)).size} message${((messages.filter((msg) => 14 < msg.createdTimestamp - Date.now()).size) > 1 ? "s" : "")})`, ephemeral: true });
                } catch(err) { return err; }
            });
        } catch(err) { return err; }
    }
}