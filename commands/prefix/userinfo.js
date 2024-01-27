module.exports = {
    name: "userinfo",
    description: "Gives you information about a member or about you",
    model: `userinfo *\`member\`*`,
    category: "Information",
    cooldown: 10000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first() ?? message.guild.members.cache.get(message.member.id);

            let roles = "The member has no role.";

            if (member._roles.length > 0) {
                for (let i = 0; i < member._roles.length; i++) {
                    roles = `<@&${member._roles.map((i) => i).join('>, <@&')}>`;
                }
            }

            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Information about:")
                .setDescription(`<@${member.id}>`)
                .setThumbnail(message.member.avatarURL())
                .setAuthor({ name: member.user.tag, iconURL: message.member.avatarURL(), url: message.url })
                .addFields(
                    { name: "<:nametag:1200757678104915978> __**Tag:**__", value: `> **\`${member.user.tag}\`**`},
                    { name: "__**Nickname:**__", value: `> ${(member.nickname === null ? "The member does not have a nickname." : `**\`${member.nickname}\`**`)}`},
                    { name: "<:ID:1200784630865985598> __**ID:**__", value: `> \`${(member.id)}\``},
                    { name: `__**Level${(client.data.level.has(message.author.id) ? `s` : ``)}:**__`, value: `> ${(client.data.level.has(message.author.id) ? `${client.data.level.get(message.author.id).level} (${client.data.level.get(message.author.id).xp}/${client.data.level.get(message.author.id).maxxp}` : `1 (0/100`)})`},
                    { name: `__**Role${(member._roles.length > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
                    { name: "__**Account created:**__", value: `> <t:${Math.floor(member.user.createdTimestamp / 1000)}:d> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`},
                    { name: "__**Member since:**__", value: `> <t:${Math.floor(member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`},
                    { name: "__**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            await message.channel.send({ embeds: [embed], ephemeral: false });
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}