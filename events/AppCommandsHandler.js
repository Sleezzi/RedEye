module.exports = {
    name: "contextCommandsHandler",
    event: "InteractionCreate",
    type: "on",
    async execute([interaction], serverData, client, Discord) {
        try {
            if (interaction.type === 3) return;
            const command = client.data.commands.app.get(interaction.commandName);
            if (!command) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

            console.log(`  ↪ [\x1b[90m${(interaction.createdAt.getDate() < 10 ? `0${interaction.createdAt.getDate()}` : interaction.createdAt.getDate())}/${(interaction.createdAt.getMonth() < 10 ? `0${interaction.createdAt.getMonth()}` : interaction.createdAt.getMonth())}/${(interaction.createdAt.getFullYear() < 10 ? `0${interaction.createdAt.getFullYear()}` : interaction.createdAt.getFullYear())} ${(interaction.createdAt.getHours() < 10 ? `0${interaction.createdAt.getHours()}` : interaction.createdAt.getHours())}:${(interaction.createdAt.getMinutes() < 10 ? `0${interaction.createdAt.getMinutes()}` : interaction.createdAt.getMinutes())}:${(interaction.createdAt.getSeconds() < 10 ? `0${interaction.createdAt.getSeconds()}` : interaction.createdAt.getSeconds())}\x1b[0m] \x1b[36m${(interaction.member.nickname ? `${interaction.member.nickname} (${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)})` : `${(interaction.member.user.tag.endsWith("#0") ? `${`${interaction.member.username}`.replace(`${interaction.member.username}`.slice(1), "").toUpperCase()}${`${interaction.member.username}`.slice(1)}` : `${`${interaction.member.user.tag}`.replace(`${interaction.member.user.tag}`.slice(1), "").toUpperCase()}${`${interaction.member.user.tag}`.slice(1)}`)}`)}\x1b[0m used the context command "${command.data.name}"`);
            try {
                await interaction.deferReply({ ephemeral: true });
                const err = await command.execute(interaction, serverData, client, Discord);
                if (err) {
                    console.error(err);
                }
            } catch(err) { console.error(err); }
        } catch(err) { console.error(err); }
    }
}