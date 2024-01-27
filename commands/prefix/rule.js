// module.exports = {
//     name: "rule",
//     description: "Send you in private message the rules of the server",
//     model: `rule`,
//     category: "Information",
//     cooldown: 30000,
//     async execute(message, serverData, client, Discord) {
//         try {
//             let member = message.mentions.members.first();
//             const embed = new Discord.EmbedBuilder()
//                 .setColor("Aqua")
//                 .setTitle("RULE:")
//                 .setDescription("👉 Any violation will be punished 👈")
//                 .setThumbnail(message.guild.iconURL())
//                 .addFields(
//                     { name: "\u200B", value: `> **No insulting and harassing**`},
//                     { name: "\u200B", value: `> **No racism, sexism and homophobia**`},
//                     { name: "\u200B", value: `> **No NSFW**`},
//                     { name: "\u200B", value: `> **No controversial subject (politics, religion...)**`},
//                     { name: "\u200B", value: `> **Avoid Spam**`},
//                     { name: "\u200B", value: `> **Advertising prohibited for anyone (even in PM)**`},
//                     { name: "\u200B", value: `> **Have an easy-to-mention nickname**`},
//                     { name: "\u200B", value: `> **To speak in a voice lounge, have a good microphone**`},
//                     { name: "\u200B", value: `> **No links to questionable/unknown sites**`},
//                     { name: "\u200B", value: `> **Recurring voice modifiers/soundboards are prohibited**`},
//                     { name: "\u200B", value: `> **Do not PM members**`},
//                 )
//                 .setFooter({ text: `This bot is a private bot. Don't use this with out authorization.`, iconURL: client.user.avatarURL() });        
//             //message.channel.send({content: "<@&1127562471704625159>", embeds: [embed], ephemeral: false, allowedMentions: { roles: ['1127562471704625159'] }});
//             if (member) {
//                 if (message.member.permissions.has("ModerateMembers")) {
//                     member.createDM().then((channel) => channel.send({ embeds: [embed], ephemeral: false }));
//                 } else {
//                     message.channel.send("Tu ne peux pas te bannir toi-même du serveur").then((msg) => {setTimeout(async function() { try {if (msg.deletable) msg.delete() } catch(err) {console.error(err);} }, 5000);});
//                 }
//             } else {
//                 message.author.createDM().then((channel) => channel.send({ embeds: [embed], ephemeral: false }));
//             }
//             try {
//                 if (message && message.deletable) message.delete();
//             } catch(err) { console.error(err); }
//         } catch(err) {
//             console.error(err);
//         }
//     }
// }