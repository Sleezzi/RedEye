// const { registerFont, createCanvas, loadImage } = require("canvas");
// registerFont("./cdn/fonts/ProtestStrike.ttf", { family: "Protest Strike" }); // Load font

// const properties = {
//     blur: {
//         image: {
//             height: 1024,
//             width: 1024,
//         },
//         intencity: 300
//     },
//     brazzer: {
//         image: {
//             height: 1024,
//             width: 1024
//         },
//         brazzer: {
//             height: 50,
//             width: 150,
//             margin: 15
//         }
//     },
//     pigeon: {
//         image: {
//             height: 1000,
//             width: 1500
//         },
//         pdp: {
//             size: 500,
//             x: 640,
//             y: 500
//         }
//     },
//     stonks: {
//         image: {
//             height: 1450,
//             width: 1450
//         },
//         pdp: {
//             size: 500,
//             x: 600,
//             y: 450
//         }
//     }
// }

// module.exports = {
//     data: {
//         name: "interact",
//         name_localizations: {
//             "en-US": "interact",
//             fr: "interaction"
//         },
//         description: "Edit a profile picture",
//         description_localizations: {
//             "en-US": "Edit a profile picture",
//             fr: "Modifie une image de profile"
//         },
//         options: [
//             {
//                 name: "type",
//                 name_localizations: {
//                     "en-US": "type",
//                     "fr": "type"
//                 },
//                 description: "What modification do you want on the image",
//                 description_localizations: {
//                     "en-US": "What modification do you want on the image",
//                     "fr": "Quelle modification vous voulez sur l'image"
//                 },
//                 choices: [
//                     // {
//                     //     name: "blur",
//                     //     name_localizations: {
//                     //         fr: "flouter",
//                     //         "en-US": "blur"
//                     //     },
//                     //     description: 'Blur the image',
//                     //     description_localizations: {
//                     //         fr: "Flouter l'image",
//                     //         "en-US": "Blur the image"
//                     //     },
//                     //     value: "blur"
//                     // },
//                     {
//                         name: "brazzer",
//                         name_localizations: {
//                             fr: "brazzer",
//                             "en-US": "brazzer"
//                         },
//                         description: 'Add Brazzer watermark on image',
//                         description_localizations: {
//                             fr: "Ajouter le filigrame Brazzer sur l'image",
//                             "en-US": "Add Brazzer watermark on image"
//                         },
//                         value: "brazzer"
//                     },
//                     {
//                         name: "pigeon",
//                         name_localizations: {
//                             fr: "pigeon",
//                             "en-US": "pigeon"
//                         },
//                         description: 'Makes you part of the "Shut up and take my money" meme',
//                         description_localizations: {
//                             fr: "Vous intègre au meme \"Shut up and take my money\"",
//                             "en-US": "Makes you part of the \"Shut up and take my money\" meme"
//                         },
//                         value: "pigeon"
//                     },
//                     {
//                         name: "stonks",
//                         name_localizations: {
//                             fr: "stonks",
//                             "en-US": "stonks"
//                         },
//                         description: 'Makes you part of the "stonks" meme',
//                         description_localizations: {
//                             fr: "Vous intègre au meme \"stonks\"",
//                             "en-US": "Makes you part of the \"stonks\" meme"
//                         },
//                         value: "stonks"
//                     },
//                 ],
//                 required: true,
//                 type: "String"
//             },
//             {
//                 name: 'member',
//                 name_localizations: {
//                     fr: "membre",
//                     "en-US": "member"
//                 },
//                 description: 'Member',
//                 description_localizations: {
//                     fr: "Membre",
//                     "en-US": "Member"
//                 },
//                 required: false,
//                 type: 6,
//             }
//         ],
//         nsfw: false
//     },
//     async execute(interaction, client, Discord) {
//         try {
//             let member = interaction.guild.members.cache.find((m) => m.id === (interaction.options.getUser("member") ? interaction.options.getUser("member") : interaction.member).id);
            
//             const image = createCanvas(properties[interaction.options.getString("type")].image.width, properties[interaction.options.getString("type")].image.height); // Create an image
//             const ctx = image.getContext("2d"); // Initialize canvas
            
