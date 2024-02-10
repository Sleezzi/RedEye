module.exports = {
    data: {
        name: "weather",
        name_localizations: {
            "en-US": "weather",
            fr: "meteo"
        },
        description: "Show you the weather",
        description_localizations: {
            "en-US": "Show you the weather",
            fr: "Vous montre la météo"
        },
        default_permission: undefined,
        dm_permission: undefined,
        options: [
            {
                name: 'latitude',
                name_localizations: {
                    fr: "latitude",
                    "en-US": "latitude"
                },
                description: 'The latitude',
                description_localizations: {
                    fr: "La latitude",
                    "en-US": "The latitude"
                },
                required: true,
                type: "number",
            },
            {
                name: 'longitude',
                name_localizations: {
                    fr: "longitude",
                    "en-US": "longitude"
                },
                description: 'The longitude',
                description_localizations: {
                    fr: "La longitude",
                    "en-US": "The longitude"
                },
                required: true,
                type: "number",
            },
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
        //     const embed = {
        //         title: `:thermometer: -Weather`,
        //         color: 0x00FF00,
        //         author: {
        //             name: interaction.member.tag,
        //             icon_url: interaction.member.user.avatarURL(),
        //             url: interaction.url,
        //         },
        //         fields: [
        //             { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false}
        //         ],
        //         footer: {
        //             text: `Id: ${interaction.id}`,
        //             icon_url: client.user.avatarURL(),
        //         },
        //     };
        //     let resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${interaction.options.getNumber("latitude")}&longitude=${interaction.options.getNumber("longitude")}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,cloud_cover,wind_speed_10m&tim`);
        //     if ()

        //     await interaction.deleteReply();
        //     interaction.followUp({ embeds: [embed], ephemeral: true }));
        } catch(err) { return err; }
    }
}