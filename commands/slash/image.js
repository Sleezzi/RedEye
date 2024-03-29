module.exports = {
    data: {
        name: "image",
        name_localizations: {
            "en-US": "image",
            fr: "image"
        },
        description: "Send a photo on a specific theme (may not work properly)",
        description_localizations: {
            "en-US": "Send a photo on a specific theme (may not work properly)",
            fr: "Envoie une photo sur un thème précie (peut ne pas fonctionner correctement)"
        },
        default_member_permissions: "attachfiles",
        options: [
            {
                type: 3,
                name: 'theme',
                name_localizations: {
                    "en-US": "theme",
                    fr: "theme"
                },
                description: 'The theme of the image',
                description_localizations: {
                    "en-US": "The theme of the image",
                    fr: "Le thème de l'image"
                },
                required: true,
                nsfw: false
            }
        ]
    },
    async execute(interaction, client, Discord) {
        const theme = interaction.options.getString("theme");
        try {
            const response = await fetch(`https://source.unsplash.com/1920x1080/?${theme}`);
            
            if (response.ok) {                
                const msg = await interaction.followUp({ content: `We found that with “UNSPLASH”, is that what you wanted? ${response.url}`, ephemeral: true });
                if (msg.deletable) {
                    setTimeout(() => {
                        msg.delete();
                    }, 60_000);
                }
            } else {
                await interaction.deleteReply();
                interaction.followUp({ content: 'Unable to find an image on this topic', ephemeral: true });
            }
        } catch(err) {
            await interaction.deleteReply();
            interaction.followUp({ content: 'An error occurred while retrieving the image', ephemeral: true });
            return err;
        }
    }
}