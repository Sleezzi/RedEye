module.exports = {
    name: "pic",
    description: "Gives the pdp of a user",
    model: `pic *\`member\`*`,
    category: "Misc",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            await message.channel.sendTyping();
            let member = message.mentions.members.first() ?? message.guild.members.cache.get(message.member.id);
            await message.channel.send({ content: `[Picture of ${member.user.username}](${(member.user.avatarURL() ? member.user.avatarURL() : "https://discord.com/assets/c722e74f644b4a758b11.png")})` });

            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}