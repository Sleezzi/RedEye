module.exports = {
    name: "clear",
    description: "Delete messages in the channel in which the command is used",
    permissions: "ManageMessages",
    model: `clear **\`Number of messages to delete (you can use "all" to remove all message in channel)\`**`,
    category: "Core",
    cooldown: 30000,
    async execute(message, serverData, client, Discord) {
        if (!message.member.permissions.has("ManageMessages")) {
            message.reply("You do not have permission to delete messages").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        let amount = message.content.split(' ').slice(1)[0];
        if (!amount) {
            message.reply('You must specify a number of messages to delete').then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        if (amount.toLowerCase() === "all") {
            try {
                let fetchedMessages = { size: 1 };
                let messagesDeleted = 0;
                let err;
                do {
                    await message.channel.messages.fetch({ limit: 100 }).then((messages) => fetchedMessages = messages.filter((msg) => msg && 1_209_600 > ((Date.now() - msg.createdTimestamp) / 1000) && msg.id && msg.bulkDeletable && !(msg.id in fetchedMessages)));
                    try {
                        await message.channel.bulkDelete(fetchedMessages);
                        messagesDeleted += fetchedMessages.size;
                    } catch(err) { return err = err; }
                } while (fetchedMessages.size >= 2 && !err);
                message.channel.send(`Channel content delete (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`).then((msg) => setTimeout(async function() { try {msg.delete() } catch(err) { return err; } }, 5000));
                return;
            } catch(err) { return err; }
        }
        amount++;
        if (amount > 100) amount = 100;
        try {
            const messages = await message.channel.messages.fetch({ limit: amount }).then(async (messages) => {
            message.channel.bulkDelete(messages.filter((msg) => 1_209_600 > Math.floor(Date.now() - msg.createdTimestamp) / 1000))
            const msg = await message.channel.send(`Multiple Messages Deleted (${messages.filter((msg) => 1_209_600 > Math.floor(Date.now() - msg.createdTimestamp) / 1000).size - 1} message${((messages.filter((msg) => 14 < msg.createdTimestamp - Date.now()).size - 1) > 1 ? "s" : "")})`)
            setTimeout(async function() { try { msg.delete(); } catch(err) { return err; } }, 5000);}, 50);
        } catch(err) { return err; }
    }
}