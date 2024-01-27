module.exports = {
    name: "kick",
    description: "kick a members",
    permissions: "ManageMembers",
    model: `kick **\`member\`** *\`The reason for the ban\`*`,
    category: "Core",
    cooldown: 1000,
    async execute(message, _, client, Discord) {
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
            let reason = message.content.split(" ").map((string, index) => {if (index === message.content.split(" ").length) return string; if (index > 2) return `${string} `;}).join("");

            await member.kick({ reason: `Reason: "${reason}", kick by: ${message.member.user.tag}` });
            const msg = await message.channel.send(`**${member.user.tag}** was successfully kicked for the following reason: \`${(reason ? reason : "Aucune raison spécifiée")}\``)
            setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
        } catch(err) {
            console.error(err);
        }
    }
}