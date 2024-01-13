module.exports = {
    name: "MessageReactionAdd",
    event: "MessageReactionAdd",
    type: "on",
    execute([reaction, user], serverData, client, Discord) {
        try {
            // if (user.bot) return;
            // const member = reaction.message.guild.members.cache.get(user.id);
            // if (!client.config.reactions[reaction.message.channel.id] || !client.config.reactions[reaction.message.channel.id][reaction.message.id] || !client.config.reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji.name]) return;
            // try {
            //     const fun: Function = eval(`(${client.config.reactions[reaction.message.channel.id][reaction.message.id][reaction.emoji.name]})`);
            //     fun(reaction, member);
            // } catch(err) { return err; }
        } catch(err) { return err; }
    }
}