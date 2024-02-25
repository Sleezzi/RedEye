module.exports = {
    name: "mute",
    description: "mute a members",
    permissions: "ModerateMembers",
    model: `mute **\`member\`**`,
    category: "Moderation",
    cooldown: 1000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first();

            if (!message.member.permissions.has("ModerateMembers")) { // Check if the user have "ModerateMembers"'s permission
                const msg = await message.channel.send('You can\'t mute this member.');
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                }
                return;
            }
            
            if (!member) { // Check if the user put a member to mute
                const msg = await message.channel.send("You can\'t mute this member.");
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                }
                return;
            }

            if (message.author.id === member.id) { // Check if the user has not mentioned himself
                const msg = await message.channel.send("You can't mute yourself.");
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                }
                return;
            }
            
            if (!member.manageable) { // Check if the bot can mutate the member
                const msg = await message.channel.send("I can't mute this member");
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                }
                return;
            }
            if (member.roles.cache.find(role => role.name === "mute")) {
                const msg = await message.channel.send("I can't mute this member cause he is already mute");
                if (msg.deletable) {
                    setTimeout(() => { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; }}, 5000);
                }
                return;
            }
            const role = await message.guild.roles.create({
                name: "mute",
                color: 0xFF0000,
                permissions: [],
                position: message.guild.roles.cache.find(role => role.name === client.user.username && message.guild.members.cache.get(client.user.id).roles.cache.has(role.id)).position-1 || 1
            });
            message.member.roles.add(role.id);
            member.roles.add(client.config.roles.mute);
            const msg = await message.channel.send("This member has been muted")
            if (msg.deletable) {
                setTimeout(() => { try { msg.delete(); } catch(err) { return err; }}, 5000);
            }
            if (message) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}