module.exports = {
    name: "NewMessage",
    event: "MessageCreate",
    type: "on",
    async execute([message], client, Discord) {
        try {
            if (message.channel.type === 1 || message.author.bot) return;
            let serverData = await require("../components/database").get(`/${message.guild.id}`, client);
            if (!serverData.prefix) serverData.prefix = "!";
            if (!message.content.startsWith(serverData.prefix) &&
                serverData.channels &&
                serverData.channels.log &&
                serverData.channels.log.channelId &&
                message.guild.channels.cache.get(serverData.channels.log.channelId) &&
                message.guild.channels.cache.get(serverData.channels.log.channelId).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages") &&
                message.member.id !== client.user.id
            ) {
                const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setTitle("New message")
                    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL(), url: message.url })
                    .addFields(
                        { name: ":keyboard: - __Message:__", value: `**\`${message.content}\`**` },
                        { name: "<:tag:1200813621970739251> - __Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                        { name: "<:nametag:1200757678104915978> - __Author:__", value: `**\`${message.author.tag}\`** \`(${message.author.id})\``},
                        { name: ":hourglass: - __Date:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)` },
                    )
                    .setURL(message.url)
                    .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
                message.guild.channels.cache.find(c => c.id === serverData.channels.log.channelId).send({ embeds: [embed]});
            }
        } catch (err) { return err; }
    }
}