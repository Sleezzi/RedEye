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
                    { name: `__Date of message creation:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };
            if (client.data.tickets.has(interaction.member.id)) {
                for (const ticket in client.data.tickets.get(interaction.member.id)) embed.fields.unshift({name: `**\`${ticket}\`**:`, value: `> - Content: "\`${client.data.tickets.get(interaction.member.id)[ticket].content}\`",\n> - Category: \`${client.data.tickets.get(interaction.member.id)[ticket].cat}\`,\n> - Made at: <t:${client.data.tickets.get(interaction.member.id)[ticket].madeAt}:R>${(client.data.tickets.get(interaction.member.id)[ticket].updatedAt ? `,\n> - Updated at: <t:${client.data.tickets.get(interaction.member.id)[ticket].updatedAt}:R>` : "")}`});
            }
            interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true  }));
        } catch(err) { return err; }
    }
}