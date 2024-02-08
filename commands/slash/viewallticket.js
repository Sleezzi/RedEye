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
            if (!interaction.member.permissions.has("ModerateMembers")) {
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
                    { name: `__Date of message creation:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };

            if (interaction.options.getUser("member")) {
                const member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);
                embed.title = `Tickets • ${member.user.username}`;
                require("../../components/database").get(`/${interaction.guild.id}/tickets/${member.id}`, client).then((tickets) => {
                    for (const ticket in tickets) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - Content: **\`${tickets[ticket].content}\`**,\n> - Category: ${tickets[ticket].cat === "bot" ? "" : (tickets[ticket].cat === "server" ? "" : "")},\n> - Status: ${(tickets[ticket].status === "Not done" ? ":x:" : (tickets[ticket].status === "In progress" ? ":hourglass:" : (tickets[ticket].status === "Done" ? ":white_check_mark:" : tickets[ticket].status)))},\n> - Made at: <t:${tickets[ticket].madeAt}:R>${(tickets[ticket].updatedAt ? `,\n> - Updated at: <t:${tickets[ticket].updatedAt}:R>` : "")}`});
                });
            } else {
                require("../../components/database").get(`/${interaction.guild.id}/tickets`, client).then((users) => {
                    for (const user in users) {
                        for (const ticket in users[user]) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - Content: **\`${tickets[ticket].content}\`**,\n> - Category: ${tickets[ticket].cat === "bot" ? "" : (tickets[ticket].cat === "server" ? "" : "")},\n> - Status: ${(users[user][ticket].status === "Not done" ? ":x:" : (users[user][ticket].status === "In progress" ? ":hourglass:" : (users[user][ticket].status === "Done" ? ":white_check_mark:" : users[user][ticket].status)))},\n> - Made at: <t:${users[user][ticket].madeAt}:R>${(users[user][ticket].updatedAt ? `,\n> - Updated at: <t:${users[user][ticket].updatedAt}:R>` : "")}`});
                        embed.fields.unshift({ name: `Tickets of ${users[user][Object.keys(users[user])[0]].username}:`, value: "" });
                    }
                });
            }

            interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true }));
        } catch(err) { return err; }
    }
}