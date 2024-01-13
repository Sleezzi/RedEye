module.exports = {
    name: "LevelHandler",
    event: "MessageCreate",
    type: "on",
    execute([message], serverData, client, Discord) {
        if (message.channel.type === 1 || message.member.user.bot) return;
        if (client.data.level.has(message.member.id)) {
            const level = client.data.level.get(message.member.id);
            level.xp++;
            if (level.xp >= level.maxxp) {
                level.level++;
                level.xp = level.maxxp - level.xp;
                level.maxxp = level.maxxp * 1.5;
                message.guild.channels.cache.get(client.config.channels.level).send({content: `GG <@${message.member.id}>, you passed **level ${level.level}**`, ephemeral: true});
            }
        } else {
            client.data.level.set(message.member.id, { level: 1, xp: 1, maxxp: 100});
        }
    }
}