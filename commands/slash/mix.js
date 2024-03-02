module.exports = {
    data: {
        name: "mix",
        name_localizations: {
            "en-US": "mix",
            fr: "mix"
        },
        description: "Mix 2 words to form a new one",
        description_localizations: {
            "en-US": "Mix 2 words to form a new one",
            fr: "Mélange 2 mots pour en former un nouveau"
        },
        options: [
            {
                name: 'firstword',
                name_localizations: {
                    fr: "premiermot",
                    "en-US": "firstword"
                },
                description: 'The first word to mix',
                description_localizations: {
                    fr: "Le premier mot a mélanger",
                    "en-US": "The first word to mix"
                },
                required: true,
                type: "String",
            },
            {
                name: 'secondword',
                name_localizations: {
                    fr: "secondmot",
                    "en-US": "secondword"
                },
                description: 'The second word to mix',
                description_localizations: {
                    fr: "Le second mot a supprimer",
                    "en-US": "The second word to mix"
                },
                required: true,
                type: "String",
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            const letters = interaction.options.getString("firstword").split("").concat(interaction.options.getString("secondword").split(""));
            for (let i = letters.length - 1; i > 0; i--) {
                const random = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[random]] = [letters[random], letters[i]];
            }
            await interaction.deleteReply();
            interaction.followUp({ content: `\`${interaction.options.getString("firstword")}\` + \`${interaction.options.getString("secondword")}\` = **${letters.join("")}**`, ephermeral: true });
        } catch (err) { return err; }
    }
}