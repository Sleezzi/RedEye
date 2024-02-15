const { registerFont, createCanvas, loadImage } = require("canvas");
registerFont("./cdn/fonts/ProtestStrike.ttf", { family: "Protest Strike" }); // Load font

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
    async execute(interaction, client, Discord) {
        try {
            let member = interaction.guild.members.cache.find((m) => m.id === (interaction.options.getUser("member") ? interaction.options.getUser("member") : interaction.member).id) ?? interaction.member;
            const image = createCanvas(1024, 400); // Create an image
            
            const ctx = image.getContext("2d"); // Initialize canvas
            const background = await loadImage("https://blueprint.sleezzi.fr/cdn/img/canvas-background.png");
            ctx.drawImage(background, 0, 0, 1024, 400); // Draw the background image
            ctx.font = `42px "Protest Strike"`; // Change the text font
            ctx.fillStyle = "#FFFFFF"; // Make the text white
            ctx.textAlign = "center"; // Position the text in the center
            ctx.fillText(member.user.username.toUpperCase(), 625, 194); // Write the member's name
            
            ctx.font = `35px "Protest Strike"`; // Change the text font
            const level = await require("../../components/database").get(`/${interaction.guild.id}/levels/${member.id}`, client);
            ctx.fillText(`Level: ${(level.level ? level.level : 1)} (${(level.xp ? level.xp : 0)}/${(level.level ? level.level * 150 : 150)})`, 625, 249); // Writes the member level
            
            const pdpbot = await loadImage(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=64`); // Load the bot's profile image
            ctx.drawImage(pdpbot, 967, 343, 50, 50); // Draw the bot's profile picture
            
            ctx.arc(992, 368, 25, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.drawImage(pdpbot, 992-25, 368-25, 50, 50); // Draw the bot's profile picture
            ctx.restore(); // Restore the sheet
            
            ctx.arc(227, 200, 123, 0, Math.PI * 2); // Draw a circle
            // ctx.closePath(); // Put up the pencil
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.fill(); // Fill the circle blank
            
            const pdp = await loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`); // Load member image
            ctx.arc(227, 200, 119, 0, Math.PI * 2); // Draw a circle
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.drawImage(pdp, 109, 80, 238, 238); // Draw the member's profile picture

            const attachment = new Discord.AttachmentBuilder(image.toBuffer(), {name: `${member.user.tag.toLowerCase()}'s level image.png`});
            await interaction.deleteReply();
            interaction.followUp({ files: [attachment], ephemeral: true });
        } catch(err) { return err; }
    }
}