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
    async execute(interaction, serverData, client, Discord) {
        try {
            if (!interaction.member.permissions.has("ManageMember")) {
                require("./myticket").execute(interaction, serverData, client, Discord);
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
                let member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);
                embed.title = `Tickets • ${member.user.username}`;
                if (client.data.tickets.has(member.id)) {
                    for (const ticket in client.data.tickets.get(member.id)) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - Content: "\`${client.data.tickets.get(member.id)[ticket].content}\`",\n> - Category: \`${client.data.tickets.get(member.id)[ticket].cat}\`,\n> - Made at: <t:${client.data.tickets.get(member.id)[ticket].madeAt}:R>${(client.data.tickets.get(member.id)[ticket].updatedAt ? `,\n> - Updated at: <t:${client.data.tickets.get(member.id)[ticket].updatedAt}:R>` : "")}`});
                }
            } else {
                for (const [userId, user] of client.data.tickets) {
                    for (const ticket in user) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - Content: "\`${user[ticket].content}\`",\n> - Category: \`${user[ticket].cat}\`,\n> - Status: ${user[ticket].status === "true" ? "Done" : (user[ticket].status === "inProgress" ? "In progress" : "Not done")},\n> - Made at: <t:${user[ticket].madeAt}:R>${(user[ticket].updatedAt ? `,\n> - Updated at: <t:${user[ticket].updatedAt}:R>` : "")}`});
                    embed.fields.unshift({ name: `Tickets of ${user[Object.keys(user)[0]].username}:`, value: "" });
                }
            }

            interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true  }));
        } catch(err) { return err; }
    }
}