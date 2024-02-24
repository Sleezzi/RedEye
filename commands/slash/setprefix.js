module.exports = {
    data: {
        name: "setprefix",
        name_localizations: {
            "en-US": "setprefix",
            fr: "setprefix"
        },
        description: "Change the bot prefix on this server",
        description_localizations: {
            "en-US": "Change the bot prefix on this server",
            fr: "Change le prefixe du bot sur ce serveur"
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
            await interaction.deleteReply()
            interaction.followUp({ content: "<a:no:1211019198881472622> - You do not have permission to do this", ephemeral: true });
            return;
        }
        const prefix = interaction.options.getString("prefix").replaceAll(" ", "");
        try {
            if (prefix === "!") {
                require("../../components/database").delete(`/${interaction.guild.id}/prefix`);
            } else {
                require("../../components/database").set(`/${interaction.guild.id}/prefix`, prefix);
            }
            await interaction.deleteReply()
            interaction.followUp({ content: `The prefix has been successfully updated, now it's \`${prefix}\``, ephemeral: true });
        } catch(err) { return err; }
    }
}