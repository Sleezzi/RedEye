module.exports = {
    name: "RoleReactionAutoReact",
    event: "ClientReady",
    type: "once",
    async execute([], serverData, client, Discord) {
        try {
            // for (const channelId in client.config.reactions) {
            //     try {
            //         const channel = await client.guilds.cache.get(client.config.serverId).channels.fetch(channelId);
            //         for (const messageId in client.config.reactions[channelId]) {
            //             try {
            //                 const message = await channel.messages.fetch(messageId);
            //                 for (const reaction in client.config.reactions[channelId][messageId]) {
            //                     if (!message.reactions.cache.has(reaction)) message.react(`${reaction}`);
            //                 }
            //             } catch (error) {
            //                 console.log(`Cannot find channel ${messageId} in the channel ${channelId}`);
            //             }
            //         }
            //     } catch (error) {
            //         console.log(`Cannot find channel ${channelId} on server`);
            //     }
            // }
        } catch (err) { return console.error(err); }
    }
}