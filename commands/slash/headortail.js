module.exports = {
    data: {
        name: "headortail",
        name_localizations: {
            "en-US": "headortail",
            fr: "pileouface"
        },
        description: "Toss head or tail",
        description_localizations: {
            "en-US": "Toss head or tail",
            fr: "Joue a pile ou face"
        },
        options:  [
            {
                type: 3,
                name: 'chosen',
                name_localizations: {
                    "en-US": "chosen",
                    fr: "choisie"
                },
                description: 'Choose your face',
                description_localizations: {
                    "en-US": "Choose your face",
                    fr: "Choisie ta face"
                },
                required: false,
                choices: [
                    {
                        name: 'none',
                        name_localizations: {
                            "en-US": "none",
                            fr: "rien"
                        },
                        value: ""
                    },
                    {
                        name: 'Choose tail',
                        name_localizations: {
                            "en-US": "tail",
                            fr: "pile"
                        },
                        value: 'tail'
                    },
                    {
                        name: 'Choose head',
                        name_localizations: {
                            "en-US": "head",
                            fr: "face"
                        },
                        value: 'head'
                    }
                ]
            }
        ],
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        try {
    
            let face = interaction.options.getString("chosen");
            
            const result = Math.random() < 0.5 ? 'tail' : 'head';
            if (face && face !== "none") {
                if (face !== "head" && face !== "tail") return interaction.deleteReply().then(() => interaction.followUp({ content: 'The face chosen is not good.', ephemeral: true }));
                if (result === face) {
                    await interaction.deleteReply().then(() => interaction.followUp({ content: "You won", ephemeral: false })).then((msg) => {
                        if (msg.deletable) {
                            setTimeout(function() { msg.delete(); }, 5000);
                        }
                    });
                } else {
                    await interaction.deleteReply().then(() => interaction.followUp({ content: "You lost", ephemeral: false })).then((msg) => {
                        if (msg.deletable) {
                            setTimeout(function() { msg.delete(); }, 5000);
                        }
                    });
                }
            } else {
                await interaction.deleteReply().then(() => interaction.followUp({ content: `It's falling on \`${result}\``, ephemeral: false })).then((msg) => {
                    if (msg.deletable) {
                        setTimeout(function() { msg.delete(); }, 5000);
                    }
                });
            }
        } catch(err) { return err; }
    }
}