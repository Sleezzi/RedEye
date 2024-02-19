(async () => {
    const properties = {
        image: {
            width: 1024,
            height: 400,
            background: "https://blueprint.sleezzi.fr/cdn/img/canvas-background-level.png"
        },
        overlay: {
            get x() {
                return properties.overlay.margin;
            },
            get y() {
                return properties.overlay.margin;
            },
            get width() {
                return properties.image.width - properties.overlay.margin * 2;
            },       
            get height() {
                return properties.image.height - properties.overlay.margin * 2;
            },
            color: "#00000050",
            margin: 15
        },
        pdp: {
            background: {
                x: 227,
                get y() {
                    return properties.image.height / 2
                },
                size: 123
            },
            image: {
                get x() {
                    return properties.pdp.background.x - properties.pdp.image.size
                },
                get y() {
                    return properties.image.height / 2 - properties.pdp.image.size
                },
                get size() {
                    return properties.pdp.background.size - 4
                }
            }
            
        },
        username: {
            x: 625,
            get y() {
                return properties.image.height / 3
            },
            size: 64,
            get lineWidth() {
                return Math.floor(properties.username.size / 20)
            },
        },
        level: {
            get x() {
                return 625 - properties.progressBar.with / 2 // => 354
            },
            get y() {
                return properties.image.height / 3 + 55 + properties.xp.size / 2
            },
            size: 35,
            get lineWidth() {
                return Math.floor(properties.level.size / 20)
            },
            textAlign: "start"
        },
        xp: {
            get x() {
                return properties.progressBar.x + properties.progressBar.with - 4
            },
            get y() {
                return properties.progressBar.y + properties.xp.size + 2
            },
            size: 35,
            get lineWidth() {
                return Math.floor(properties.xp.size / 20)
            },
        },
        progressBar: {
            get x() {
                return 625 - properties.progressBar.with / 2
            },
            get y() {
                return properties.image.height / 3 + 55 * 2 - properties.progressBar.height / 2
            },
            height: 50,
            with: 350,
            color: `#${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`
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
    const params = new URLSearchParams(window.location.search);
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = properties.image.height;
    canvas.width = properties.image.width;
    const background = new Image();
    background.src = properties.image.background;
    background.style.zIndex = "0";
    background.onload = () => {
        ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height);
    
        // Drawn overlay
        ctx.fillStyle = properties.overlay.color || "#FFF"; // Make the text white
        ctx.fillRect(properties.overlay.x || 0, properties.overlay.y || 0, properties.overlay.width || 0, properties.overlay.height || 0); // Fill the circle blank
        
        // // Username
        ctx.font = `${properties.username.size || 42}px "${properties.username.font || "sherif"}"`; // Change the text font
        ctx.fillStyle = properties.username.color || "#FFF"; // Make the text white
        ctx.textAlign = properties.username.textAlign || "center"; // Position the text in the center
        ctx.lineWidth = properties.username.lineWidth || 4;  //define the width of the stroke line
        ctx.fillText((params.get("member") || "blueprint").toUpperCase(), properties.username.x || 0, properties.username.y || 0); // Write the member's name
        ctx.strokeText((params.get("member") || "blueprint").toUpperCase(), properties.username.x || 0, properties.username.y || 0); // Write the member's name

        let level = {
            level: 1,
            xp: 0
        }
        // LEVEL Text
        ctx.font = `${properties.level.size || 42}px "${properties.level.font || "sherif"}"`; // Change the text font
        ctx.fillStyle = properties.level.color || "#FFF"; // Make the text white
        ctx.textAlign = properties.level.textAlign || "center"; // Position the text in the center
        ctx.lineWidth = properties.level.lineWidth || 4;  //define the width of the stroke line
        ctx.fillText(`Level: ${params.get("level") || "1"}`, properties.level.x || 0, properties.level.y || 0); // Writes the member level
        ctx.strokeText(`Level: ${params.get("level") || "1"}`, properties.level.x || 0, properties.level.y || 0);
        
        // // Progress bar
        ctx.fillRect(properties.progressBar.x || 0, properties.progressBar.y || 0, properties.progressBar.with || 0, properties.progressBar.height || 0); // Fill the circle blank
        ctx.fillStyle = params.get("color") || properties.progressBar.color; // Make the text white
        ctx.fillRect(properties.progressBar.x || 0, properties.progressBar.y || 0, ((params.get("xp") || 0) / ((params.get("level") || 1) * 150) * properties.progressBar.with) || 0, properties.progressBar.height || 0); // Fill the circle blank
        
        // // XP Text
        ctx.fillStyle = properties.xp.color || "#FFF"; // Make the text white
        ctx.font = `${properties.xp.font || 35}px "${properties.xp.font || "Protest Strike"}"`; // Change the text font
        ctx.textAlign = properties.xp.textAlign || "end"; // Position the text in the center
        ctx.lineWidth = properties.xp.lineWidth || 4;  //define the width of the stroke line
        ctx.fillText(`${params.get("xp") || "0"}/${params.get("level") * 150 || 150}`, properties.xp.x || 0, properties.xp.y || 0); // Writes the member level
        ctx.strokeText(`${params.get("xp") || "0"}/${params.get("level") * 150 || 150}`, properties.xp.x || 0, properties.xp.y || 0);
        
        // // Drawn bot logo
        const pdpbot = new Image();
        pdpbot.src = "https://cdn.discordapp.com/avatars/1195058289931726848/8bfdcab3822a834daa8e3f2b7a6f0cec.png?size=64";
        pdpbot.onload = () => {
            ctx.beginPath(); // Create a new path
            ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.drawImage(pdpbot, properties.pdpBot.x - properties.pdpBot.size / 2, properties.pdpBot.y - properties.pdpBot.size / 2 || 0, properties.pdpBot.size || 0, properties.pdpBot.size || 0); // Draw the bot's profile picture
            ctx.restore(); // Restore the sheet
            ctx.closePath(); // Close last path
        }
        
        // // Drawn the user profile picture
        ctx.beginPath(); // Create a new path
        ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.background.size || 0, 0, Math.PI * 2); // Draw a circle
        ctx.save(); // Save the image
        ctx.clip(); // Cut the sheet so that you can only write in this circle
        ctx.fillRect(properties.pdp.background.x - properties.pdp.background.size || 0, properties.pdp.background.y - properties.pdp.background.size || 0, properties.pdp.background.size * 2 || 0, properties.pdp.background.size * 2 || 0); // Fill the circle blank
        ctx.restore(); // Restore the sheet
        ctx.closePath(); // Close last path
        
        
        const pdp = new Image();
        pdp.src = params.get("avatar") || "https://cdn.discordapp.com/avatars/1195058289931726848/8bfdcab3822a834daa8e3f2b7a6f0cec.png?size=1024";
        pdp.onload = () => {
            ctx.beginPath(); // Create a new path
            ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.image.size || 0, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.drawImage(pdp, properties.pdp.image.x || 0, properties.pdp.image.y || 0, properties.pdp.image.size * 2 || 0, properties.pdp.image.size * 2 || 0); // Draw the bot's profile picture
            ctx.restore(); // Restore the sheet
            ctx.closePath(); // Close last path
        }
    }
})();