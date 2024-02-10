module.exports = {
    data: {
        name: "gamebadges",
        name_localizations: {
            "en-US": "gamebadges",
            fr: "gamebadges"
        },
        description: "List the badges of a game",
        description_localizations: {
            "en-US": "List the badges of a game",
            fr: "Liste les badges d'un jeu"
        },
        options: [
            {
                name: 'game',
                name_localizations: {
                    fr: "jeu",
                    "en-US": "game"
                },
                description: 'The id of the game',
                description_localizations: {
                    fr: "L'id du jeu",
                    "en-US": "The id of the game"
                },
                required: true,
                type: "num",
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let game = interaction.options.getNumber('game');
            let response;
            let data = {
                username: "",
                desc: "",
                banned: false,
                verified: false,
                created_at: "",
                avatarURL: "",
            }
            response = await fetch(`https://users.roblox.com/v1/users/${user}`);
            if (response.status !== 200) {
                await interaction.deleteReply();
                interaction.followUp({ content: `Unable to find "${user}"`, ephemeral: true });
                return;
            }
            response = await response.json();
            data.username = response.name;
            data.desc = response.description;
            data.banned = response.isBanned;
            data.verified = response.hasVerifiedBadge;
            data.created_at = response.created;
            response = await fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user}&size=48x48&format=Png&isCircular=false`);
            if (response.status !== 200) {
                await interaction.deleteReply();
                interaction.followUp({ content: `An error has occurred`, ephemeral: true });
                return;
            }
            response = await response.json();
            data.avatarURL = response.data[0].imageUrl;
            const embed = {
                color: 0x00FF00,
                title: `Roblox Badges • ${data.username}`,
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url,
                },
                thumbnail: {
                    url: data.avatarURL,
                },
                fields: [
                    { name: `__Name:__`, value: `> \`${data.username}\``, inline: true },
                    { name: `__Id:__`, value: `> \`${user}\``, inline: true },
                    { name: `__Avatar:__`, value: `> [Image](${data.avatarURL})`, inline: true },
                    { name: `__Bio:__`, value: `> \`${(data.desc ? data.desc : "Unset")}\``, inline: true },
                    { name: `__URL:__`, value: `> [${data.username}](https://www.roblox.com/users/${user}/profile)`, inline: true },
                    { name: `__Banned:__`, value: `> ${(data.banned ? `:white_check_mark:` : `:x:`)}`, inline: true },
                    { name: `__Verified:__`, value: `> ${(data.verified ? `:white_check_mark:` : `:x:`)}`, inline: true },
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };
            response = await fetch(`https://badges.roblox.com/v1/users/${user}/badges?cursor=&limit=10&sortOrder=Asc`);
            if (response.status !== 200) {
                await interaction.deleteReply();
                interaction.followUp({ content: `An error has occurred`, ephemeral: true });
                return;
            }
            response = await response.json();
            embed.fields.push({ name: `__Badge${response.data.length > 1 ? "s" : ""}:__`, value: `\u200B`, inline: false});
            response.data.forEach((badge) => {
                embed.fields.push({ name: `${badge.displayName}:`, value: `Description: \`${badge.description}\`, Difficulty to own: ${badge.winRatePercentage * 100}%, Id: \`${badge.id}\``, inline: true});
            });
            embed.fields.push({ name: `__Account created at:__`, value: `> \`${data.created_at}\``, inline: true });
            embed.fields.push({ name: `__Date of creation:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true});
            await interaction.deleteReply();
            interaction.followUp({ embeds: [ embed ], ephemeral: true });
        } catch(err) { return err; }
    }
}