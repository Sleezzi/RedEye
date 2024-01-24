module.exports = {
    name: "statusHandler",
    event: "ClientReady",
    type: "on",
    execute([], serverData, client, Discord) {
        let i = 1;
        client.user.setStatus(Discord.PresenceUpdateStatus.Online);
        const fun = () => {
            try {
                let members = [];
                let onlineMembers = [];
                client.guilds.cache.forEach((guild) => {
                    guild.members.cache.forEach(member => {
                        if (!member.user.bot && !members.find(m => m.id === member.id)) members.push(member.id);
                        if (member.presence && member.presence.status !== "offline" && !member.user.bot && !onlineMembers.find(m => m.id === member.id)) onlineMembers.push(member.id);
                    });
                });
                if (i === 1) client.user.setActivity(`!help`, { type: Discord.ActivityType.Playing, url: "https://discord.gg/xKxSt7Ke8x", state: "Bot made by Sleezzi" });
                if (i === 2) client.user.setActivity(`👤 • ${members.length} member${(members.length > 1 ? "s" : "")}`, { type: Discord.ActivityType.Watching, url: "https://discord.gg/xKxSt7Ke8x", state: "Bot made by Sleezzi" });
                if (i === 3) {
                    client.user.setActivity(`🟢 • ${onlineMembers.length} online member${(onlineMembers.length > 1 ? "s" : "")}`, { type: Discord.ActivityType.Watching, url: "https://discord.gg/xKxSt7Ke8x", state: "Bot made by Sleezzi" });
                    i = 0;
                }
                i++
            } catch(err) { return console.error(err); }
        }

        setInterval(fun, 15_000);
        fun();
    }
}