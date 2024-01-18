module.exports = {
    data: {
        name: "githubuser",
        name_localizations: {
            "en-US": "githubuser",
            fr: "githubutilisateur"
        },
        description: "Gives information about a GitHub user",
        description_localizations: {
            "en-US": "Gives information about a GitHub user",
            fr: "Donne des informations sur un utilisateur GitHub"
        },
        options: [
            {
                name: 'user',
                name_localizations: {
                    fr: "utilisateur",
                    "en-US": "user"
                },
                description: 'The name of the GitHub user',
                description_localizations: {
                    fr: "Le nom de l'utilisateur GitHub",
                    "en-US": "The name of the GitHub user"
                },
                required: true,
                type: 3,
            }
        ],
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        try {
            let user = interaction.options.getString('user');
            let response = await fetch(`https://api.github.com/users/${user}`)
            if (response.status !== 200) return interaction.deleteReply().then(() => interaction.followUp({ content: `Unable to find "${user}"`, ephemeral: true }));
            response = await response.json();
            const embed = {
                color: 0x0099ff,
                title: `GitHub • ${response.login}`,
                author: {
                    name: interaction.member.tag,
                    icon_url: interaction.member.user.avatarURL(),
                    url: interaction.url,
                },
                thumbnail: {
                    url: response.avatar_url,
                },
                fields: [
                    { name: `__Name:__`, value: `> \`${response.login}\``, inline: true },
                    { name: `__Id:__`, value: `> \`${response.id}\``, inline: true },
                    { name: `__Avatar:__`, value: `> [Image](${response.avatar_url})`, inline: true },
                    { name: `__Bio:__`, value: `> \`${(response.bio ? response.bio : "Unset")}\``, inline: true },
                    { name: `__URL:__`, value: `> [${response.login}](${response.html_url})`, inline: true },
                    { name: `__Company:__`, value: `> \`${(response.company ? response.company : "Unset")}\``, inline: true },
                    { name: `__Website:__`, value: `> ${(response.blog ? `[Click](${response.blog})` : "`Unset`")}`, inline: true },
                    { name: `__Type:__`, value: `> \`${response.type}\``, inline: true },
                    { name: `__Location:__`, value: `> \`${(response.location ? response.location : "Unset")}\``, inline: true },
                    { name: `__E-Mail:__`, value: `> \`${(response.email ? response.email : "Unset")}\``, inline: true },
                    { name: `__Twitter:__`, value: `> \`${(response.twitter_username ? `[${response.twitter_username}](https://twitter.com/${response.twitter_username })` : "Unset")}\``, inline: true },
                    { name: `__Total Public repository:__`, value: `> [${response.public_repos}](${response.html_url}?tab=repositories)`, inline: true },
                    { name: `__Follower${response.followers > 1 ? "s" : ""}:__`, value: `> `, inline: true },
                    { name: `__Account created at:__`, value: `> \`${response.created_at}\``, inline: true },
                    { name: `__Account edited at:__`, value: `> \`${response.updated_at}\``, inline: true },
                    { name: `__Date of creation:__`, value: `> <t:${Math.floor(interaction.createdTimestamp / 1000)}:d> (<t:${Math.floor(interaction.createdTimestamp / 1000)}:R>)`, inline: false},
                ],
                footer: {
                    text: `Id: ${interaction.id}`,
                    icon_url: client.user.avatarURL(),
                },
            };
            if (response.followers > 0) {
                response = await fetch(response.followers_url);
                if (response.status === 200) {
                    response = await response.json();
                    if (response.length > 5) {
                        embed.fields[12].value = `> [${response[0].login}](https://github.com/${response[0].login}), [${response[1].login}](https://github.com/${response[1].login}), [${response[2].login}](https://github.com/${response[2].login}), [${response[3].login}](https://github.com/${response[3].login}), [${response[4].login}](https://github.com/${response[4].login}), [${response[5].login}](https://github.com/${response[5].login}) & [${response.length - 5} more](https://github.com/${user}?tab=followers)`;
                        embed.fields[12].inline = false;
                    } else response.forEach((user) => {
                        embed.fields[12].value = `${embed.fields[12].value}${(embed.fields[12].value === "> " ? "" : ", ")}[${user.login}](https://github.com/${user.login})`;
                    });
                }
            }
            interaction.deleteReply().then(() => interaction.followUp({ embeds: [ embed ], ephemeral: true }));
        } catch(err) { return err; }
    }
}