module.exports = {
    data: {
        name: "ok",
        name_localizations: {
            "en-US": "ok",
            fr: "ok"
        },
        description: "Gives a access to the server",
        description_localizations: {
            "en-US": "Gives a access to the server",
            fr: "Donne l'accès au le serveur"
        },
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        try {
            if (!interaction.member.roles.cache.get(client.config.roles.newMember)) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "You already accepted the rule", ephemeral: true }));
                return;
            }
            interaction.member.roles.add(client.config.roles.member);
            interaction.member.roles.remove(client.config.roles.newMember);
            interaction.deleteReply().then(() => interaction.followUp({ content: "Done", ephemeral: true }));
        } catch(err) { return err; }
    }
}