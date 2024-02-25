module.exports = {
    data: {
        name: "ticket",
        name_localizations: {
            "en-US": "ticket",
            fr: "ticket"
        },
        description: "Make a new ticket",
        description_localizations: {
            "en-US": "Make a new ticket",
            fr: "Créé un nouveau ticket"
        },
        default_permission: undefined,
        dm_permission: undefined,
        options: [
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
    async execute(interaction, client, Discord) {
        try {
            const tickets = await require("../../components/database").get(`/${interaction.guild.id}/tickets/${interaction.member.id}`);
            if (tickets.length >= 15 && interaction.member.id !== client.ownerId) {
                interaction.followUp({ content: `<a:no:1211019198881472622> - Sorry but you have reached the maximum ticket limit`, ephemeral: true  });
                return;
            }
            const { v1: uuid} = require("uuid");
            const id = uuid();
            require("../../components/database").set(`/${interaction.guild.id}/tickets/${interaction.member.id}/${id}`, {
                cat: interaction.options.getString("category"),
                content: interaction.options.getString("content").replace(/\`/g, "``"),
                username: interaction.member.user.username,
                status: "Not done",
                madeAt: Math.floor(Date.now() / 1000)
            });
            await interaction.deleteReply();
            interaction.followUp({ content: `The ticket has been created, (id of ticket: \`${id}\`)`, ephemeral: true  });
        } catch(err) { return err; }
    }
}