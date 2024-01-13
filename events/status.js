module.exports = {
    name: "statusHandler",
    event: "ClientReady",
    type: "on",
    execute([], serverData, client, Discord) {
        let i = 1;
        client.user.setStatus(Discord.PresenceUpdateStatus.Online);
        const fun = () => {
            try {
                let members = 0;
                let onlineMembers = 0;
                client.guilds.cache.forEach((guild) => {
                    members += guild.members.cache.filter((member) => !member.user.bot).size;
                    onlineMembers += guild.members.cache.filter((member) => member.presence && member.presence.status !== "offline" && !member.user.bot).size;
                });
                if (i === 1) {
                    client.user.setActivity(`!help`, { type: Discord.ActivityType.Playing, url: "https://discord.gg/xKxSt7Ke8x", state: "Bot made by Sleezzi" });
                }
                if (i === 2) {
                    client.user.setActivity(`👤 • ${members}`, { type: Discord.ActivityType.Watching, url: "https://discord.gg/xKxSt7Ke8x", state: "Bot made by Sleezzi" });
                }
                if (i === 3) {
                    client.user.setActivity(`🟢 • ${onlineMembers}`, { type: Discord.ActivityType.Watching, url: "https://discord.gg/xKxSt7Ke8x", state: "Bot made by Sleezzi" });
                    i = 0;
                }
                i++
            } catch(err) { return console.error(err); }
        }

        setInterval(fun, 15_000);
        fun();
    }
}