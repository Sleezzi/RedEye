module.exports = {
    data: {
        name: "meme",
        name_localizations: {
            "en-US": "meme",
            fr: "meme"
        },
        description: "Send a random meme image",
        description_localizations: {
            "en-US": "Send a random meme image",
            fr: "Envoyer une image mème aléatoire"
        },
    },
    async execute(interaction, client, Discord) {
        const theme = interaction.options.getString("theme");
        try {
            let response = await fetch(`https://api.imgflip.com/get_memes`, { method: "GET", referrer: "https://blueprint.sleezzi.fr/", });
            if (response.status === 200) {   
                response = await response.json();
                const memes = response.data.memes[Math.floor(Math.random() * response.data.memes.length)];
                const embed = {
                    color: 0x0099ff,
                    title: '<a:ho:1211066398621831228> - Meme',
                    author: {
                        name: interaction.member.tag,
                        icon_url: interaction.member.user.avatarURL(),
                        url: interaction.url,
                    },
                    fields: [
                        { name: "Title", value: memes.name },
                        { name: "URL", value: `\`${memes.url}\`` },
                        { name: "ID", value: `\`${memes.id}\`` },
                    ],
                    image: {
                        url: memes.url
                    },
                    footer: {
                        text: `Id: ${interaction.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                    url: interaction.url
                };
                await interaction.followUp({ embeds: [embed], ephemeral: true });
            } else {
                await interaction.followUp({ content: 'Unable to find a meme', ephemeral: true });
                return response.status;
            }
        } catch(err) { return err; }
    }
}