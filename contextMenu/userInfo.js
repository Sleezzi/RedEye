module.exports = {
    data: {
        name: "userinfo",
        name_localizations: {
            "fr": "Information sur le membre"
        },
        type: "user",
        default_permission: undefined,
        default_member_permissions: undefined,
        dm_permission: undefined
    },
    async execute([interaction], serverData, client, Discord) {
        try {
            const member = interaction.guild.members.cache.get(interaction.targetId);
            let roles = "The member has no role.";

            if (member._roles.length > 0) {
                for (let i = 0; i < member._roles.length; i++) {
                    roles = `<@&${member._roles.map((i) => i).join('>, <@&')}>`;
                }
            }

            const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Information about:")
                .setDescription(`<@${member.id}>`)
                .setThumbnail(interaction.member.avatarURL())
                .setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.avatarURL(), url: interaction.url })
                .addFields(
                    { name: "__**Tag:**__", value: `> **\`${member.user.tag}\`**`},
                    { name: "__**Nickname:**__", value: `> ${(member.nickname === null ? "The member does not have a nickname." : `**\`${member.nickname}\`**`)}`},
                    { name: "__**ID:**__", value: `> \`${(member.id)}\``},
                    { name: `__**Role${(member._roles.length > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
                    { name: "__**Account created:**__", value: `> <t:${Math.floor(member.user.createdTimestamp / 1000)}:d> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`},
                    { name: "__**Member since:**__", value: `> <t:${Math.floor(member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`},
                    { name: "__**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(interaction.url)
                .setFooter({ text: `Id: ${interaction.id}`, iconURL: client.user.avatarURL() });
            interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true }));
        } catch (err) { console.error(err); }
    }
}