module.exports = {
    name: "LevelHandler",
    event: "MessageCreate",
    type: "on",
    async execute([message], client, Discord) {
        try {
            if (message.channel.type === 1 || message.member.user.bot) return;
            const {...level} = await require("../components/database").get(`/${message.guild.id}/levels/${message.member.id}`, client);
            if (level.level) {
                level.xp++;
                if (level.xp >= (level.level * 150)) {
                    level.level++;
                    level.xp = 0;
                    const channel = await message.author.createDM()
                    channel.send({ content: `GG <@${message.member.id}>, you passed **level ${level.level}**`, ephemeral: false });
                }
            } else level = {
                level: 1,
                xp: 1,
            }                
            require("../components/database").set(`/${message.guild.id}/levels/${message.member.id}`, level, client);
        } catch (err) { console.error(err); }
    }
}