module.exports = {
    data: {
        name: "joke",
        name_localizations: {
            "en-US": "joke",
            fr: "blague"
        },
        description: "Send a joke",
        description_localizations: {
            "en-US": "Send a joke",
            fr: "Envoie une blague"
        },
        options:  [
            {
                type: 3,
                name: 'type',
                name_localizations: {
                    "en-US": "type",
                    fr: "type"
                },
                description: 'What type of joke',
                description_localizations: {
                    "en-US": "What type of joke",
                    fr: "Quelle type de blague ?"
                },
                required: true,
                choices: [
                    {
                        name: 'single',
                        name_localizations: {
                            "en-US": "single",
                            fr: "seule"
                        },
                        value: 'single'
                    },
                    {
                        name: 'twopart',
                        name_localizations: {
                            "en-US": "twopart",
                            fr: "endepartie"
                        },
                        value: 'twopart'
                    }
                ]
            },
            {
                type: 3,
                name: 'category',
                name_localizations: {
                    "en-US": "category",
                    fr: "categorie"
                },
                description: 'What category of joke',
                description_localizations: {
                    "en-US": "What category of joke",
                    fr: "Quelle catégorie de blague ?"
                },
                required: true,
                choices: [
                    {
                        name: 'any',
                        name_localizations: {
                            "en-US": "any",
                            fr: "rien"
                        },
                        value: "Any"
                    },
                    {
                        name: 'programming',
                        name_localizations: {
                            "en-US": "programming",
                            fr: "programmation"
                        },
                        value: 'Programming'
                    },
                    {
                        name: 'misc',
                        name_localizations: {
                            "en-US": "misc",
                            fr: "divers"
                        },
                        value: 'Miscellaneous'
                    },
                    {
                        name: 'dark',
                        name_localizations: {
                            "en-US": "head",
                            fr: "noir"
                        },
                        value: 'Dark'
                    },
                    {
                        name: 'pun',
                        name_localizations: {
                            "en-US": "pun",
                            fr: "jeudemot"
                        },
                        value: 'Pun'
                    },
                    {
                        name: 'spooky',
                        name_localizations: {
                            "en-US": "spooky",
                            fr: "halloween"
                        },
                        value: 'Spooky'
                    },
                    {
                        name: 'christmas',
                        name_localizations: {
                            "en-US": "christmas",
                            fr: "noel"
                        },
                        value: 'Christmas'
                    }
                ]
            },
            {
                type: 3,
                name: 'lang',
                name_localizations: {
                    "en-US": "lang",
                    fr: "langue"
                },
                description: 'The language of the joke',
                description_localizations: {
                    "en-US": "The language of the joke",
                    fr: "La langue de la blague"
                },
                required: true,
                choices: [
                    {
                        name: 'en',
                        name_localizations: {
                            "en-US": "english",
                            fr: "anglais"
                        },
                        value: "en"
                    },
                    {
                        name: 'french',
                        name_localizations: {
                            "en-US": "french",
                            fr: "francais"
                        },
                        value: 'fr'
                    },
                    {
                        name: 'spanish',
                        name_localizations: {
                            "en-US": "spanish",
                            fr: "espagnol"
                        },
                        value: 'es'
                    },
                    {
                        name: 'german',
                        name_localizations: {
                            "en-US": "german",
                            fr: "allemand"
                        },
                        value: 'de'
                    },
                    {
                        name: 'czech',
                        name_localizations: {
                            "en-US": "czech",
                            fr: "theque"
                        },
                        value: 'cs'
                    },
                    {
                        name: 'portuguese',
                        name_localizations: {
                            "en-US": "portuguese",
                            fr: "portugais"
                        },
                        value: 'pt'
                    }
                ]
            },
            {
                type: 3,
                name: 'nsfw',
                name_localizations: {
                    "en-US": "nsfw",
                    fr: "nsfw"
                },
                description: 'Enabled NSFW?',
                description_localizations: {
                    "en-US": "Enabled NSFW?",
                    fr: "Activé le NSFW ?"
                },
                required: true,
                choices: [
                    {
                        name: 'yes',
                        name_localizations: {
                            "en-US": "yes",
                            fr: "oui"
                        },
                        value: "true"
                    },
                    {
                        name: 'no',
                        name_localizations: {
                            "en-US": "no",
                            fr: "non"
                        },
                        value: 'false'
                    }
                ]
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let category = interaction.options.getString('category');
            let lang = interaction.options.getString('lang');
            let type = interaction.options.getString('type');
            let nsfw = interaction.options.getString('nsfw');
            let response = await fetch(`https://v2.jokeapi.dev/joke/${category}?lang=${lang}&blacklistFlags=${(nsfw === "true" ? "nsfw," : "")}religious,political,racist,sexist,explicit&type=${type}`)
            if (response.status === 200) {
                response = await response.json();
                if (response.error === false) {
                    if (type === "single") {
                        await interaction.deleteReply();
                        interaction.followUp({ content: `${response.joke}`, ephemeral: true });
                    } else {
                        await interaction.deleteReply();
                        interaction.followUp({ content: `${response.setup}\n||${response.delivery}||`, ephemeral: true });
                    }
                } else {
                    await interaction.deleteReply();
                    interaction.followUp({ content: `There was an error while executing this command : ${response.causedBy[0]}`, ephemeral: true });
                }
            } else {
                await interaction.deleteReply();
                interaction.followUp({ content: `There was an error while executing this command`, ephemeral: true });
            }
        } catch(err) { return err; }
    }
}