module.exports = {
    name: "MessageUpdate",
    event: "MessageUpdate",
    type: "on",
    async execute([message, newMessage], client, Discord) {
        try {
            if (message.channel.type === 1) return;
            let serverData = await require("../components/database").get(`/${message.guild.id}`);
            if (serverData.prefix) serverData.prefix = "!";
            if (newMessage.content.startsWith(serverData.prefix)) {
                require("./commandHandler").execute([newMessage], client, Discord);
                return;
            };
            if (
                !serverData.channels ||
                !serverData.channels.log ||
                !message.guild.channels.cache.get(serverData.channels.log) ||
                message.channel.id === serverData.channels.log ||
                !message.guild.channels.cache.find(channel => channel.id === serverData.channels.log).permissionsFor(message.guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages") ||
                newMessage.member.id === client.user.id
            ) return;
            const embed = new Discord.EmbedBuilder()
            .setColor("Orange")
            .setTitle("Message edited")
            .addFields(
                { name: ":keyboard:・__Old message:__", value: `\`${message.content}\``, inline: true},
                { name: ":keyboard:・__New message:__", value: `\`${newMessage.content}\``, inline: true},
                { name: "<:tag:1200813621970739251> - __Channel:__", value: `<#${message.channelId}> \`(${message.channelId})\``},
                { name: "<:nametag:1200757678104915978> - __Author:__", value: `\`${newMessage.member.username}\``},
                { name: "<:time:1205987554260684870> - __Date the message was sent:__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                { name: "<:time:1205987554260684870> - __Message modification date:__", value: `<t:${Math.floor(Date.now() / 1000)}:d> (<t:${Math.floor(Date.now() / 1000)}:R>)`, inline: true},
            )
            .setURL(message.url)
            .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            message.guild.channels.cache.get(serverData.channels.log).send({ embeds: [embed]});
        } catch (err) { return err; }
    }
}