module.exports = {
    data: {
        name: "banlist",
        name_localizations: {
            "en-US": "banlist",
            fr: "banliste"
        },
        description: "Returns the list of all banned members from the server",
        description_localizations: {
            "en-US": "Returns the list of all banned members from the server",
            fr: "Renvoie la liste de tout les membres bannie du serveur"
        },
        default_member_permissions: "ManageMembers",
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            
            const embed = {
                color: 0x0099ff,
                title: 'Ban list',
                description: "",
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url,
                },
                fields: [],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };

            let bannedMember;
            await interaction.guild.bans.fetch().then((bans) => bannedMember = bans.filter((user) => user.user));
            for (const user of bannedMember.filter((u) => u.user)) embed.fields.push({ name: `> <:nametag:1200757678104915978> \`${user[1].user.tag}\` (${user[1].user.id})`, value: `:book: Reason: \`${user[1].reason}\``, inline: true});
            embed.description = `Total banned member: \`${bannedMember.size}\``;
            interaction.followUp({ embeds: [embed], ephemeral: false });
        } catch(err) { return err; }
    }
}