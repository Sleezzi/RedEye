module.exports = {
    name: "image",
    description: "Send a photo on a specific theme (may not work properly)",
    model: `image **\`the theme of the image\`**`,
    category: "Misc",
    cooldown: 15_000,
    async execute(message, client, Discord) {
        message.channel.sendTyping();
        const theme = message.content.split(" ").slice(0, 1).join(" ");
        try {
            const response = await fetch(`https://source.unsplash.com/1920x1080/?${theme}`);
            
            if (response.ok) {                
                const msg = await message.channel.send({ content: `We found that with “UNSPLASH”, is that what you wanted?\n[.](${response.url})`, ephemeral: true });
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
            }
        } catch(err) {
            const msg = await message.channel.send({ content: 'An error occurred while retrieving the image', ephemeral: true });
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
        }
        if (message && message.deletable) message.delete();
    }
}