module.exports = {
    data: {
        name: "mytickets",
        name_localizations: {
            "en-US": "mytickets",
            fr: "mestickets"
        },
        description: "Shows you all your tickets",
        description_localizations: {
            "en-US": "Shows you all your tickets",
            fr: "Vous affiche tous vos tickets"
        },
        default_permission: undefined,
        dm_permission: undefined,
        options: [],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            const embed = {
                color: 0x00FF00,
                title: `Tickets • ${interaction.user.username}`,
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url,
                },
                fields: [
                    { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };
            const tickets = await require("../../components/database").get(`/${interaction.guild.id}/tickets/${interaction.member.id}`);
            for (const ticket in tickets) embed.fields.unshift({name: `<:ID:1200784630865985598> - **\`${ticket}\`**:`, value: `> - Content: "\`${tickets[ticket].content}\`",\n> - Category: ${tickets[ticket].cat === "bot" ? ":robot:" : (tickets[ticket].cat === "server" ? "🏠" : "❔")} (\`${tickets[ticket].cat}\`),\n> - Status: ${(tickets[ticket].status === "Not done" ? "<a:no:1211019198881472622>" : (tickets[ticket].status === "In progress" ? "<:time:1205987554260684870>" : (tickets[ticket].status === "Done" ? "<a:yes:1205984539852144751>" : tickets[ticket].status)))},\n> - Made at: <t:${tickets[ticket].madeAt}:R>${(tickets[ticket].updatedAt ? `,\n> - Updated at: <t:${tickets[ticket].updatedAt}:R>` : "")}`});
            await interaction.deleteReply();
            interaction.followUp({ embeds: [embed], ephemeral: true  });
        } catch(err) { return err; }
    }
}