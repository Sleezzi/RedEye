module.exports = {
    name: "AppCommandsHandler",
    event: "InteractionCreate",
    type: "on",
    async execute([interaction], client, Discord) {
        try {
            if (interaction.type === 3) return;
            const command = client.commands.app.get(interaction.commandName);
            if (!command) return interaction.reply({ embeds: [{
                color: 0xff0000,
                title: `Error`,
                fields: [
                    { name: '<:error:1205982398429532280> - There was an error while executing this command!', value: '\u200B', inline: false },
                    { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true},
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                }
            }], ephemeral: true });
            require("../components/log")(`%aqua%${(interaction.member.nickname ? `${interaction.member.nickname} (${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)})` : `${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)}`)}%reset% used the app command %yellow%${command.data.name}%reset% on server %aqua%${interaction.guild.name}%reset% (%gray%${interaction.guild.id}%reset%)`);
            try {
                const replyMessage = [
                    "hack the FBI database",
                    "fixes the universe's problems",
                    "resolves the P ≟ NP issue",
                    "tracks down the criminals"
                ];
                await interaction.reply({ embeds: [{
                    title: `<a:loading:1204754788055646218> - Please wait while RedEye ${replyMessage[Math.floor(Math.random() * replyMessage.length)]}`,
                    color: 0xBF94FF,
                    author: {
                        name: interaction.member.tag,
                        icon_url: interaction.member.user.avatarURL(),
                        url: interaction.url,
                    },
                    footer: {
                        text: `Id: ${interaction.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                }], ephemeral: true });
                if (client.cooldown.has(interaction.member.id)) { // Checks if the user is in cooldown
                    try {
                        await interaction.deleteReply();
                        interaction.followUp({ content: `Please wait **${client.cooldown.get(interaction.member.id).cooldown / 1000 - (Math.floor(Date.now() / 1000) - client.cooldown.get(interaction.member.id).usedAt)}s** before using command.`, ephemeral: true});
                        return;
                    } catch(err) {console.error(err);}
                }
                let disabled = await require("../components/database").get(`/${interaction.guild.id}/disabled`);
                if (!disabled[0]) disabled = [];
                if (disabled.find(c => c === command)) { // Check if the server has disabled the command
                    await interaction.deleteReply();
                    interaction.followUp({ embeds: [{
                        color: 0xff0000,
                        title: `Error`,
                        fields: [
                            { name: '<a:no:1211019198881472622> - The administrators of this server have disabled this command.', value: '\u200B', inline: false },
                            { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true},
                        ],
                        footer: {
                            text: `Id: ${interaction.id}`,
                            icon_url: client.user.avatarURL(),
                        }
                    }], ephemeral: true }); // send message to warn the user about the disabled command
                    return; // End here
                }
                const err = await command.execute(interaction, client, Discord);
                if (err) {
                    const replyMessage = [
                        "The bot feels tired today, doesn't blame him.",
                        "Mistakes happen to everyone",
                    ];
                    await interaction.deleteReply();
                    interaction.followUp({ embeds: [{
                        color: 0xff0000,
                        title: `Error`,
                        fields: [
                            { name: '<:error:1205982398429532280> - There was an error while executing this command!', value: replyMessage[Math.floor(Math.random() * replyMessage.length)], inline: false },
                            { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true},
                        ],
                        footer: {
                            text: `Id: ${interaction.id}`,
                            icon_url: client.user.avatarURL(),
                        }
                    }], ephemeral: true });
                    try {
                        if (err) {
                            if (typeof err === "object") {
                                console.error("\x1b[31m", err, "\x1b[0m");
                            } else {
                                require("./components/log")(`%red%${err}`);
                            }
                        }
                    } catch (_) {}
                }
            } catch(err) { console.error(err); }
        } catch(err) { console.error(err); }
    }
}