module.exports = {
    data: {
        name: "kick",
        name_localizations: {
            "en-US": "kick",
            fr: "kick"
        },
        description: "Kick a member",
        description_localizations: {
            "en-US": "Kick a member in server",
            fr: "Expulse un membre du serveur"
        },
        default_permission: undefined,
        default_member_permissions: "ManageMembers",
        dm_permission: undefined,
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member to kick',
                description_localizations: {
                    fr: "Membre à expulser",
                    "en-US": "Member to kick"
                },
                required: true,
                type: 6,
            },
            {
                name: 'reason',
                name_localizations: {
                    fr: "raison",
                    "en-US": "reason"
                },
                description: 'The reason for the kick',
                description_localizations: {
                    fr: "La raison de l'expuslement",
                    "en-US": "The reason for the kick"
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

            if (!interaction.member.permissions.has("ModerateMembers")) return interaction.deleteReply().then(() => interaction.followUp({ content: 'You cannot kick a member from the server', ephemeral: true }));
            if (!member) return interaction.deleteReply().then(() => interaction.followUp({ content: "Please mention a valid member.", ephemeral: true }));
            if (interaction.member.id === member.id) return interaction.deleteReply().then(() => interaction.followUp({ content: "You cannot kick yourself from the server", ephemeral: true }));
            if (!member.bannable) return interaction.deleteReply().then(() => interaction.followUp({ content: "I can't kick this member", ephemeral: true }));

            let reason = interaction.options.getString("reason");

            await member.kick({ reason: `Reason: "${reason}", kick by: ${interaction.member.user.tag}` })
            interaction.deleteReply().then(() => interaction.followUp({ content: `**${member.user.tag}** was successfully kicked for the following reason: \`${(reason ? reason: "No reason specified")}\``, ephemeral: true }));
        } catch(err) { return err; }
    }
}