module.exports = {
    // name: "clean",
    description: "Delete messages in the channel in which the command is used",
    permissions: "ManageMessages",
    model: `clean`,
    category: "Core",
    cooldown: 15_000,
    async execute(message, client, Discord) {
        try {
            message.channel.sendTyping();
            if (!message.member.permissions.has("ManageMessages")) {
                const msg = await message.reply({embeds: [
                    {
                        title: ":x: - You do not have permission to delete messages",
                        color: 0xFF0000,
                        author: {
                            name: message.member.tag,
                            icon_url: message.member.user.avatarURL(),
                            url: message.url,
                        },
                        footer: {
                            text: `Id: ${message.id}`,
                            icon_url: client.user.avatarURL(),
                        },
                    }
                ]});
                setTimeout(() => {
                    try {
                        if (msg.deletable) msg.delete();
                    } catch(err) { return err; }
                }, 15000);
                return;
            }
            let messages = { size: 1};
            let kill = false;
            setTimeout(() => kill = true, 5_000);
            let messagesDeleted = 0;
            do {
                messages = await message.channel.messages.fetch({ limit: 100 }).then(messages => messages.filter((msg) => msg.member.id === client.user.id && 14 < message.createdAt - Date.now() / 1000));
                try {
                    await message.channel.bulkDelete(messages);
                } catch(err) { return err; }
                messagesDeleted += messages.size;
            } while (messages.size >= 2 && !kill);
            try { if (message && message.id) message.delete();} catch(err) { return err; }
            const msg = await message.channel.send({embeds: [
                {
                    title: `:put_litter_in_its_place: - Channel content delete (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`,
                    color: 0x00FF00,
                    author: {
                        name: message.member.tag,
                        icon_url: message.member.user.avatarURL(),
                        url: message.url,
                    },
                    footer: {
                        text: `Id: ${message.id}`,
                        icon_url: client.user.avatarURL(),
                    },
                }
            ]});
            setTimeout(() => {
                try {
                    if (msg.deletable) msg.delete();
                } catch(err) { return err; }
            }, 15000);
        } catch(err) { return err; }
    }
}