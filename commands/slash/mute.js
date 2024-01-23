module.exports = {
    data: {
        name: "mute",
        name_localizations: {
            "en-US": "mute",
            fr: "mute"
        },
        description: "Mute a member",
        description_localizations: {
            "en-US": "Mute a member in server",
            fr: "Rend muet un membre du serveur"
        },
        default_member_permissions: "ModerateMembers",
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member to mute',
                description_localizations: {
                    fr: "Membre a rendre muet",
                    "en-US": "Member to mute"
                },
                required: true,
                type: 6,
            }
        ],
        nsfw: false
    },
    async execute(interaction, serverData, client, Discord) {
        try {
            
            let member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);
            if (!interaction.member.permissions.has("ModerateMembers")) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "You can't mute this member", ephemeral: true }));
                return;
            }

            if (interaction.member.id === member.id) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "You can't mute yourself", ephemeral: true }));
                return;
            }
            
            if (!member.manageable) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "I can't mute this member", ephemeral: true }));
                return;
            }
            if (member.roles.cache.has(client.config.roles.mute)) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "I can't mute this member cause he is already mute", ephemeral: true }));
                return;
            }
            member.roles.add(client.config.roles.mute);
            interaction.deleteReply().then(() => interaction.followUp({ content: "This member has been muted", ephemeral: true }));
        } catch(err) { return err; }
    }
}