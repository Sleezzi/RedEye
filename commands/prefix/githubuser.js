module.exports = {
    name: "githubuser",
    description: "Gives you information about a member or about you",
    model: `level *\`member\`*`,
    category: "Information",
    cooldown: 10000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let user = message.content.split(' ').slice(1)[0];
            let response = await fetch(`https://api.github.com/users/${user}`)
            if (response.status === 200) {
                response = await response.json();
                const embed = {
                    color: 0x0099ff,
                    title: `GitHub • ${response.login}`,
                    author: {
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `<:nametag:1200757678104915978> __Name:__`, value: `> \`${response.login}\``, inline: true },
                        { name: `<:ID:1200784630865985598> __Id:__`, value: `> \`${response.id}\``, inline: true },
                        { name: `:camera: __Avatar:__`, value: `> [Image](${response.avatar_url})`, inline: true },
                        { name: `:book: __Bio:__`, value: `> \`${(response.bio ? response.bio : "Unset")}\``, inline: true },
                        { name: `:link: __URL:__`, value: `> [${response.login}](${response.html_url})`, inline: true },
                        { name: `:necktie: __Company:__`, value: `> \`${(response.company ? response.company : "Unset")}\``, inline: true },
                        { name: `:globe_with_meridians: __Website:__`, value: `> ${(response.blog ? `[Click](${response.blog})` : "`Unset`")}`, inline: true },
                        { name: `:gear: __Type:__`, value: `> \`${response.type}\``, inline: true },
                        { name: `:map: __Location:__`, value: `> \`${(response.location ? response.location : "Unset")}\``, inline: true },
                        { name: `:incoming_envelope: __E-Mail:__`, value: `> \`${(response.email ? response.email : "Unset")}\``, inline: true },
                        { name: `**X** __Twitter:__`, value: `> \`${(response.twitter_username ? `[${response.twitter_username}](https://twitter.com/${response.twitter_username })` : "Unset")}\``, inline: true },
                        { name: `:open_file_folder: __Total Public repository:__`, value: `> [${response.public_repos}](${response.html_url}?tab=repositories)`, inline: true },
                        { name: `:busts_in_silhouette: __Follower${response.followers > 1 ? "s" : ""}:__`, value: `> `, inline: true },
                        { name: `:bust_in_silhouette: __Account created at:__`, value: `> \`${response.created_at}\``, inline: true },
                        { name: `:bust_in_silhouette: __Account edited at:__`, value: `> \`${response.updated_at}\``, inline: true },
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };
                if (response.followers > 0) {
                    try {
                        response = await fetch(response.followers_url);
                        if (response.status === 200) {
                            response = await response.json();
                            if (response.length > 5) {
                                embed.fields[12].value = `> [${response[0].login}](https://github.com/${response[0].login}), [${response[1].login}](https://github.com/${response[1].login}), [${response[2].login}](https://github.com/${response[2].login}), [${response[3].login}](https://github.com/${response[3].login}), [${response[4].login}](https://github.com/${response[4].login}), [${response[5].login}](https://github.com/${response[5].login}) & [${response.length - 5} more](https://github.com/${user}?tab=followers)`;
                            } else response.forEach((user) => {
                                embed.fields[12].value = `${embed.fields[12].value}${(embed.fields[12].value === "> " ? "" : ", ")}[${user.login}](https://github.com/${user.login})`;
                            });
                        }
                    } catch (err) { return err; }
                    
                }
                message.channel.send({ embeds: [ embed ], ephemeral: true });
            } else message.channel.send({ content: `Unable to find "${user}"`, ephemeral: true });
            if (message && message.deletable) message.delete();
        } catch(err) { return err; }
    }
}