module.exports = {
    name: "userinfo",
    description: "Gives you information about a member or about you",
    model: `userinfo *\`member\`*`,
    category: "Information",
    cooldown: 10000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            let member = message.mentions.members.first() ?? message.guild.members.cache.get(message.member.id);

            let roles = "The member has no role.";

            if (member._roles.length > 0) {
                for (let i = 0; i < member._roles.length; i++) {
                    roles = `<@&${member._roles.map((i) => i).join('>, <@&')}>`;
                }
            }

            require("../../components/database").get(`/${message.guild.id}/levels/${member.id}`, client).then(level => {
                if (!level.level) level = {
                    level: 1,
                    xp: 0
                };
                const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Information about:")
                .setDescription(`<@${member.id}>`)
                .setThumbnail(message.member.avatarURL())
                .setAuthor({ name: member.user.tag, iconURL: message.member.avatarURL(), url: message.url })
                .addFields(
                    { name: "<:tag:1200813621970739251> __**Tag:**__", value: `> **\`${member.user.tag}\`**`},
                    { name: "<:nametag:1200757678104915978> __**Nickname:**__", value: `> ${(member.nickname === null ? "The member does not have a nickname." : `**\`${member.nickname}\`**`)}`},
                    { name: "<:ID:1200784630865985598> __**ID:**__", value: `> \`${(member.id)}\``},
                    { name: `<:boost:1200817314740842616> __**Level${(level > 1 ? `s` : ``)}:**__`, value: `> ${level.level} (${level.xp}/${level.level * 150})`},
                    { name: `<:member:1200816753421328484> __**Role${(member._roles.length > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
                    { name: ":inbox_tray: __**Account created:**__", value: `> <t:${Math.floor(member.user.createdTimestamp / 1000)}:d> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`},
                    { name: ":inbox_tray: __**Member since:**__", value: `> <t:${Math.floor(member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`},
                    { name: ":hourglass: __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
                message.channel.send({ embeds: [embed], ephemeral: false });
            });
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}