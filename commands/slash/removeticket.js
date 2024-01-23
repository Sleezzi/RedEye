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
            require("../../components/database").get(`/${interaction.guild.id}/tickets/${interaction.member.id}/${interaction.options.getString("id")}`, client).then((ticket) => {
                if (ticket.content) {
                    require("../../components/database").delete(`/${interaction.guild.id}/tickets/${interaction.member.id}/${interaction.options.getString("id")}`, client)
                    interaction.deleteReply().then(() => interaction.followUp({ content: `This ticket has been removed`, ephemeral: true  }));
                } else interaction.deleteReply().then(() => interaction.followUp({ content: `You can't remove this ticket`, ephemeral: true  }));
            });
        } catch(err) { return err; }
    }
}