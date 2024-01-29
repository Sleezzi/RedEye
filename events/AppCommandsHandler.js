module.exports = {
    name: "AppCommandsHandler",
    event: "InteractionCreate",
    type: "on",
    async execute([interaction], client, Discord) {
        try {
            if (interaction.type === 3) return;
            const command = client.data.commands.app.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            require("../components/log")(`%aqua%${(interaction.member.nickname ? `${interaction.member.nickname} (${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)})` : `${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)}`)}%reset% used the app command %yellow%${command.data.name}%reset%`);
            try {
                await interaction.deferReply({ ephemeral: true });
                const err = await command.execute(interaction, client, Discord);
                if (err) {
                    console.error(err);
                }
            } catch(err) { console.error(err); }
        } catch(err) { console.error(err); }
    }
}