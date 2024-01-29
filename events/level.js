module.exports = {
    name: "LevelHandler",
    event: "MessageCreate",
    type: "on",
    execute([message], client, Discord) {
        try {
            if (message.channel.type === 1 || message.member.user.bot) return;
            require("../components/database").get(`/${message.guild.id}/levels/${message.member.id}`, client).then(({...level}) => {
                if (level.level) {
                    level.xp++;
                    if (level.xp >= (level.level * 150)) {
                        level.level++;
                        level.xp = level.level * 150 - level.xp;
                        message.author.createDM().then((channel) => channel.send({ content: `GG <@${message.member.id}>, you passed **level ${level.level}**`, ephemeral: false }));
                    }
                } else level = {
                    level: 1,
                    xp: 1,
                }                
                require("../components/database").set(`/${message.guild.id}/levels/${message.member.id}`, level, client);
            });
        } catch (err) { console.error(err); }
    }
}