module.exports = {
    data: {
        name: "viewalltickets",
        name_localizations: {
            "en-US": "viewalltickets",
            fr: "voirtouslestickets"
        },
        description: "Show you all of tickets",
        description_localizations: {
            "en-US": "Show you all of tickets",
            fr: "Vous montre tous les tickets"
        },
        default_permission: undefined,
        dm_permission: undefined,
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member to ban',
                description_localizations: {
                    fr: "Membre a bannir",
                    "en-US": "Member to ban"
                },
                required: false,
                type: 6,
            },
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            if (!interaction.member.permissions.has("ModerateMembers") && interaction.member.id !== client.ownerId) {
                require("./myticket").execute(interaction, client, Discord);
                return;
            }
            const embed = {
                title: `Tickets • All`,
                color: 0x00FF00,
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

            if (interaction.options.getUser("member")) {
                const member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);
                embed.title = `:ticket: - T-ickets • ${member.user.username}`;
                const tickets = await require("../../components/database").get(`/${interaction.guild.id}/tickets/${member.id}`, client);
                for (const ticket in tickets) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - :book: - Content: **\`${tickets[ticket].content}\`**,\n> - :gear: - Category: ${tickets[ticket].cat === "Bot" ? ":robot:" : tickets[ticket].cat},\n> - :placard: - Status: ${(tickets[ticket].status === "Not done" ? "<a:no:1205984659524296744>" : (tickets[ticket].status === "In progress" ? "<:time:1205987554260684870>" : (tickets[ticket].status === "Done" ? "<a:yes:1205984539852144751>" : tickets[ticket].status)))},\n> - <:time:1205987554260684870> - Made at: <t:${tickets[ticket].madeAt}:R>${(tickets[ticket].updatedAt ? `,\n> - <:time:1205987554260684870> - Updated at: <t:${tickets[ticket].updatedAt}:R>` : "")}`});
            } else {
                const users = await require("../../components/database").get(`/${interaction.guild.id}/tickets`, client);
                for (const user in users) {
                    for (const ticket in users[user]) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - :book: - Content: **\`${users[user][ticket].content}\`**,\n> - :gear: - Category: ${users[user][ticket].cat === "Bot" ? ":robot:" : users[user][ticket].cat},\n> - :placard: - Status: ${(users[user][ticket].status === "Not done" ? "<a:no:1205984659524296744>" : (users[user][ticket].status === "In progress" ? "<:time:1205987554260684870>" : (users[user][ticket].status === "Done" ? "<a:yes:1205984539852144751>" : users[user][ticket].status)))},\n> - <:time:1205987554260684870> - Made at: <t:${users[user][ticket].madeAt}:R>${(users[user][ticket].updatedAt ? `,\n> - <:time:1205987554260684870> - Updated at: <t:${users[user][ticket].updatedAt}:R>` : "")}`});
                    embed.fields.unshift({ name: `:ticket: - Tickets of ${users[user][Object.keys(users[user])[0]].username}:`, value: "" });
                }
            }
            await interaction.deleteReply();
            interaction.followUp({ embeds: [embed], ephemeral: true });
        } catch(err) { return err; }
    }
}