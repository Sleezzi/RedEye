let i = 0;
let edited = false;

module.exports = {
    name: "UpdateHandler",
    event: "ClientReady",
    type: "on",
    execute([], client, Discord) {
        client.user.setStatus(Discord.PresenceUpdateStatus.Online);
        const properties = [
            (client, Discord) => client.user.setActivity(`!help`, { type: Discord.ActivityType.Playing, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" }),
            (client, Discord, members) => client.user.setActivity(`${members.length} member${(members.length > 1 ? "s" : "")} • 👤`, { type: Discord.ActivityType.Watching, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" }),
            (client, Discord, members, onlineMembers) => client.user.setActivity(`${onlineMembers.length} online member${(onlineMembers.length > 1 ? "s" : "")} • 🟢`, { type: Discord.ActivityType.Watching, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" }),
            (client, Discord) => client.user.setActivity(`at his animated profile picture`, { type: Discord.ActivityType.Watching, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" }),
            (client, Discord) => {
                const date = new Date();
                if (date.getMonth() === 1 && date.getDate() <= 13) {
                    if (!edited) {
                        client.user.edit({ avatar: "./cdn/img/valentine_s_day.gif", username: "Blueprint [❤️]" });
                        edited = true;
                    }
                    client.user.setActivity(`Happy Valentine day • ❤️`, { type: Discord.ActivityType.Watching, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" });
                } else {
                    i++;
                    fun();
                }
            },
            (client, Discord) => {
                const date = new Date();
                if (date.getMonth() === 9) {
                    if (!edited) {
                        client.user.edit({ avatar: "./cdn/img/halloween.gif", username: "Blueprint [🎃]" });
                        edited = true;
                    }
                    client.user.setActivity(`Happy Halloween • 🎃`, { type: Discord.ActivityType.Watching, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" });
                } else {
                    i++;
                    fun();
                }
            },
            (client, Discord) => {
                const date = new Date();
                if (date.getMonth() === 11 && date.getDate() <= 24) {
                    if (!edited) {
                        client.user.edit({ avatar: "./cdn/img/christmas.gif", username: "Blueprint [🎄]" });
                        edited = true;
                    }
                    client.user.setActivity(`Merry Christmas • 🎄`, { type: Discord.ActivityType.Watching, url: "https://blueprint.sleezzi.fr", state: "Bot made by Sleezzi" });
                } else {
                    i++;
                    fun();
                }
            },
        ];
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
                if (i >= properties.length) i = 0;
                properties[i](client, Discord, members, onlineMembers);
                i++;
                const date = new Date();
                
                if ((date.getMonth() !== 1 || date.getDate() > 13) && date.getMonth() !== 9 && (date.getMonth() !== 11 || date.getDate() > 24) && edited) {
                    client.user.edit({ avatar: "./cdn/img/avatar.gif", username: "Blueprint" });
                    edited = false;
                }
            } catch(err) { return console.error(err); }
        }
        setInterval(fun, 15_000);
        fun();
    }
}