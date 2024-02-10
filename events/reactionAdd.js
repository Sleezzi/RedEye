module.exports = {
    name: "MessageReactionAdd",
    event: "MessageReactionAdd",
    type: "on",
    async execute([reaction, user], client, Discord) {
        try {
            if (user.bot) return;
            const member = reaction.message.guild.members.cache.get(user.id);
            const roleId = await require("../components/database").get(`/${reaction.message.guild.id}/reactRoles/${reaction.message.id}/${reaction.emoji.name}`, client);
            if (typeof roleId === "object") return;
            if (!reaction.message.guild.roles.cache.has(roleId)) return;
            member.roles.add(roleId);
        } catch(err) { return err; }
    }
}