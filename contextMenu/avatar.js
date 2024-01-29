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
    async execute(interaction, _, client, Discord) {
        const member = interaction.guild.members.cache.get(interaction.targetId);
        if (!member) {
            interaction.deleteReply().then(() => interaction.followUp({ content: "Unable to find the avatar of user", ephemeral: true }));
            return;
        }
        
        interaction.deleteReply().then(() => interaction.followUp({ content: `[This](${member.user.avatarURL()}) is the profile picture of ${member.user.username}`, ephemeral: true }));
    }
}