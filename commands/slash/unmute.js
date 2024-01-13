module.exports = {
    data: {
        name: "unmute",
        name_localizations: {
            "en-US": "unmute",
            fr: "demute"
        },
        description: "Mute a member",
        description_localizations: {
            "en-US": "Unmute a member in server",
            fr: "Redonne la parole a un membre du serveur"
        },
        default_member_permissions: "ModerateMembers",
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member to unmute',
                description_localizations: {
                    fr: "Membre a qui il faut rendre la parole",
                    "en-US": "Member to unmute"
                },
                required: true,
                type: 6,
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            
            let member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);
            if (!interaction.member.permissions.has("ModerateMembers")) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "You can't unmute this member", ephemeral: true }));
                return;
            }

            if (interaction.member.id === member.id) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "You can't unmute yourself", ephemeral: true }));
                return;
            }
            
            if (!member.manageable) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "I can't unmute this member", ephemeral: true }));
                return;
            }
            if (!member.roles.cache.has(client.config.roles.mute)) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "I can't unmute this member cause he is not mute", ephemeral: true }));
                return;
            }
            member.roles.remove(client.config.roles.mute);
            interaction.deleteReply().then(() => interaction.followUp({ content: "This member has been unmuted", ephemeral: true }));
        } catch(err) { return err; }
    }
}