module.exports = {
    name: "ClientJoinHandler",
    event: "GuildCreate",
    type: "on",
    async execute([guild], client, Discord) {
        if (!guild.members.cache.find(member => member.id === client.user.id).permissions.has("Administrator")) {
            if (guild.channels.cache.find(channel => channel.permissionsFor(guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages") && channel.type === 0)) guild.channels.cache.find(channel => channel.permissionsFor(guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages") && channel.type === 0).send("The permission `Administrator` is missing");
            guild.leave();
            return;
        }
        const data = {};
        data.name = guild.name;
        if (guild.iconURL()) data.icon = guild.iconURL().replace("https://cdn.discordapp.com/icons/", "").replace(guild.id, "").replace("/", "").replace(".webp", "").replace(".gif", "");
        require("../components/database").set(`/${guild.id}`, data, client);
        require("../components/log")(`${client.user.username} has been added in "${guild.name}" (${guild.id})`);
        try {
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await new Discord.REST().setToken(client.config.token).put(
                Discord.Routes.applicationGuildCommands(client.user.id, guild.id),
                { body: client.data.commands.app.map(cmd => cmd.data) },
            );
            require("../components/log")(`Successfully added ${data.length} slash command${(data.length > 1 ? "s" : "")} in ${guild.id} server.`);
        } catch(err) { console.error(err); }
    }
}