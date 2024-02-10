module.exports = {
    data: {
        name: "avatar",
        name_localizations: {
            "fr": "avatar"
        },
        type: "user",
        default_permission: undefined,
        default_member_permissions: undefined,
        dm_permission: undefined
    },
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.guild.members.cache.get(interaction.targetId);
            if (!member) {
                await interaction.deleteReply();
                interaction.followUp({ content: "Unable to find the avatar of user", ephemeral: true });
                return;
            }
            
            await interaction.deleteReply();
            interaction.followUp({ content: `[This](${member.user.avatarURL()}) is the profile picture of ${member.user.username}`, ephemeral: true });
        } catch (err) { console.error(err); }
    }
}