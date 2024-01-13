module.exports = {
    name: "headortail",
    description: "Toss head or tail",
    model: `headortail`,
    category: "Fun",
    cooldown: 10000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let face = message.content.toLowerCase().split(' ').slice(1)[0];
            
            const result = Math.random() < 0.5 ? 'tail' : 'head';

            if (face) {
                if (face !== "head" && face !== "tail") {
                    message.reply('The face chosen is not good.').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) {console.error(err);} }, 5000));
                    return;
                }
                if (result === face) {
                    await message.channel.send({ content: "You won", ephemeral: false });
                } else {
                    await message.channel.send({ content: "You lost", ephemeral: false });
                }
            } else {
                await message.channel.send({ content: `It's falling on \`${result}\``, ephemeral: false });
            }
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}