module.exports = {
    name: "MemberLeave",
    event: "GuildMemberRemove",
    type: "on",
    async execute([member], serverData, client, Discord) {
        if (member.user.bot) return; // Check if user is bot
        // Set the background of image
        const background = await client.data.canvas.loadImage("https://media.discordapp.net/attachments/1133400218554081311/1133487166840918178/canvasBackground.png?width=1024&height=400");
        //  Set the option of image
        const image = client.data.canvas.createCanvas(1024, 400);
        const ctx = image.getContext("2d");
        ctx.font = `42px sans-serif`;
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        // Put the background on the image
        ctx.drawImage(background, 0, 0, 1024, 400);
        // Add name of user on the image
        ctx.fillText(`${(member.user.discriminator === "0" ? member.user.username.toUpperCase() : member.user.tag.toUpperCase())} joined us`, 512, 350);
        // draw the pdp of user on the middle of image
        const pdpbot = await client.data.canvas.loadImage(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=1024`)
        ctx.drawImage(pdpbot, 967, 345, 50, 50);
        ctx.beginPath();
        ctx.arc(512, 166, 123, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        // Draw the pdp of the bot in the corner of image
        ctx.fill();
        ctx.beginPath();
        ctx.arc(512, 166, 119, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        const pdp = await client.data.canvas.loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`);
        ctx.drawImage(pdp, 393, 47, 238, 238);
        // Send the image in Discord
        const attachment = new Discord.AttachmentBuilder(image.toBuffer(), {name: `${member.user.tag.toLowerCase()} welcom image.png`});
        member.guild.channels.cache.get(client.config.channels.bye).send({ content: `<@${member.id}>`, files: [attachment] });
    }
}