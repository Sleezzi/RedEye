module.exports = {
    name: "level",
    description: "Gives you information about a member or about you",
    model: `level *\`member\`*`,
    category: "Information",
    cooldown: 10000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first() ?? message.guild.members.cache.get(message.member.id);
            
            const background = await client.data.canvas.loadImage("https://media.discordapp.net/attachments/1133400218554081311/1133487166840918178/canvasBackground.png?width=1024&height=400");
            const image = client.data.canvas.createCanvas(1024, 400);

            const ctx = image.getContext("2d");
            ctx.drawImage(background, 0, 0, 1024, 400);
            ctx.font = `42px sans-serif`;
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText(`${(member.user.discriminator === "0" ? member.user.username.toUpperCase() : member.user.tag.toUpperCase())}`, 600, 150);
            require("../../components/database").get(`/${message.guild.id}/levels/${member.id}`, client).then((level) => {
                ctx.fillText(`Level: ${(level.level ? level.level : 1)} (${(level.xp ? level.xp : 0)}/${(level.level ? level.level * 150 : 150)}`, 600, 250);
            });
            const pdpbot = await client.data.canvas.loadImage(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=1024`)
            ctx.drawImage(pdpbot, 967, 345, 50, 50);
            const pdp = await client.data.canvas.loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`);
            ctx.beginPath();
            ctx.arc(300, 166, 123, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(300, 166, 119, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(pdp, 180, 47, 238, 238);

            const attachment = new Discord.AttachmentBuilder(image.toBuffer(), {name: `${member.user.tag.toLowerCase()} welcom image.png`});
            await message.channel.send({ files: [attachment] });

            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}