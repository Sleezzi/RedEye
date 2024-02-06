module.exports = {
    name: "AppCommandsHandler",
    event: "InteractionCreate",
    type: "on",
    async execute([interaction], client, Discord) {
        try {
            if (interaction.type === 3) return;
            const command = client.data.commands.app.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            require("../components/log")(`%aqua%${(interaction.member.nickname ? `${interaction.member.nickname} (${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)})` : `${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)}`)}%reset% used the app command %yellow%${command.data.name}%reset% on server %aqua%${interaction.guild.name}%reset% (%gray%${interaction.guild.id}%reset%)`);
            try {
                await interaction.deferReply({ ephemeral: true });
                if (client.data.cooldown.has(interaction.member.id)) { // Checks if the user is in cooldown
                    try {
                        await interaction.deleteReply();
                        interaction.followUp(`Please wait **${client.data.cooldown.get(interaction.member.id).cooldown / 1000 - (Math.floor(Date.now() / 1000) - client.data.cooldown.get(interaction.member.id).usedAt)}s** before using command.`);
                        setTimeout(function() {
                            try {
                                interaction.deleteReply();
                            } catch(err) {console.error(err);}
                        }, (client.data.cooldown.get(interaction.member.id).cooldown - (Math.floor(Date.now() / 1000) - client.data.cooldown.get(interaction.member.id).usedAt))); // Delete message when the cooldown is end
                        return;
                    } catch(err) {console.error(err);}
                }
                let disabled = await require("../components/database").get(`/${interaction.guild.id}/disabled`, client);
                if (!disabled[0]) disabled = [];
                if (disabled.find(c => c === command)) { // Check if the server has disabled the command
                    await interaction.deleteReply();
                    interaction.followUp({ embeds: [{
                        color: 0xff0000,
                        title: `Error`,
                        fields: [
                            { name: 'The administrators of this server have disabled this command.', value: '\u200B', inline: false },
                            { name: `__Date of creation:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true},
                        ],
                        footer: {
                            text: `Id: ${interaction.id}`,
                            icon_url: client.user.avatarURL(),
                        }
                    }] }); // send message to warn the user about the disabled command
                    return; // End here
                }
                const err = await command.execute(interaction, client, Discord);
                if (err) console.error(err);
            } catch(err) { console.error(err); }
        } catch(err) { console.error(err); }
    }
}