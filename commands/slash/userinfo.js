module.exports = {
    data: {
        name: "userinfo",
        name_localizations: {
            "en-US": "userinfo",
            fr: "userinfo"
        },
        description: "Gives you information about a member or about you",
        description_localizations: {
            "en-US": "Gives you information about a member or about you",
            fr: "Donne des informations sur un membre du serveur"
        },
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Send to a member',
                description_localizations: {
                    fr: "Envoyer a un membre",
                    "en-US": "Send to a member"
                },
                required: false,
                type: 6,
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
    
            let member = interaction.guild.members.cache.find((m) => m.id === (interaction.options.getUser("member") ? interaction.options.getUser("member") : interaction.member).id) ?? interaction.member;

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
                    { name: `__**Level:**__`, value: `> ${(client.data.level.has(member.id) ? `${client.data.level.get(member.id).level} (${client.data.level.get(member.id).xp}/${client.data.level.get(member.id).maxxp}` : `1 (0/100`)})`},
                    { name: `__**Role${(member._roles.length > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
                    { name: "__**Account created:**__", value: `> <t:${Math.floor(member.user.createdTimestamp / 1000)}:d> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`},
                    { name: "__**Member since:**__", value: `> <t:${Math.floor(member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`},
                    { name: "__**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(interaction.url)
                .setFooter({ text: `Id: ${interaction.id}`, iconURL: client.user.avatarURL() });
            interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true }));
        } catch(err) { return err; }
    }
}