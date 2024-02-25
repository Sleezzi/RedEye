module.exports = {
    name: "MessageDelete",
    event: "MessageDelete",
    type: "on",
    async execute([message], client, Discord) {
        try {
            let serverData = await require("../components/database").get(`/${message.guild.id}`);
            if (!serverData.prefix) serverData.prefix = "!";
            if (
                message.channel.type === 1 ||
                // message.content.startsWith(serverData.prefix) ||
                !serverData.channels ||
                !serverData.channels.log ||
                !message.guild.channels.cache.get(serverData.channels.log) ||
                message.channel.id === serverData.channels.log ||
                !message.guild.channels.cache.get(serverData.channels.log).permissionsFor(message.guild.members.cache.get(client.user.id)).has("SendMessages") ||
                message.author.id === client.user.id
            ) return;
            const embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("Message deleted")
            .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
            .addFields(
                { name: ":keyboard:・__Message:__", value: `**\`${message.content}\`**` },
                { name: "<:tag:1200813621970739251> - __Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                { name: "<:nametag:1200757678104915978> - __Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                { name: "<:time:1205987554260684870> - __Date the message was sent:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                { name: "<:time:1205987554260684870> - __Date:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
            )
            .setURL(message.url)
            .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            message.guild.channels.cache.get(serverData.channels.log).send({ embeds: [embed]});
        } catch (err) { return err; }
    }
}