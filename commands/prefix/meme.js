module.exports = {
    name: "meme",
    description: "Send a random meme image",
    model: `image **\`the theme of the image\`**`,
    category: "Misc",
    cooldown: 15_000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        try {
            let response = await fetch(`https://api.imgflip.com/get_memes`, { method: "GET", referrer: "https://blueprint.sleezzi.fr/", });
            if (response.status === 200) {   
                response = await response.json();
                const memes = response.data.memes[Math.floor(Math.random() * response.data.memes.length)];
                const embed = {
                    color: 0x0099ff,
                    title: '<a:ho:1211066398621831228> - Meme',
                    author: {
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
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
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                    url: message.url
                };
                const msg = await message.channel.send({ embeds: [embed], ephemeral: true });
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 25_000);
            } else {
                const msg = await message.channel.send({ content: 'Unable to find an image on this topic', ephemeral: true });
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 5_000);
                console.error(response.status);
            }
        } catch(err) {
            const msg = await message.channel.send({ content: 'An error occurred while retrieving the image', ephemeral: true });
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5_000);
            console.error(err);
        }
        if (message && message.deletable) message.delete();
    }
}