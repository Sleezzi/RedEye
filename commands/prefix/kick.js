module.exports = {
    name: "kick",
    description: "kick a members",
    permissions: "ManageMembers",
    model: `kick **\`member\`** *\`The reason for the ban\`*`,
    category: "Moderation",
    cooldown: 1000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first();

            if (!message.member.permissions.has("ModerateMembers")) {
                const msg = await message.channel.send('You cannot kick a member from the server');
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 5000);
                return;
            }
            
            if (!member) {
                const msg = await message.channel.send("Please mention a valid member.");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 5000);
                return;
            }

            if (message.author.id === member.id) {
                const msg = await message.channel.send("You cannot ban yourself from the server");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 5000);
                return;
            }
            
            if (!member.bannable) {
                const msg = await message.channel.send("I can't kick this member");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 5000);
                return;
            }
            let reason = message.content.split(" ").map((string, index) => {if (index === message.content.split(" ").length) return string; if (index > 2) return `${string} `;}).join("") || "No reason specified";

            await member.kick({ reason: `Reason: "${reason}", kick by: ${message.member.user.username}` });
            const msg = await message.channel.send({ embeds: [{
                title: `<a:exit:1205202384326885498> - Kick`,
                color: 0xFF0000,
                author: {
                    name: message.member.username,
                    icon_url: message.member.user.avatarURL(),
                    url: message.url,
                },
                fields: [
                    { name: `<:nametag:1200757678104915978> - __Name:__`, value:`${member.user.username} (*${member.id}*)` },
                    { name: `<:nametag:1200757678104915978> - __Reason:__`, value:`${reason}` },
                    { name: `<:nametag:1200757678104915978> - __By:__`, value:`${message.member.user.username}` },
                    { name: `<:nametag:1200757678104915978> - __Date:__`, value:`${member.user.username}` },
                    { name: `<:nametag:1200757678104915978> - __Name:__`, value:`${member.user.username}` },
                ],
                footer: {
                    text: `Id: ${message.id}`,
                    icon_url: client.user.avatarURL(),
                },
            }] }`**${member.user.tag}** was successfully kicked for the following reason: \`${reason}\``)
            setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
        } catch(err) {
            console.error(err);
        }
    }
}