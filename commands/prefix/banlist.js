module.exports = {
    name: "banlist",
    description: "Returns the list of all banned members from the server",
    permissions: "BanMembers",
    model: `banlist`,
    category: "Information",
    cooldown: 15000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            const embed = {
                color: 0x0099ff,
                title: 'Ban list',
                description: "",
                author: {
                    name: message.author.tag,
                    icon_url: message.member.user.avatarURL(),
                    url: message.url,
                },
                fields: [],
                footer: {
                    text: `Id: ${message.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };

            let bannedMember;
            await message.guild.bans.fetch().then((bans) => bannedMember = bans.filter((user) => user.user));
            for (const user of bannedMember.filter((u) => u.user)) embed.fields.push({ name: `> <:nametag:1200757678104915978> \`${user[1].user.tag}\` (${user[1].user.id})`, value: `:book: Reason: \`${user[1].reason}\``, inline: true});
            embed.description = `Total banned member: \`${bannedMember.size}\``;
            message.channel.send({ embeds: [embed], ephemeral: false });
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}