//             if (interaction.options.getString("type") === "blur") {
//                 const pdp = await loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`);
//                 ctx.drawImage(pdp, 0, 0, properties.blur.image.width, properties.blur.image.height);
//                 ctx.fillStyle= "#FFFFFF50";
//             }
//             if (interaction.options.getString("type") === "brazzer") {
//                 const pdp = await loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`);
//                 ctx.drawImage(pdp, 0, 0, properties.blur.image.width, properties.blur.image.height);
//                 const brazzer = await loadImage("https://images-assets-ht.project1content.com/Brazzers/Tour/Tour/PC/5f1b1271a1e429.16105348.png");
//                 ctx.drawImage(brazzer, properties.brazzer.image.width - properties.brazzer.brazzer.width - properties.brazzer.brazzer.margin, properties.brazzer.image.height - properties.brazzer.brazzer.height - properties.brazzer.brazzer.margin, properties.brazzer.brazzer.width, properties.brazzer.brazzer.height)
//             }
//             if (interaction.options.getString("type") === "pigeon") {
//                 const background = await loadImage(`https://redeye.sleezzi.fr/cdn/img/meme/shut-up-and-take-my-money.png`);
//                 ctx.drawImage(background, 0, 0, properties.pigeon.image.width, properties.pigeon.image.height);
//                 const pdp = await loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`);
//                 ctx.arc(properties.pigeon.pdp.x, properties.pigeon.pdp.y, properties.pigeon.pdp.size / 2, 0, Math.PI * 2);
//                 ctx.clip();
//                 ctx.fillRect(properties.pigeon.pdp.x / 2, properties.pigeon.pdp.y / 2, properties.pigeon.pdp.x, properties.pigeon.pdp.y);
//                 ctx.drawImage(pdp, properties.pigeon.pdp.x - properties.pigeon.pdp.size / 2, properties.pigeon.pdp.y - properties.pigeon.pdp.size / 2, properties.pigeon.pdp.size, properties.pigeon.pdp.size);
//             }
//             if (interaction.options.getString("type") === "stonks") {
//                 const background = await loadImage(`https://redeye.sleezzi.fr/cdn/img/meme/stonks.png`);
//                 ctx.drawImage(background, 0, 0, properties.stonks.image.width, properties.stonks.image.height);
//                 const pdp = await loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`);
//                 ctx.arc(properties.stonks.pdp.x, properties.stonks.pdp.y, properties.stonks.pdp.size / 2, 0, Math.PI * 2);
//                 ctx.clip();
//                 ctx.fillRect(properties.stonks.pdp.x / 3, properties.stonks.pdp.y / 3, properties.stonks.pdp.x * 2, properties.stonks.pdp.y * 2);
//                 ctx.drawImage(pdp, properties.stonks.pdp.x - properties.stonks.pdp.size / 2, properties.stonks.pdp.y - properties.stonks.pdp.size / 2, properties.stonks.pdp.size, properties.stonks.pdp.size);
//             }

//             // Drawn bot logo
//             // ctx.beginPath(); // Create a new path
//             // const pdpbot = await loadImage(`https://redeye.sleezzi.fr/cdn/img/Logo/BP_Gold.png`); // Load the bot's profile image
//             // ctx.arc(properties.pdpBot.x || 0, properties.pdpBot.y || 0, properties.pdpBot.size / 2, 0, Math.PI * 2); // Draw a circle
//             // ctx.clip(); // Cut the sheet so that you can only write in this circle
//             // ctx.drawImage(pdpbot, properties.pdpBot.x - properties.pdpBot.size / 2, properties.pdpBot.y - properties.pdpBot.size / 2 || 0, properties.pdpBot.size || 0, properties.pdpBot.size || 0); // Draw the bot's profile picture
//             // ctx.restore(); // Restore the sheet
//             // ctx.closePath(); // Close last path
            
//             const attachment = new Discord.AttachmentBuilder(image.toBuffer(), {name: `${member.user.tag.toLowerCase()}'s level image.png`});
//             await interaction.deleteReply();
//             interaction.followUp({ files: [attachment], ephemeral: true });
//         } catch(err) { return err; }
//     }
// }