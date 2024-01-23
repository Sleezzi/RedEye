module.exports = {
    name: "image",
    description: "Send a photo on a specific theme (may not work properly)",
    model: `image **\`the theme of the image\`**`,
    category: "Fun",
    cooldown: 15_000,
    async execute(message, serverData, client, Discord) {
        message.channel.sendTyping();
        const theme = message.content.replace(`${client.config.prefix}image `, "");
        try {
            const response = await fetch(`https://source.unsplash.com/1920x1080/?${theme}`);
            
            if (response.ok) {                
                message.channel.send({ content: `We found that with “UNSPLASH”, is that what you wanted?`, ephemeral: true }).then((msg) => {
                    if (msg.deletable) {
                        setTimeout(function() { msg.delete(); }, 5000);
                    }
                });
                message.channel.send({ content: response.url, ephemeral: true }).then((msg) => {
                    if (msg.deletable) {
                        setTimeout(function() { msg.delete(); }, 5000);
                    }
                });
            } else {
                message.channel.send({ content: 'Unable to find an image on this topic', ephemeral: true }).then((msg) => {
                    if (msg.deletable) {
                        setTimeout(function() { msg.delete(); }, 5000);
                    }
                });
            }
        } catch(err) {
            message.channel.send({ content: 'An error occurred while retrieving the image', ephemeral: true }).then((msg) => {
                if (msg.deletable) {
                    setTimeout(function() { msg.delete(); }, 5000);
                }
            });
        }
        if (message && message.deletable) message.delete();
    }
}