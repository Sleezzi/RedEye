module.exports = {
    data: {
        name: "setprefix",
        name_localizations: {
            "en-US": "setprefix",
            fr: "setprefix"
        },
        description: "Send you in private message the rules of the server",
        description_localizations: {
            "en-US": "Send you in private message the rules of the server",
            fr: "Envoie les règles du serveur"
        },
        options: [
            {
                name: 'prefix',
                name_localizations: {
                    fr: "prefix",
                    "en-US": "prefix"
                },
                description: 'Send to a member',
                description_localizations: {
                    fr: "Envoyer a un membre",
                    "en-US": "Send to a member"
                },
                required: true,
                type: "string",
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        if (!interaction.member.permissions.has("Administrator")) {
            interaction.deleteReply().then(() => interaction.followUp({ content: "You do not have permission to do this", ephemeral: true }));
            return;
        }
        const prefix = interaction.options.getString("prefix").replaceAll(" ", "");
        try {
            if (prefix === "!") {
                require("../../components/database").delete(`/${interaction.guild.id}/prefix`, client);
            } else {
                require("../../components/database").set(`/${interaction.guild.id}/prefix`, prefix, client);
            }
            interaction.deleteReply().then(() => interaction.followUp({ content: `The prefix has been successfully updated, now it's \`${prefix}\``, ephemeral: true }));
        } catch(err) { return err; }
    }
}