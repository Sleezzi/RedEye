module.exports = {
    name: "pic",
    description: "Gives the pdp of a user",
    model: `pic *\`member\`*`,
    category: "Information",
    cooldown: 15000,
    async execute(message, serverData, client, Discord) {
        try {
            await message.channel.sendTyping();
            let member = message.mentions.members.first() ?? message.guild.members.cache.get(message.member.id);
            await message.channel.send({ content: `[Picture of ${member.user.username}](${member.user.avatarURL()})` });

            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}