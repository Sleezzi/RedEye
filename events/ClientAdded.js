module.exports = {
    name: "ClientJoinHandler",
    event: "GuildCreate",
    type: "on",
    async execute([guild], client, Discord) {
        try {
            if (!guild.members.cache.find(member => member.id === client.user.id).permissions.has("Administrator")) {
                if (guild.channels.cache.find(channel => channel.permissionsFor(guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages") && channel.type === 0)) guild.channels.cache.find(channel => channel.permissionsFor(guild.members.cache.find(member => member.id === client.user.id)).has("SendMessages") && channel.type === 0).send("The permission `Administrator` is missing");
                guild.leave();
                return;
            }
            const data = {};
            data.name = guild.name;
            const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&=(){}[]\\_-#~ç^$%ù¨*/+.".split("").concat("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&=(){}[]\\_-#~ç^$%ù¨*/+.".split(""))
            for (let i = letters.length; i > 0; i--) {
                const random = Math.floor(Math.random() * (i + 1));
                [letters[i], letters[random]] = [letters[random], letters[i]];
            }
            
            data.token = letters.join("").slice(0, 25);
            if (guild.iconURL()) data.icon = guild.iconURL().replace("https://cdn.discordapp.com/icons/", "").replace(guild.id, "").replace("/", "").replace(".webp", "").replace(".gif", "");
            require("../components/database").set(`/${guild.id}`, data);
            require("../components/log")(`${client.user.username} has been added in "${guild.name}" (${guild.id})`);
            try {
                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await new Discord.REST().setToken(client.config.token).put(
                    Discord.Routes.applicationGuildCommands(client.user.id, guild.id),
                    { body: client.data.commands.app.map(cmd => cmd.data) },
                );
                require("../components/log")(`Successfully added ${data.length} slash command${(data.length > 1 ? "s" : "")} in ${guild.id} server.`);
            } catch(err) { console.error(err); }
            
                const dmChannel = await guild.members.cache.find(u => u.id === guild.ownerId).createDm();
                dmChannel.send({ embeds: [{
                    title: "<a:verified:1205995010567184475> - Blueprint",
                    description: "We thank you for the trust you have in our service.\nThis is why our staff remains at your disposal, if you have any questions you can ask them on our [Disocrd server](https://blueprint.sleezzi.fr/server).",
                    color: 0xFF0000,
                    author: {
                        name: client.users.cache.find(u => u.id === client.ownerId).username,
                        icon_url: client.users.cache.find(u => u.id === client.ownerId).avatarURL(),
                        url: "https://blueprint.sleezzi.fr/",
                    },
                    fields: [
                        { name: `🔑- **Token:** ||${data.token}||`, value: `It will allow you to access the [Control Panel](https://blueprint.sleezzi.fr/control/guild?id=${guild.id}).\n**KEEP IT CAREFULLY, IT WILL NOT BE RETURNED TO YOU LATER, DO NOT SHARE IT**` },
                        { name: `🏠 - **Valid only on the server:**`, value: `**${guild.name}** (*${guild.id}*)` }
                    ],
                    footer: {
                        text: `Id: ${guild.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                }] });
        } catch (err) { return err; }
    }
}