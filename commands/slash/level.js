module.exports = {
    data: {
        name: "level",
        name_localizations: {
            "en-US": "level",
            fr: "level"
        },
        description: "Gives the level about a member or about you",
        description_localizations: {
            "en-US": "Gives the level about a member or about you",
            fr: "Affiche le niveau du membre"
        },
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member',
                description_localizations: {
                    fr: "Membre",
                    "en-US": "Member"
                },
                required: false,
                type: 6,
            }
        ],
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        try {
            let member = interaction.guild.members.cache.find((m) => m.id === (interaction.options.getUser("member") ? interaction.options.getUser("member") : interaction.member).id) ?? interaction.member;

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
            await interaction.deleteReply();
            interaction.followUp({ files: [attachment], ephemeral: true });
        } catch(err) { return err; }
    }
}