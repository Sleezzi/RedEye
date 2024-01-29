module.exports = {
    data: {
        name: "help",
        name_localizations: {
            "en-US": "help",
            fr: "aide"
        },
        description: "This command doesn't have a description",
        description_localizations: {
            "en-US": "This command doesn't have a description",
            fr: "Ouvre le menu d'aide"
        },
        default_permission: undefined,
        default_member_permissions: undefined,
        dm_permission: undefined,
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
                if (!client.data.commands.app.array.find((c) => c.name === command)) {
                    message.followUp({ content: `/${command} is not a command.`, ephemeral: true });
                    return;
                }
                command = client.data.commands.app.array.find((c) => c.name === command);
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
                        { name: "__**Name:**__", value: `**\`${command.name}\`**`},
                        { name: "__**Description:**__", value: `**\`${command.description}\`**`},
                        { name: "\u200B", value: `__**Options:**__`},
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
                embed.fields.push({ name: ":hourglass: __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`});     
                message.deleteReply().then(() => message.followUp({ embeds: [embed], ephemeral: false }));
            } else {
                const mainEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Main',
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true},
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
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true},
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
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
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true},
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };

                const infoEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Information',
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true},
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };
                
                for (const command of client.data.commands.prefix) {
                    if (!command.permissions) {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Information") {
                            infoEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (command.permissions === "Owner" && message.member.id === "542703093981380628") {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Information") {
                            infoEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (message.member.permissions.has(command.permissions)) {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Information") {
                            infoEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
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
                        label: 'Info',
                        value: 'info',
                    },
                    {
                        label: 'Fun',
                        value: 'fun',
                    }
                ]);
                
                const row = new Discord.ActionRowBuilder().addComponents(select);
                
                const reply = await message.followUp({ embeds: [ mainEmbed], components: [ row ], ephemeral: true });
                let collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                
                collector.on("collect", async (interaction) => {
                    if (interaction.customId === "Main") {
                        try {reply.edit({ embeds: [ mainEmbed ], omponents: [ row ], ephemeral: true });} catch(err) { return err; }
                    }
                    if (interaction.customId === "Core") {
                        try {reply.edit({ embeds: [ coreEmbed ], components: [ row ], ephemeral: true });} catch(err) { return err; }
                    }
                    if (interaction.customId === "Fun") {
                        try {reply.edit({ embeds: [ funEmbed ], components: [ row ], ephemeral: true });} catch(err) { return err; }
                    }

                    if (interaction.customId === "Info") {
                        try {message.deleteReply().then(() => reply.edit({ embeds: [ infoEmbed ], components: [ row ], ephemeral: true }));} catch(err) { return err; }
                    }
                    collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                    const result = await interaction.reply({ content: "Please wait...", ephemeral: true });
                    result.delete();
                });
                setTimeout(function() { if (reply) reply.delete() }, 120_000);
            }
        } catch(err) { return err; }
    }
}

module.exports = {
    name: "help",
    description: "",
    category: "Information",
    cooldown: 10000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            let command = message.content.split(' ').slice(1)[0];
            if (command && command !== "help") {
                if (!client.data.commands.prefix.has(command)) {
                    message.channel.send({ content: `${command} is not a command.` }).then((msg) => {if (message && message.deletable) message.delete(); setTimeout(function() {msg.delete()}, 5000)});
                    return;
                }
                command = client.data.commands.prefix.find((n) => n.name === command);

                const serverData = await require("../../components/database").get(`/${message.guild}`, client)

                const embed = new Discord.EmbedBuilder()
                    .setColor("Aqua")
                    .setTitle("Help:")
                    .setDescription(`*${serverData.prefix ?? "!"}${command.name}*`)
                    .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.avatarURL(), url: message.url })
                    .addFields(
                        { name: "<:nametag:1200757678104915978> __**Name:**__", value: `**\`${command.name}\`**`},
                        { name: ":book: __**Description:**__", value: `**\`${command.description}\`**`},
                        { name: ":unlock: __**Can be used:**__", value: `${(command.permissions !== undefined ? (command.permissions === "Owner" && message.member.id === "542703093981380628" ? ":white_check_mark:" : (message.member.permissions.has(command.permissions) ? ":white_check_mark:" : ":x:")) : ":white_check_mark:")}`},
                        { name: ":question: __**How to use:**__", value: `${serverData.prefix ?? "!"}${command.model}`},
                        { name: ":hourglass: __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
                    )
                    .setURL(message.url)
                    .setFooter({ text: `Id: ${message.id}`, iconURL: client.user.avatarURL() });        
                message.channel.send({ embeds: [embed], ephemeral: false });
            } else {
                const mainEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Main',
                    author: {
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `__Prefix:__`, value: `> \`${(serverData.prefix || "!")}\``, inline: false },
                        { name: `__Bot made by:__`, value: `> [Sleezzi](https://tv-sleezzi.web.app/)`, inline: false },
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true },
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true },
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
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true},
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
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true},
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };

                const infoEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Information',
                    author: {
                        name: message.author.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    fields: [
                        { name: `__Date of creation:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true},
                        { name: `__End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 40)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 40)}:R>)`, inline: true},
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
                        } else if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Information") {
                            infoEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (command.permissions === "Owner" && message.member.id === "542703093981380628") {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Information") {
                            infoEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (message.member.permissions.has(command.permissions)) {
                        if (command[1].category === "Core") {
                            coreEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Fun") {
                            funEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Information") {
                            infoEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
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
                        label: 'Info',
                        value: 'info',
                    },
                    {
                        label: 'Fun',
                        value: 'fun',
                    }
                ]);

                const row = new Discord.ActionRowBuilder().addComponents(select);
                
                let reply = await message.channel.send({ embeds: [ mainEmbed ], components: [ row ], ephemeral: true });
                let collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.StringSelect, filter: (i) => i.user.id === message.author.id && i.customId === "Commands type" });
                
                collector.on("collect", async (interaction) => {
                    await interaction.deferReply();
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

                    if (interaction.values[0] === "info") {
                        try {
                            reply.edit({ embeds: [ infoEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.StringSelect, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                    interaction.followUp({ content: "Please wait...", ephemeral: true }).then((msg) => { if (msg && msg.deletable) msg.delete(); });
                });
                setTimeout(function() { try { if (reply && reply.id) reply.delete(); } catch (err) { return; }  }, 120_000);
            }        
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}