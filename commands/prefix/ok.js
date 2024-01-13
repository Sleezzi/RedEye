module.exports = {
    name: "ok",
    description: "Gives a access to the server",
    model: `ok`,
    category: "Core",
    cooldown: 15000,
    async execute(message, serverData, client, Discord) {
        try {
            if (message.member.roles.cache.get(client.config.roles.member)) {
                message.delete();
                return;
            }
            message.member.roles.add(client.config.roles.member);
            message.member.roles.remove(client.config.roles.newMember)
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}