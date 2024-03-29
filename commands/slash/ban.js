module.exports = {
    data: {
        name: "ban",
        name_localizations: {
            "en-US": "ban",
            fr: "ban"
        },
        description: "Ban a member",
        description_localizations: {
            "en-US": "Ban a member in server",
            fr: "Bannie un membre du serveur"
        },
        default_permission: undefined,
        default_member_permissions: "Ban",
        dm_permission: undefined,
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member to ban',
                description_localizations: {
                    fr: "Membre à bannir",
                    "en-US": "Member to ban"
                },
                required: true,
                type: 6,
            },
            {
                name: 'duration',
                name_localizations: {
                    fr: "durée",
                    "en-US": "duration"
                },
                description: 'The duration of the ban (in sec)',
                description_localizations: {
                    fr: "La durée du bannisement (en seconde)",
                    "en-US": "The duration of the ban (in sec)"
                },
                required: true,
                type: 3,
            },
            {
                name: 'reason',
                name_localizations: {
                    fr: "raison",
                    "en-US": "reason"
                },
                description: 'The reason for the ban',
                description_localizations: {
                    fr: "La raison du bannissement",
                    "en-US": "The reason for the ban"
                },
                required: false,
                type: 3,
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);

            if (!interaction.member.permissions.has("BanMembers")) {
                await interaction.deleteReply();
                interaction.followUp({ content: 'You cannot ban a member from the server', ephemeral: true });
                return;
            }
            if (!member) {
                await interaction.deleteReply();
                interaction.followUp({ content: "Please mention a valid member.", ephemeral: true });
                return;
            }
            if (interaction.member.id === member.id) {
                await interaction.deleteReply();
                interaction.followUp({ content: "You cannot ban yourself from the server", ephemeral: true });
                return;
            }
            if (!member.bannable) {
                await interaction.deleteReply();
                interaction.followUp({ content: "I can't ban this member", ephemeral: true });
                return;
            }

            let duration = interaction.options.getString("duration");
            let reason = interaction.options.getString("reason");

            if (!duration) {
                duration = "Perm";
            } else duration = duration;

            if (duration == "Perm") {
                await member.ban({ reason: `Reason: "${reason}", ban by: ${interaction.member.user.tag}` });
                await interaction.deleteReply();
                interaction.followUp({ content: `${member.user.tag} was successfully banned for the following reason: \`${(reason ? reason: "No reason specified")}\``, ephemeral: true });
            } else {
                await member.ban({ reason: `Reason: "${reason}", ban by: ${interaction.member.user.tag}`, expiresIn: duration });
                await interaction.deleteReply();
                interaction.followUp({ content: `${member.user.tag} was successfully banned for the following reason: \`${(reason ? reason : "No reason specified")}\` and for a period of \`${duration}s\``, ephemeral: true });
            }
        } catch(err) { return err; }
    }
}