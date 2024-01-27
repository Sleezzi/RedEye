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
    async execute(message, serverData, client, Discord) {
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

                const Main = new Discord.ButtonBuilder()
                .setLabel("Main")
                .setStyle(Discord.ButtonStyle.Success)
                .setCustomId("Main")
                .setDisabled(true);

                const Core = new Discord.ButtonBuilder()
                .setLabel("Core")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("Core");

                const Fun = new Discord.ButtonBuilder()
                .setLabel("Fun")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("Fun");

                const Info = new Discord.ButtonBuilder()
                .setLabel("Info")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("Info");

                const row = new Discord.ActionRowBuilder().addComponents(Main, Core, Fun, Info);
                const reply = await message.followUp({ embeds: [ mainEmbed], components: [ row ], ephemeral: true });
                let collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                
                collector.on("collect", async (interaction) => {
                    Main.setStyle(Discord.ButtonStyle.Primary);
                    Core.setStyle(Discord.ButtonStyle.Primary);
                    Fun.setStyle(Discord.ButtonStyle.Primary);
                    Info.setStyle(Discord.ButtonStyle.Primary);

                    Main.setDisabled(false);
                    Core.setDisabled(false);
                    Fun.setDisabled(false);
                    Info.setDisabled(false);
                    if (interaction.customId === "Main") {
                        Main.setStyle(Discord.ButtonStyle.Success);

                        Main.setDisabled(true);
                        try {reply.edit({ embeds: [ mainEmbed ], omponents: [ row ], ephemeral: true });} catch(err) { return err; }
                    }
                    if (interaction.customId === "Core") {
                        Core.setStyle(Discord.ButtonStyle.Success);
                        
                        Core.setDisabled(true);
                        try {reply.edit({ embeds: [ coreEmbed ], components: [ row ], ephemeral: true });} catch(err) { return err; }
                    }
                    if (interaction.customId === "Fun") {
                        Fun.setStyle(Discord.ButtonStyle.Success);

                        Fun.setDisabled(true);
                        try {reply.edit({ embeds: [ funEmbed ], components: [ row ], ephemeral: true });} catch(err) { return err; }
                    }

                    if (interaction.customId === "Info") {
                        Info.setStyle(Discord.ButtonStyle.Success);

                        Info.setDisabled(true);
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