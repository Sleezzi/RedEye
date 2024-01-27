// module.exports = {
//     data: {
//         name: "rule",
//         name_localizations: {
//             "en-US": "rule",
//             fr: "regle"
//         },
//         description: "Send you in private message the rules of the server",
//         description_localizations: {
//             "en-US": "Send you in private message the rules of the server",
//             fr: "Envoie les règles du serveur"
//         },
//         options: [
//             {
//                 name: 'member',
//                 name_localizations: {
//                     fr: "membre",
//                     "en-US": "member"
//                 },
//                 description: 'Send to a member',
//                 description_localizations: {
//                     fr: "Envoyer a un membre",
//                     "en-US": "Send to a member"
//                 },
//                 required: false,
//                 type: 6,
//             }
//         ],
//         nsfw: false
//     },
//     async execute(interaction, serverData, client, Discord) {
//         try {
    
//             let member = interaction.options.getUser("member");
//             const embed = new Discord.EmbedBuilder()
//                 .setColor("Aqua")
//                 .setTitle("RULE:")
//                 .setDescription("👉 Any violation will be punished 👈")
//                 .setThumbnail(interaction.guild.iconURL())
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
//                     { name: "\u200B", value: `\u200B`},
//                 )
//                 .setFooter({ text: `This bot is a private bot. Don't use this with out authorization.`, iconURL: client.user.avatarURL() });        
//             //interaction.channel.send({content: "<@&1127562471704625159>", embeds: [embed], ephemeral: false, allowedMentions: { roles: ['1127562471704625159'] }});
//             if (member) {
//                 if (interaction.member.permissions.has("ModerateMembers") && member.id !== client.user.id) {
//                     member.createDM().then((channel) => channel.send({ embeds: [embed], ephemeral: false }));
//                     interaction.deleteReply().then(() => interaction.followUp({ content: "Rule sended !", ephemeral: true }));
//                 } else {
//                     interaction.deleteReply().then(() => interaction.followUp({ content: "You cannot send a private message to the server member", ephemeral: true }));
//                 }
//             } else {
//                 interaction.member.createDM().then((channel) => channel.send({ embeds: [embed], ephemeral: false }));
//                 interaction.deleteReply().then(() => interaction.followUp({ content: "Rule sended !", ephemeral: true }));
//             }
//         } catch(err) { return err; }
//     }
// }