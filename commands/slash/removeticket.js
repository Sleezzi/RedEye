module.exports = {
    data: {
        name: "removeticket",
        name_localizations: {
            "en-US": "supprimerticket",
            fr: "removeticket"
        },
        description: "Remove a  ticket",
        description_localizations: {
            "en-US": "Remove a ticket",
            fr: "Supprime un ticket"
        },
        default_permission: undefined,
        dm_permission: undefined,
        options: [
            {
                name: 'id',
                name_localizations: {
                    fr: "id",
                    "en-US": "id"
                },
                description: 'The ticket\'s id',
                description_localizations: {
                    fr: "L'id du ticket",
                    "en-US": "The ticket's id"
                },
                required: true,
                type: 3,
            },
        ],
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        try {
            for (const userId in client.data.tickets) {
                if (client.data.tickets.get(userId)[interaction.options.getString("id")]) {
                    if (userId === interaction.member.id || interaction.member.permissions.has("ManageMember")) {
                        const tickets = {...client.data.tickets.get(interaction.member.id)};
                        delete tickets[interaction.options.getString("id")]
                        client.data.tickets.set(interaction.member.id, tickets);
                        interaction.deleteReply().then(() => interaction.followUp({ content: `This ticket has been removed`, ephemeral: true  }));
                    } else interaction.deleteReply().then(() => interaction.followUp({ content: `You can't remove this ticket`, ephemeral: true  }));
                } else interaction.deleteReply().then(() => interaction.followUp({ content: `You can't remove this ticket`, ephemeral: true  }));
            }
        } catch(err) { return err; }
    }
}