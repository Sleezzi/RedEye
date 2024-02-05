module.exports = {
    name: "clear",
    description: "Delete messages in the channel in which the command is used",
    permissions: "ManageMessages",
    model: `clear **\`Number of messages to delete (you can use "all" to remove all message in channel)\`**`,
    category: "Core",
    cooldown: 30000,
    async execute(message, client, Discord) {
        if (!message.member.permissions.has("ManageMessages")) {
            message.reply(":x: - You do not have permission to delete messages").then((msg) => setTimeout(async function() { try { msg.delete(); if (message) message.delete(); } catch(err) { return err; } }, 5000));
            return;
        }
        message.channel.sendTyping();
        let amount = message.content.split(' ').slice(1)[0];
        if (!amount) {
            const msg = await message.reply('You must specify a number of messages to delete');
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
            return;
        }
        // if (amount.toLowerCase() === "all") {
        //     try {
        //         let fetchedMessages = { size: 1 };
        //         let messagesDeleted = 0;
        //         let err;
        //         do {
        //             await message.channel.messages.fetch({ limit: 100 }).then((messages) => fetchedMessages = messages.filter((msg) => msg && 1_209_600 > ((Date.now() - msg.createdTimestamp) / 1000) && msg.id && msg.bulkDeletable && !(msg.id in fetchedMessages)));
        //             try {
        //                 await message.channel.bulkDelete(fetchedMessages);
        //                 messagesDeleted += fetchedMessages.size;
        //             } catch(err) { return err; }
        //         } while (fetchedMessages.size >= 2 && !err);
        //         const msg = await message.channel.send(`Channel content delete (${messagesDeleted} message${(messagesDeleted > 1 ? "s" : "")})`);
        //         setTimeout(async () => {
        //             try {
        //                 msg.delete();
        //             } catch(err) { return err; }
        //         }, 5000);
        //         return;
        //     } catch(err) { return err; }
        // }
        amount++;
        if (amount > 100) amount = 100;
        try {
            const messages = await message.channel.messages.fetch({ limit: amount, filter: (msg) => 1_209_600 > Math.floor(Date.now() - msg.createdTimestamp) / 1000});
            await message.channel.bulkDelete(messages);
            const msg = await message.channel.send(`:put_litter_in_its_place: - ${"Multiple "}Messages Deleted (${messages.size - 1} message${(messages.size - 1 > 1 ? "s" : "")})`);
            setTimeout(async () => {
                try {
                    msg.delete();
                } catch(err) { return err; }
            }, 5000);
        } catch(err) { return err; }
    }
}