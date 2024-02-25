module.exports = {
    name: "cleanmp",
    description: "Delete all bot messages in your PM",
    model: `cleanmp`,
    category: "Misc",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            if (client.users.cache.find(user => user.id === message.member.id)) {
                let messages = await message.channel.messages.fetch({ limit: 100 });
                messages = await messages.filter((msg) => 1_209_600_000 > Date.now() - msg.createdAt && msg.deletable);
                await messages.delete();
                // .then(messages => );
            }
            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Server Information:")
                .setDescription(message.guild.description)
                .setThumbnail(message.guild.iconURL())
                .addFields(
                    { name: "<:nametag:1200757678104915978> __**Server name:**__", value: `**\`${message.guild.name}\`**`},
                    { name: ":book:・__**Server description:**__", value: `**\`${message.guild.description}\`**`},
                    { name: "<:ID:1200784630865985598> - __**ID:**__", value: `\`${message.guild.id}\``},
                    { name: "<:owner:1200816888364683396> - __**Owner:**__", value: `${message.guild.members.cache.find(member => member.id === message.guild.ownerId).user.username} (id: ${message.guild.ownerId})`},
                    { name: ":inbox_tray:・__**You have been a member since:**__", value: `<t:${Math.floor(message.member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(message.member.joinedTimestamp / 1000)}:R>)`},
                    { name: ":computer:・__**Server created:**__", value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.guild.createdTimestamp / 1000)}:R>)`},
                    { name: "<:time:1205987554260684870> - __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            const msg = await message.channel.send({ embeds: [embed], ephemeral: true });
            setTimeout(() => {
                try {
                    if (msg.deletable) {
                        msg.delete();
                    }
                } catch(err) { return err; }
            }, 15000);
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}