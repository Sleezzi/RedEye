module.exports = {
    data: {
        name: "userbadges",
        name_localizations: {
            "en-US": "userbadges",
            fr: "userbadges"
        },
        description: "List of badges obtained by a Roblox player",
        description_localizations: {
            "en-US": "List of badges obtained by a Roblox player",
            fr: "Liste les badges obtenue par un joueur Roblox"
        },
        options: [
            {
                name: 'user',
                name_localizations: {
                    fr: "utilisateur",
                    "en-US": "user"
                },
                description: 'The id of the player',
                description_localizations: {
                    fr: "L'id du joueur",
                    "en-US": "The id of the player"
                },
                required: true,
                type: 10,
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let user = interaction.options.getNumber('user');
            let response;
            let data = {
                username: "",
                desc: "",
                banned: false,
                verified: false,
                created_at: "",
                avatarURL: "",
            };
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
                    { name: `<:nametag:1200757678104915978> - __Name:__`, value: `> \`${data.username}\``, inline: true },
                    { name: `<:ID:1200784630865985598> - __Id:__`, value: `> \`${user}\``, inline: true },
                    { name: `:bust_in_silhouette:・__Avatar:__`, value: `> [Image](${data.avatarURL})`, inline: true },
                    { name: `:book:・__Bio:__`, value: `> \`${(data.desc ? data.desc : "Unset")}\``, inline: true },
                    { name: `:link:・__URL:__`, value: `> [${data.username}](https://www.roblox.com/users/${user}/profile)`, inline: true },
                    { name: `<a:ban:1205986766687965276> - __Banned:__`, value: `> ${(data.banned ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true },
                    { name: `<a:verified:1205995010567184475> - __Verified:__`, value: `> ${(data.verified ? `<a:yes:1205984539852144751>` : `<a:no:1211019198881472622>`)}`, inline: true },
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
            embed.fields.push({ name: `:trophy:・__Badge${response.data.length > 1 ? "s" : ""}:__`, value: `\u200B`, inline: false});
            response.data.forEach((badge) => {
                embed.fields.push({ name: `${badge.displayName}:`, value: `> :book:・Description: \`${badge.description}\`,\n> :warn:・Difficulty to own: ${badge.statistics.winRatePercentage * 100}%,\n> <:ID:1200784630865985598> - Id: \`${badge.id}\``, inline: true});
            });
            
            embed.fields.push({ name: `\u200B`, value: `\u200B`, inline: false });
            embed.fields.push({ name: `<:time:1205987554260684870> - __Account created at:__`, value: `> \`${data.created_at}\``, inline: true });
            embed.fields.push({ name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: true});
            await interaction.deleteReply();
            interaction.followUp({ embeds: [ embed ], ephemeral: true });
        } catch(err) { return err; }
    }
}