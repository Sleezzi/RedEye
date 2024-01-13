module.exports = {
    name: "mute",
    description: "mute a members",
    permissions: "ModerateMembers",
    model: `mute **\`member\`**`,
    category: "Core",
    cooldown: 1000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first();

            if (!message.member.permissions.has("ModerateMembers")) {
                message.channel.send('You can\'t mute this member.').then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            
            if (!member) {
                message.channel.send("You can\'t mute this member.").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }

            if (message.author.id === member.id) {
                message.channel.send("You can't mute yourself.").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            
            if (!member.manageable) {
                message.channel.send("I can't mute this member").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            if (member.roles.cache.has(client.config.roles.mute)) {
                message.channel.send("I can't mute this member cause he is already mute").then((msg) => {
                    if (msg.deletable) {
                        setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                    }
                });
                return;
            }
            member.roles.add(client.config.roles.mute);
            message.channel.send("This member has been muted").then((msg) => {
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); } catch(err) { return err; }}, 5000);
                }
            });
            if (message) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}