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
            require("../../components/database").get(`/${interaction.guild.id}/levels/${member.id}`, client).then(level => {
                if (!level.level) level = {
                    level: 1,
                    xp: 0
                };
                const embed = new Discord.EmbedBuilder()
                .setColor("Aqua")
                .setTitle("Information about:")
                .setDescription(`<@${member.id}>`)
                .setThumbnail(interaction.member.avatarURL())
                .setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.avatarURL(), url: interaction.url })
                .addFields(
                    { name: "<:tag:1200813621970739251> __**Tag:**__", value: `> **\`${member.user.tag}\`**`},
                    { name: "<:nametag:1200757678104915978> __**Nickname:**__", value: `> ${(member.nickname === null ? "The member does not have a nickname." : `**\`${member.nickname}\`**`)}`},
                    { name: "<:ID:1200784630865985598> __**ID:**__", value: `> \`${(member.id)}\``},
                    { name: `<:boost:1200817314740842616> __**Level:**__`, value: `> ${level.level} (${level.xp}/${level.level * 150})`},
                    { name: `<:member:1200816753421328484> __**Role${(member._roles.length > 1 ? "s" : "")}:**__`, value: `> ${roles}` },
                    { name: ":inbox_tray: __**Account created:**__", value: `> <t:${Math.floor(member.user.createdTimestamp / 1000)}:d> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`},
                    { name: ":inbox_tray: __**Member since:**__", value: `> <t:${Math.floor(member.joinedTimestamp / 1000)}:d> (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`},
                    { name: ":hourglass: __**Date:**__", value: `<t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`},
                )
                .setURL(interaction.url)
                .setFooter({ text: `Id: ${interaction.id}`, iconURL: client.user.avatarURL() });
                interaction.deleteReply().then(() => interaction.followUp({ embeds: [embed], ephemeral: true }));
            });
            
        } catch(err) { return err; }
    }
}