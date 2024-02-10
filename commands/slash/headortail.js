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
    async execute(interaction, client, Discord) {
        try {
    
            let face = interaction.options.getString("chosen");
            
            const result = Math.random() < 0.5 ? 'tail' : 'head';
            if (face && face !== "none") {
                if (face !== "head" && face !== "tail") {
                    await interaction.deleteReply();
                    interaction.followUp({ content: 'The face chosen is not good.', ephemeral: true });
                    return;
                }
                if (result === face) {
                    await interaction.deleteReply()
                    const msg = await interaction.followUp({ content: "You won", ephemeral: false });
                    setTimeout(() => {
                        try {
                            msg.delete();
                        } catch (err) {
                            return err;
                        }
                    }, 5000);
                } else {
                    await interaction.deleteReply();
                    const msg = await interaction.followUp({ content: "You lost", ephemeral: false });
                    setTimeout(() => {
                        try {
                            msg.delete();
                        } catch (err) {
                            return err;
                        }
                    }, 5000);
                }
            } else {
                await interaction.deleteReply();
                const msg = await interaction.followUp({ content: `It's falling on \`${result}\``, ephemeral: false });
                setTimeout(() => {
                    try {
                        msg.delete();
                    } catch (err) {
                        return err;
                    }
                }, 5000);
            }
        } catch(err) { return err; }
    }
}