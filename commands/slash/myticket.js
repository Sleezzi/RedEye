module.exports = {
    data: {
        name: "mytickets",
        name_localizations: {
            "en-US": "mytickets",
            fr: "mestickets"
        },
        description: "Make a new ticket",
        description_localizations: {
            "en-US": "Make a new ticket",
            fr: "Créé un nouveau ticket"
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
            const tickets = await require("../../components/database").get(`/${interaction.guild.id}/tickets/${interaction.member.id}`, client);
            for (const ticket in tickets) embed.fields.unshift({name: `<:nametag:1200757678104915978> - **\`${ticket}\`**:`, value: `> - Content: "\`${tickets[ticket].content}\`",\n> - Category: \`${tickets[ticket].cat === "Bot" ? ":robot:" : tickets[ticket].cat}\`,\n> - Status: ${(tickets[ticket].status === "Not done" ? "<a:no:1205984659524296744>" : (tickets[ticket].status === "In progress" ? "<:time:1205987554260684870>" : (tickets[ticket].status === "Done" ? "<a:yes:1205984539852144751>" : tickets[ticket].status)))},\n> - Made at: <t:${tickets[ticket].madeAt}:R>${(tickets[ticket].updatedAt ? `,\n> - Updated at: <t:${tickets[ticket].updatedAt}:R>` : "")}`});
            await interaction.deleteReply();
            interaction.followUp({ embeds: [embed], ephemeral: true  });
        } catch(err) { return err; }
    }
}