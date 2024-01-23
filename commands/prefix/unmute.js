module.exports = {
    name: "unmute",
    description: "Unmute a members",
    permissions: "ModerateMembers",
    model: `unmute **\`member\`**`,
    category: "Core",
    cooldown: 1000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first();

            if (!message.member.permissions.has("ModerateMembers")) {
                message.channel.send('You can\'t unmute this member.').then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            
            if (!member) {
                message.channel.send("You can\'t unmute this member.").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }

            if (message.author.id === member.id) {
                message.channel.send("You can't unmute yourself.").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            
            if (!member.manageable) {
                message.channel.send("I can't unmute this member").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            if (!member.roles.cache.has(client.config.roles.mute)) {
                message.channel.send("I can't unmute this member cause he is not mute").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            member.roles.remove(client.config.roles.mute);
            message.channel.send("This member has been unmuted").then((msg) => {
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); } catch(err) { return err; }}, 5000);
                }
            });
        } catch(err) {
            console.error(err);
        }
    }
}