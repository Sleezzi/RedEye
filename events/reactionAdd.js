module.exports = {
    name: "MessageReactionAdd",
    event: "MessageReactionAdd",
    type: "on",
    execute([reaction, user], client, Discord) {
        try {
            if (user.bot) return;
            const member = reaction.message.guild.members.cache.get(user.id);
            require("../components/database").get(`/${reaction.message.guild.id}/reactRoles/${reaction.message.id}/${reaction.emoji.name}`, client).then(roleId => {
                if (typeof roleId === "object") return;
                if (!reaction.message.guild.roles.cache.has(roleId)) return;
                try {
                    member.roles.add(roleId);
                } catch (err) { return err; }
            });
            // if (!client.config.reactions[reaction.message.channel.id] || !client.config.reactions[reaction.message.channel.id][reaction.message.id] || !client.config.reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji.name]) return;
            // try {
            //     const fun: Function = eval(`(${client.config.reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji.name]})`);
            //     fun(reaction, member);
            // } catch(err) { return err; }
        } catch(err) { return err; }
    }
}