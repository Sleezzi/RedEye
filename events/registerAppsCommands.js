module.exports = {
    name: "registerAppsCommands",
    event: "ClientReady",
    type: "once",
    async execute([], serverData, client, Discord) {
        try {
            let servers;
            await require("../components/database").get("/", client).then(srv => servers = srv);
            client.guilds.cache.forEach(async (guild) => {
                try {
                    // The put method is used to fully refresh all commands in the guild with the current set
                    const data = await new Discord.REST().setToken(client.config.token).put(
                        Discord.Routes.applicationGuildCommands(client.user.id, guild.id),
                        { body: client.data.commands.app.map(cmd => cmd.data) },
                    );
                    require("../components/log")(`Successfully updated ${data.length} slash command${(data.length > 1 ? "s" : "")} in %aqua%${guild.name}%reset% (%grey%${guild.id}%reset%) server.`);
                    if (!servers[guild.id]) {
                        if (guild.iconURL()) {
                            require("../components/database").set(`/${guild.id}`, {name: guild.name, icon: guild.iconURL().replace("https://cdn.discordapp.com/icons/", "").replace(guild.id, "").replace("/", "").replace(".webp", "")}, client);
                        } else require("../components/database").set(`/${guild.id}`, {name: guild.name}, client);
                    } else {
                        if (guild.iconURL() && servers[guild.id].icon !== guild.iconURL().replace("https://cdn.discordapp.com/icons/", "").replace(guild.id, "").replace("/", "").replace(".webp", "")) require("../components/database").set(`/${guild.id}/icon`, guild.iconURL().replace("https://cdn.discordapp.com/icons/", "").replace(guild.id, "").replace("/", "").replace(".webp", ""), client);
                        if (servers[guild.id].name !== guild.name) require("../components/database").set(`/${guild.id}/name`, guild.name, client);
                    }
                } catch(err) { console.error(err); }
            });
        } catch (err) { console.error(err); }
    }
}