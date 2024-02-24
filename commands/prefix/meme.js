module.exports = {
    name: "meme",
    description: "Send a random meme image",
    model: `image **\`the theme of the image\`**`,
    category: "Fun",
    cooldown: 15_000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        try {
            let response = await fetch(`https://www.reddit.com/r/frenchmemes/top/.json?sort=top&t=hour&limit=1`, { method: "GET", referrer: "https://blueprint.sleezzi.fr/", });
            if (response.status === 200) {   
                response = await response.json();
                const embed = {
                    color: 0x0099ff,
                    title: '<a:ho:1211066398621831228> - Meme',
                    description: "From Reddit",
                    author: {
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: "Title", value: response.data.children[0].data.title },
                        { name: "Subreddit", value: response.data.children[0].data.subreddit },
                        { name: "Author", value: response.data.children[0].data.author },
                    ],
                    image: response.data.children[0].data.preview.images[0].source.url,
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                    url: response.data.children[0].data.url
                };
                const msg = await message.channel.send({ embeds: [embed], ephemeral: true });
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 10000);
            } else {
                const msg = await message.channel.send({ content: 'Unable to find an image on this topic', ephemeral: true });
                setTimeout(async () => {
                    try {
                        msg.delete();
                    } catch(err) { return err; }
                }, 5000);
                console.error(response.status);
            }
        } catch(err) {
            const msg = await message.channel.send({ content: 'An error occurred while retrieving the image', ephemeral: true });
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            console.error(err);
        }
        if (message && message.deletable) message.delete();
    }
}