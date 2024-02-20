module.exports = {
    data: {
        name: "help",
        name_localizations: {
            "en-US": "help",
            fr: "aide"
        },
        description: "Shows you the help menu",
        description_localizations: {
            "en-US": "Shows you the help menu",
            fr: "Ouvre le menu d'aide"
        },
        options: [
            {
                name: 'command',
                name_localizations: {
                    fr: "commande",
                    "en-US": "command"
                },
                description: 'Which command do you need help with?',
                description_localizations: {
                    fr: "Tu as besoin d'aide sur quelle commande ?",
                    "en-US": "Which command do you need help with?"
                },
                required: false,
                type: 3,
                choices: []
            }
        ],
        nsfw: false
    },
    async execute(message, client, Discord) {
        try {
            let command = message.options.getString("command");
            if (command) {
                if (!client.data.commands.app.get(command)) {
                    await message.deleteReply();
                    message.followUp({ content: `/${command} is not a command.`, ephemeral: true });
                    return;
                }
                command = client.data.commands.app.get(command).data;
                let embed = {
                    color: 0x0099ff,
                    title: 'Help',
                    description: `*/${command.name}*`,
                    author: {
                        name: message.member.user.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url
                    },
                    fields: [
                        { name: "<:nametag:1200757678104915978> - __**Name:**__", value: `**\`${command.name}\`**`},
                        { name: ":book: - __**Description:**__", value: `**\`${command.description}\`**`},
                        { name: ":gear: - __**Options:**__", value: `\u200B`},
                    ],
                    url: message.url,
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL()
                    },
                };
                command.options.forEach((option) => {
                    embed.fields.push({
                        name: `\`${option.name}\` (${option.required ? "required" : "optional"})`,
                        value: option.description,
                        inline: true
                    });
                });
                embed.fields.push({ name: "<:time:1205987554260684870> - ____**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`});     
                await message.deleteReply()
                message.followUp({ embeds: [embed], ephemeral: true });
            } else {
                let serverData = await require("../../components/database").get(`/${message.guild.id}`, client);
                const mainEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Main',
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `:keyboard: - __Prefix:__`, value: `> \`${(serverData.prefix || "!")}\``, inline: false },
                        { name: `:robot: - __Bot made by:__`, value: `> [Sleezzi](https://sleezzi.fr/)`, inline: false },
                        { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true },
                        { name: `<:time:1205987554260684870> - __End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true },
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };

                const coreEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Core',
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `<:time:1205987554260684870> - __End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };

                const funEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Fun',
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `<:time:1205987554260684870> - __End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };

                const miscEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Misc',
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `<:time:1205987554260684870> - __End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };
                if (!serverData.disabled) serverData.disabled = [];
                
                for (const command of client.data.commands.prefix) {
                    if (serverData.disabled.find(cmd => cmd === command[0])) continue;
                    if (!command.permissions) {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                        if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                        if (command[1].category === "Misc") {
                            miscEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (command.permissions === "Owner" && message.member.id === client.ownerId) {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                        if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                        if (command[1].category === "Misc") {
                            miscEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (message.member.permissions.has(command.permissions)) {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                        if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                        if (command[1].category === "Misc") {
                            miscEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    }
                }
                const select = new Discord.StringSelectMenuBuilder()
                .setCustomId('Commands type')
                .setPlaceholder('Select the type of the command')
                .addOptions([
                    {
                        label: 'Main',
                        value: 'main',
                        default: true
                    },
                    {
                        label: 'Core',
                        value: 'core',
                    },
                    {
                        label: 'Misc',
                        value: 'misc',
                    },
                    {
                        label: 'Fun',
                        value: 'fun',
                    }
                ]);

                const row = new Discord.ActionRowBuilder().addComponents(select);
                await message.deleteReply();
                let reply = await message.reply({ embeds: [ mainEmbed ], components: [ row ], ephemeral: true });
                let collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.StringSelect, filter: (i) => i.user.id === message.author.id && i.customId === "Commands type" });
                
                collector.on("collect", async (interaction) => {
                    const msg = await interaction.followUp({ content: "<a:loading:1204754788055646218> - Please wait...", ephemeral: true })
                    if (interaction.values[0] === "main") {
                        try {
                            reply.edit({ embeds: [ mainEmbed ], omponents: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    if (interaction.values[0] === "core") {
                        try {
                            reply.edit({ embeds: [ coreEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    if (interaction.values[0] === "fun") {
                        try {
                            reply.edit({ embeds: [ funEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    
                    if (interaction.values[0] === "misc") {
                        try {
                            reply.edit({ embeds: [ miscEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.StringSelect, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                    if (msg && msg.deletable) msg.delete();
                });
            }
        } catch(err) { return err; }
    }
}