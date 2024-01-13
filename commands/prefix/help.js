module.exports = {
    name: "help",
    description: "",
    category: "Information",
    cooldown: 10000,
    async execute(message, serverData, client, Discord) {
        try {
            message.channel.sendTyping();
            let command = message.content.split(' ').slice(1)[0];
            if (command && command !== "help") {
                if (!client.data.commands.prefix.has(command)) {
                    message.channel.send({ content: `${command} is not a command.` }).then((msg) => {if (message && message.deletable) message.delete(); setTimeout(function() {msg.delete()}, 5000)});
                    return;
                }
                command = client.data.commands.prefix.find((n) => n.name === command);


                const embed = new Discord.EmbedBuilder()
                    .setColor("Aqua")
                    .setTitle("Help:")
                    .setDescription(`*${client.config.prefix}${command.name}*`)
                    .setAuthor({ name: message.member.user.tag, iconURL: message.member.user.avatarURL(), url: message.url })
                    .addFields(
                        { name: "__**Name:**__", value: `**\`${command.name}\`**`},
                        { name: "__**Description:**__", value: `**\`${command.description}\`**`},
                        { name: "__**Can be used:**__", value: `${(command.permissions !== undefined ? (command.permissions === "Owner" && message.member.id === "542703093981380628" ? ":white_check_mark:" : (message.member.permissions.has(command.permissions) ? ":white_check_mark:" : ":x:")) : ":white_check_mark:")}`},
                        { name: "__**How to use:**__", value: `${client.config.prefix}${command.model}`},
                        { name: "__**Date:**__", value: `<t:${Math.floor(message.createdTimestamp / 1000)}:d> (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`},
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
                        { name: `__Prefix:__`, value: `> \`${client.config.prefix}\``, inline: false },
                        { name: `__Bot made by:__`, value: `> ${message.guild.members.cache.get(client.config.ownerId).user.username}`, inline: false },
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
                
                let reply = await message.channel.send({ embeds: [ mainEmbed ], components: [ row ], ephemeral: true });
                let collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: (i) => i.user.id === message.author.id, time: 120_000 });
                
                collector.on("collect", async (interaction) => {
                    await interaction.deferReply();
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
                        try {
                            reply.edit({ embeds: [ mainEmbed ], omponents: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    if (interaction.customId === "Core") {
                        Core.setStyle(Discord.ButtonStyle.Success);
                        
                        Core.setDisabled(true);
                        try {
                            reply.edit({ embeds: [ coreEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    if (interaction.customId === "Fun") {
                        Fun.setStyle(Discord.ButtonStyle.Success);

                        Fun.setDisabled(true);
                        try {
                            reply.edit({ embeds: [ funEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }

                    if (interaction.customId === "Info") {
                        Info.setStyle(Discord.ButtonStyle.Success);

                        Info.setDisabled(true);
                        try {
                            reply.edit({ embeds: [ infoEmbed ], components: [ row ], ephemeral: true });
                        } catch(err) { return err; }
                    }
                    collector = reply.createMessageComponentCollector({ componentType: Discord.ComponentType.Button, filter: (i) => i.user.id === message.member.id, time: 120_000 });
                    interaction.followUp({ content: "Please wait...", ephemeral: true }).then((msg) => { if (msg && msg.deletable) msg.delete(); });
                });
                setTimeout(function() { if (reply) reply.delete() }, 120_000);
            }        
            if (message && message.deletable) message.delete();
        } catch(err) {
            console.error(err);
        }
    }
}