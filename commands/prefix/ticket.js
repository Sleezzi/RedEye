module.exports = {
    name: "ticket",
    description: "Make a new ticket (Not available)",
    model: `ticket`,
    category: "Misc",
    cooldown: 15000,
    async execute(message, client, Discord) {
        try {
            const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setTitle("Ticket")
                .addFields(
                    { name: "__**<:error:1205982398429532280>:・Error:**__", value: `Sorry but the "ticket" command is only available with application commands (the / commands)`},
                    { name: "<:time:1205987554260684870> - __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(message.url)
                .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });
            const msg = await message.channel.send({ embeds: [embed], ephemeral: false });
            setInterval(() => {
                try {
                    
                } catch (error) {
                    
                }
            }, 5_000);
            if (message && message.deletable) message.delete();
        } catch(err) { console.error(err); }
    }
}