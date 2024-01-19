module.exports = {
    data: {
        name: "editticket",
        name_localizations: {
            "en-US": "editticket",
            fr: "editticket"
        },
        description: "Edit a ticket",
        description_localizations: {
            "en-US": "Edit a ticket",
            fr: "Bannie un membre du serveur"
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
            {
                name: 'category',
                name_localizations: {
                    fr: "categorie",
                    "en-US": "category"
                },
                description: 'The ticket category',
                description_localizations: {
                    fr: "La categorie du ticket",
                    "en-US": "The ticket category"
                },
                required: true,
                type: 3,
                choices: [
                    {
                        name: "bot",
                        name_localizations: {
                            fr: "bot",
                            "en-US": "bot"
                        },
                        description: 'The problem you have is with the bot',
                        description_localizations: {
                            fr: "Le problème que vous avez est avec le bot",
                            "en-US": "The problem you have is with the bot"
                        },
                        value: "bot"
                    },
                    {
                        name: "server",
                        name_localizations: {
                            fr: "serveur",
                            "en-US": "server"
                        },
                        description: 'The problem you have is with the server',
                        description_localizations: {
                            fr: "Le problème que vous avez est avec le serveur",
                            "en-US": "The problem you have is with the server"
                        },
                        value: "server"
                    },
                    {
                        name: "other",
                        name_localizations: {
                            fr: "autre",
                            "en-US": "other"
                        },
                        description: 'The problem you are having is not listed',
                        description_localizations: {
                            fr: "Le problème que vous avez n'est pas dans la liste",
                            "en-US": "The problem you are having is not listed"
                        },
                        value: "other"
                    }
                ]
            },
            {
                name: 'content',
                name_localizations: {
                    fr: "contenu",
                    "en-US": "content"
                },
                description: 'Description of the problem',
                description_localizations: {
                    fr: "La description du problème",
                    "en-US": "Description of the problem"
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
                    require("../../components/database").set(`/${interaction.guild.id}/tickets/${interaction.member.id}/${interaction.options.getString("id")}`, {
                        cat: interaction.options.getString("category"),
                        content: interaction.options.getString("content"),
                        status: "Not done",
                        madeAt: ticket.madeAt,
                        updatedAt: Math.floor(Date.now() / 1000)
                    }, client);
                    interaction.deleteReply().then(() => interaction.followUp({ content: `Ticket edited!`, ephemeral: true  }));
                } else interaction.deleteReply().then(() => interaction.followUp({ content: `Error: Bad id, are you sure ${interaction.options.getString("id")} exists?`, ephemeral: true  }));
            });            
        } catch(err) { return err; }
    }
}