module.exports = {
    name: "ban",
    description: "Ban a members",
    permissions: "BanMembers",
    model: `ban **\`member\`** *\`Banishment time in seconds\`* *\`The reason for the ban\`*`,
    category: "Core",
    cooldown: 1000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first();

            if (!message.member.permissions.has("BanMembers")) {
                const msg = await message.channel.send('You cannot ban a member from the server');
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 15000);
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
                }, 15000);
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
                }, 15000);
                return;
            }
            
            if (!member.bannable) {
                const msg = await message.channel.send("I can't ban this member");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 15000);
                return;
            }

            let duration = message.content.split(" ")[2];
            let reason = message.content.slice(`${client.config.prefix}ban ${member.user.id} ${duration} `.length);

            
            if (!duration) {
                duration = "Perm";
            } else {
                duration = duration;
            }

            if (duration == "Perm") {
                member.ban({ reason: `Reason: "${reason}", ban by: ${message.member.user.tag}` }).then(() => message.channel.send(`${member.user.tag} was successfully banned for the following reason: \`${(reason ? reason : "Aucune raison spécifiée")}\``).then((msg) => { setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000); }));
            } else {
                member.ban({ reason: `Reason: "${reason}", ban by: ${message.member.user.tag}`, expiresIn: duration }).then(() => message.channel.send(`${member.user.tag} was successfully banned for the following reason: \`${(reason ? reason : "No reason specified")}\`and for a period of \`${duration}s\``).then((msg) => { setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000); }));
            }
        } catch(err) {
            console.error(err);
        }
    }
}