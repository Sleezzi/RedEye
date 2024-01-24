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
            if (member.roles.cache.find(role => role.name === "mute" && role.color === 0xFF0000 && role.permissions.length === 0)) {
                interaction.deleteReply().then(() => interaction.followUp({ content: "I can't mute this member cause he is already mute", ephemeral: true }));
                return;
            }
            // if (interaction.guild)
            const role = await interaction.guild.roles.create({
                name: "mute",
                color: 0xFF0000,
                permissions: [],
                position: interaction.guild.roles.cache.find(role => role.name === client.user.username && interaction.guild.members.cache.get(client.user.id).roles.cache.has(role.id)).position-1 || 1
            });
            member.roles.add(role.id);
            interaction.deleteReply().then(() => interaction.followUp({ content: "This member has been muted", ephemeral: true }));
        } catch(err) { return err; }
    }
}