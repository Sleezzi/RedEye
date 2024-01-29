module.exports = {
    name: "roles",
    description: "Gives information about the server",
    model: `about`,
    category: "Information",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.avatarURL(), url: message.url })
                .setThumbnail(message.guild.iconURL())
                .setTitle("Chose your roles:")
                .addFields(
                    { name: "**Roblox Player**", value: `> Link your Roblox account with RoVer on <#1186637338147815525>`},
                    { name: "**Flush Out Player**", value: `> 🔫 • You play Flush Out on Roblox`}
                )
                .setFooter({ text: `This bot is a private bot. Don't use this whit out authorization.`, iconURL: client.user.avatarURL() });
            const msg = await message.channel.send({ embeds: [embed], ephemeral: false });
            msg.react("🔫");
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}