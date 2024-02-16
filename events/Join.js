const { registerFont, createCanvas, loadImage } = require("canvas");
registerFont("./cdn/fonts/ProtestStrike.ttf", { family: "Protest Strike" }); // Load font

const properties = {
    image: {
        width: 712,
        height: 400,
        background: "https://blueprint.sleezzi.fr/cdn/img/canvas-background-welcom.png"
    },
    pdp: {
        background: {
            get x() {
                return properties.image.width / 2
            },
            get y() {
                return properties.image.height / 3
            },
            size: 100
        },
        image: {
            get x() {
                return properties.pdp.background.x - properties.pdp.image.size
            },
            get y() {
                return properties.pdp.background.y - properties.pdp.image.size
            },
            get size() {
                return properties.pdp.background.size - 4
            }
        }
        
    },
    username: {
        get x() {
            return properties.image.width / 2
        },
        get y() {
            return properties.image.height / 3 + properties.pdp.background.size + properties.username.size
        },
        size: 64,
        get lineWidth() {
            return Math.floor(properties.username.size / 20)
        },
    },
    welcom: {
        get x() {
            return properties.image.width / 2
        },
        get y() {
            return properties.username.y + properties.welcom.size
        },
        size: 35,
        get lineWidth() {
            return Math.floor(properties.welcom.size / 20)
        },
    },
    pdpBot: {
        get x() {
            return properties.image.width - properties.pdpBot.size / 2 - 7
        },
        get y() {
            return properties.image.height - properties.pdpBot.size / 2 - 7
        },
        size: 50
    }
}

module.exports = {
    name: "MemberJoin",
    event: "GuildMemberAdd",
    type: "on",
    async execute([], client, Discord) {
        try {
            client.guilds.cache.get("1200750236277157999").channels.cache.get("1204146900874559498").sendTyping();
            
            const image = createCanvas(properties.image.width, properties.image.height); // Create an image
            const ctx = image.getContext("2d"); // Initialize canvas
            const background = await loadImage(properties.image.background);
            ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height); // Draw the background image
            
            // Username
            ctx.font = `${properties.username.size || 42}px "${properties.username.font || "Protest Strike"}"`; // Change the text font
            ctx.fillStyle = properties.username.color || "#FFF"; // Make the text white
            ctx.textAlign = properties.username.textAlign || "center"; // Position the text in the center
            ctx.lineWidth = properties.username.lineWidth || 4;  //define the width of the stroke line
            ctx.fillText(member.user.username.toUpperCase().toUpperCase(), properties.username.x || 0, properties.username.y || 0); // Write the member's name
            ctx.strokeText(member.user.username.toUpperCase().toUpperCase(), properties.username.x || 0, properties.username.y || 0);
            
            // welcom Text
            ctx.fillStyle = properties.welcom.color || "#FFF"; // Make the text white
            ctx.font = `${properties.welcom.font || 35}px "${properties.welcom.font || "Protest Strike"}"`; // Change the text font
            ctx.textAlign = properties.welcom.textAlign || "center"; // Position the text in the center
            ctx.lineWidth = properties.welcom.lineWidth || 4;  //define the width of the stroke line
            ctx.fillText(`Welcom!`, properties.welcom.x || 0, properties.welcom.y || 0); // Writes the member level
            ctx.strokeText(`Welcom!`, properties.welcom.x || 0, properties.welcom.y || 0);
            
            // Drawn bot logo
            ctx.beginPath(); // Create a new path
            const pdpbot = await loadImage(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=64`); // Load the bot's profile image
            ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.drawImage(pdpbot, properties.pdpBot.x - properties.pdpBot.size / 2, properties.pdpBot.y - properties.pdpBot.size / 2 || 0, properties.pdpBot.size || 0, properties.pdpBot.size || 0); // Draw the bot's profile picture
            ctx.restore(); // Restore the sheet
            ctx.closePath(); // Close last path
            
            // Drawn the user profile picture
            ctx.beginPath(); // Create a new path
            ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.background.size || 0, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.fillRect(properties.pdp.background.x - properties.pdp.background.size || 0, properties.pdp.background.y - properties.pdp.background.size || 0, properties.pdp.background.size * 2 || 0, properties.pdp.background.size * 2 || 0); // Fill the circle blank
            ctx.restore(); // Restore the sheet
            ctx.closePath(); // Close last path
            
            ctx.beginPath(); // Create a new path
            const pdp = await loadImage(`https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=1024`); // Load member image
            ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.image.size || 0, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.closePath(); // Close last path
            ctx.drawImage(pdp, properties.pdp.image.x || 0, properties.pdp.image.y || 0, properties.pdp.image.size * 2 || 0, properties.pdp.image.size * 2 || 0); // Draw the member's profile picture
            
            const attachment = new Discord.AttachmentBuilder(image.toBuffer(), {name: `${member.user.tag.toLowerCase()}'s welcom image.png`});
            await client.guilds.cache.get("1200750236277157999").channels.cache.get("1204146900874559498").send({ files: [attachment] });
        } catch (err) { console.error(err); }
    }
}