module.exports = {
    name: "help",
    description: "Show you the help menu",
    model: "help *\`command\`*",
    category: "Misc",
    cooldown: 10000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            const serverData = await require("../../components/database").get(`/${message.guild}`);

            let command = message.content.split(' ').slice(1)[0];
            if (command && command !== "help") {
                if (!client.commands.prefix.has(command)) {
                    const msg = await message.channel.send({ content: `${command} is not a command.` });
                    if (message.deletable) message.delete();
                    setTimeout(() => {
                        try {
                            msg.delete();
                        } catch (err) {
                            return err;
                        }
                    }, 5000);
                    return;
                }
                command = client.commands.prefix.find((n) => n.name === command);
                const embed = new Discord.EmbedBuilder()
                    .setColor("Aqua")
                    .setTitle("Help:")
                    .setDescription(`*${serverData.prefix ?? "!"}${command.name}*`)
                    .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.avatarURL(), url: message.url })
                    .addFields(
                        { name: "<:nametag:1200757678104915978> - __**Name:**__", value: `**\`${command.name}\`**`},
                        { name: ":book:・__**Description:**__", value: `**\`${command.description}\`**`},
                        { name: ":unlock:・__**Can be used:**__", value: `${(command.permissions !== undefined ? (command.permissions === "Owner" && message.member.id === client.ownerId ? "<a:yes:1205984539852144751>" : (message.member.permissions.has(command.permissions) ? "<a:yes:1205984539852144751>" : "<a:no:1211019198881472622>")) : "<a:yes:1205984539852144751>")}`},
                        { name: ":question:・__**How to use:**__", value: `${serverData.prefix ?? "!"}${command.model}`},
                        { name: "<:time:1205987554260684870> - __**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
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
                        { name: `:keyboard:・__Prefix:__`, value: `> \`${(serverData.prefix || "!")}\``, inline: false },
                        { name: `:robot:・__Bot made by:__`, value: `> [Sleezzi](https://sleezzi.fr/)`, inline: false },
                        { name: `<:time:1205987554260684870> - __Date:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`, inline: true },
                        { name: `<:time:1205987554260684870> - __End in:__`, value: `> <t:${Math.floor(message.createdTimestamp / 1000 + 120)}:d> (<t:${Math.floor(message.createdTimestamp / 1000 + 120)}:R>)`, inline: true },
                    ],
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                };

                const moderationEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Moderation',
                    author: {
                        name: message.author.tag,
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

                const gameEmbed = {
                    color: 0x0099ff,
                    title: 'Help • Game',
                    author: {
                        name: message.author.tag,
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
                        name: message.author.tag,
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
                
                for (const command of client.commands.prefix) {
                    if (serverData.disabled.find(cmd => cmd === command[0])) continue;
                    if (!command.permissions) {
                        if (command[1].category === "Moderation") {
                            moderationEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Games") {
                            gameEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Misc") {
                            miscEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (command.permissions === "Owner" && message.member.id === client.ownerId) {
                        if (command[1].category === "Moderation") {
                            moderationEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Games") {
                            gameEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Misc") {
                            miscEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        }
                    } else if (message.member.permissions.has(command.permissions)) {
                        if (command[1].category === "Moderation") {
                            moderationEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Games") {
                            gameEmbed.fields.unshift({ name: `__**${command[0]}:**__`, value: `**\`${(command[1].description !== "" ? command[1].description : "This command doesn't have a description")}\`**`})
                        } else if (command[1].category === "Misc") {
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
                        label: 'Moderation',
                        value: 'moderation',
                    },
                    {
                        label: 'Misc',
                        value: 'misc',
                    },
                    {
                        label: 'Game',
                        value: 'game',
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
                    if (interaction.values[0] === "moderation") {
                        try {
                            reply.edit({ embeds: [ moderationEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    if (interaction.values[0] === "game") {
                        try {
                            reply.edit({ embeds: [ gameEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }

                    if (interaction.values[0] === "misc") {
                        try {
                            reply.edit({ embeds: [ miscEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.StringSelect, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                    const msg = await interaction.followUp({ content: "<a:loading:1204754788055646218> - Please wait...", ephemeral: true })
                    if (msg && msg.deletable) msg.delete();
                });
                setTimeout(() => { try { if (reply && reply.id) reply.delete(); } catch (err) { return; }  }, 120_000);
            }        
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}