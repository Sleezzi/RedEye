module.exports = {
    name: "unmute",
    description: "Unmute a members",
    permissions: "ModerateMembers",
    model: `unmute **\`member\`**`,
    category: "Core",
    cooldown: 1000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first();

            if (!message.member.permissions.has("ModerateMembers")) {
                const msg = await message.channel.send('You can\'t unmute this member.');
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
                const msg = await message.channel.send("You can\'t unmute this member.");
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
                const msg = await message.channel.send("You can't unmute yourself.");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 15000);
                return;
            }
            
            if (!member.manageable) {
                const msg = await message.channel.send("I can't unmute this member");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 15000);
                return;
            }
            if (!member.roles.cache.find(role => role.name === "mute")) {
                const msg = await message.channel.send("I can't unmute this member cause he is not mute");
                setTimeout(() => {
                    try {
                        if (msg.deletable) {
                            msg.delete();
                        }
                    } catch(err) { return err; }
                }, 15000);
                return;
            }
            member.roles.remove(member.roles.cache.find(role => role.name === "mute").id);
            const msg = await message.channel.send("This member has been unmuted");
            setTimeout(() => {
                try {
                    if (msg.deletable) {
                        msg.delete();
                    }
                } catch(err) { return err; }
            }, 15000);
        } catch(err) {
            console.error(err);
        }
    }
}