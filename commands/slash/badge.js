module.exports = {
    data: {
        name: "badge",
        name_localizations: {
            "en-US": "badge",
            fr: "badge"
        },
        description: "Give informations of a badge",
        description_localizations: {
            "en-US": "Give informations of a badge",
            fr: "Donne les informations sur un badge"
        },
        options: [
            {
                name: 'id',
                name_localizations: {
                    fr: "id",
                    "en-US": "id"
                },
                description: 'The id of the badge',
                description_localizations: {
                    fr: "L'id du badge",
                    "en-US": "The id of the badge"
                },
                required: true,
                type: "num",
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let id = interaction.options.getNumber('id');
            let response;
            response = await fetch(`https://badges.roblox.com/v1/badges/${id}`);
            if (response.status !== 200) {
                await interaction.deleteReply();
                interaction.followUp({ content: `Unable to find "${id}"`, ephemeral: true });
                return;
            }
            response = await response.json();
            const embed = {
                color: 0x00FF00,
                title: `Roblox Badges • ${response.name}`,
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url,
                },
                fields: [
                    { name: `<:nametag:1200757678104915978> - __Name:__`, value: `> \`${response.name}\``, inline: true },
                    { name: `<:ID:1200784630865985598> - __Id:__`, value: `> \`${id}\``, inline: true },
                    { name: `:book: - __Description:__`, value: `> \`${(response.description ? response.description : "Unset")}\``, inline: true },
                    { name: `:link __URL:__`, value: `> [${response.name}](https://www.roblox.com/badges/${id}/)`, inline: true },
                    { name: `:chart_with_upwards_trend: - __Stats:__`, value: `> ${response.statistics.winRatePercentage * 100}% (owned ${response.statistics.awardedCount} times)`, inline: true },
                    { name: `:play_pause: - __Enable:__`, value: `> ${(response.enabled ? `<a:yes:1205984539852144751>` : `<a:no:1209518375169167391>`)}`, inline: true },
                    { name: `:video_game: - __Game:__`, value: `> \`${response.awardingUniverse.name}\` (id: \`${response.awardingUniverse.id}\`)`, inline: false },
                    { name: `<:time:1205987554260684870> - __Created at:__`, value: `> \`${response.created}\``, inline: true },
                    { name: `<:time:1205987554260684870> - __Last update:__`, value: `> \`${response.updated}\``, inline: true },
                    { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
                thumbnail: {
                    url: ""
                }
            };
            response = await fetch(`https://thumbnails.roblox.com/v1/badges/icons?badgeIds=${id}&size=150x150&format=Png&isCircular=false`);
            if (response.status !== 200) {
                await interaction.deleteReply();
                interaction.followUp({ content: `An error has occurred`, ephemeral: true });
                return;
            }
            response = await response.json();
            embed.thumbnail.url = response.data[0].imageUrl;
            await interaction.deleteReply();
            interaction.followUp({ embeds: [ embed ], ephemeral: true });
        } catch(err) { return err; }
    }
}