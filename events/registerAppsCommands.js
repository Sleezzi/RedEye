module.exports = {
    name: "registerAppsCommands",
    event: "ClientReady",
    type: "once",
    async execute([], serverData, client, Discord) {
        try {
            client.guilds.cache.map(guild => guild.id).forEach(async (id) => {
                try {
                    // The put method is used to fully refresh all commands in the guild with the current set
                    const data = await new Discord.REST().setToken(client.config.token).put(
                        Discord.Routes.applicationGuildCommands(client.user.id, id),
                        { body: client.data.commands.app.map(cmd => cmd.data) },
                    );
                    require("../components/log")(`Successfully updated ${data.length} slash command${(data.length > 1 ? "s" : "")} in ${id} server.`);
                } catch(err) { console.error(err); }
            });
        } catch (err) { console.error(err); }
    }
}