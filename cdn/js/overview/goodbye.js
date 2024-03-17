(async () => {
    const properties = {
        image: {
            width: 712,
            height: 400,
            background: "/cdn/img/canvas-background-goodbye.png"
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
    const params = new URLSearchParams(window.location.search);
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d"); // Initialize canvas
    canvas.height = properties.image.height;
    canvas.width = properties.image.width;
    const background = new Image();
    background.src = properties.image.background;
    background.onload = () => {
        ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height); // Draw the background image
        // Drawn overlay
        ctx.fillStyle = properties.overlay.color || "#FFF"; // Make the text white
        ctx.fillRect(properties.overlay.x || 0, properties.overlay.y || 0, properties.overlay.width || 0, properties.overlay.height || 0); // Fill the circle blank
        
        // Username
        ctx.font = `${properties.username.size || 42}px "${properties.username.font || "Protest Strike"}"`; // Change the text font
        ctx.fillStyle = properties.username.color || "#FFF"; // Make the text white
        ctx.textAlign = properties.username.textAlign || "center"; // Position the text in the center
        ctx.lineWidth = properties.username.lineWidth || 4;  //define the width of the stroke line
        ctx.fillText((params.get("member") || "redeye").toUpperCase(), properties.username.x || 0, properties.username.y || 0); // Write the member's name
        ctx.strokeText((params.get("member") || "redeye").toUpperCase(), properties.username.x || 0, properties.username.y || 0);
        
        // welcom Text
        ctx.fillStyle = properties.welcom.color || "#FFF"; // Make the text white
        ctx.font = `${properties.welcom.font || 35}px "${properties.welcom.font || "Protest Strike"}"`; // Change the text font
        ctx.textAlign = properties.welcom.textAlign || "center"; // Position the text in the center
        ctx.lineWidth = properties.welcom.lineWidth || 4;  //define the width of the stroke line
        ctx.fillText(`Goodbye!`, properties.welcom.x || 0, properties.welcom.y || 0); // Writes the member level
        ctx.strokeText(`Goodbye!`, properties.welcom.x || 0, properties.welcom.y || 0);
        
        ctx.beginPath();
        ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2 + properties.overlay.margin / 1.15, 0, Math.PI * 2);
        ctx.save(); // Save the image
        ctx.clip();
        ctx.drawImage(background, 0, 0, properties.image.width, properties.image.height)
        ctx.restore();
        
        // Drawn bot logo
        const pdpbot = new Image();
        pdpbot.src = "/cdn/img/Logo/RedEye.png";
        pdpbot.onload = () => {
            ctx.beginPath(); // Create a new path
            ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2, 0, Math.PI * 2); // Draw a circle
            ctx.save(); // Save the image
            ctx.clip(); // Cut the sheet so that you can only write in this circle
            ctx.drawImage(pdpbot, properties.pdpBot.x - properties.pdpBot.size / 2, properties.pdpBot.y - properties.pdpBot.size / 2 || 0, properties.pdpBot.size || 0, properties.pdpBot.size || 0); // Draw the bot's profile picture
            ctx.restore(); // Restore the sheet
            ctx.closePath(); // Close last path
        }
        
        // Drawn the user profile picture
        ctx.beginPath(); // Create a new path
        ctx.arc(properties.pdp.background.x || 0, properties.pdp.background.y || 0, properties.pdp.background.size || 0, 0, Math.PI * 2); // Draw a circle
        ctx.save(); // Save the image
        ctx.clip(); // Cut the sheet so that you can only write in this circle
        ctx.fillRect(properties.pdp.background.x - properties.pdp.background.size || 0, properties.pdp.background.y - properties.pdp.background.size || 0, properties.pdp.background.size * 2 || 0, properties.pdp.background.size * 2 || 0); // Fill the circle blank
        ctx.restore(); // Restore the sheet
        ctx.closePath(); // Close last path
        
        const pdp = new Image();
        pdp.src = params.get("avatar") || "/cdn/img/Logo/RedEye.png?size=1024";
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