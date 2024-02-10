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
            },
            {
                name: 'duration',
                name_localizations: {
                    fr: "durer",
                    "en-US": "duration"
                },
                description: 'The duration of the mute',
                description_localizations: {
                    fr: "Le temps que le membre doit être mute",
                    "en-US": "The duration of the mute"
                },
                required: true,
                type: "Number",
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let member = interaction.guild.members.cache.find((member) => member.id === interaction.options.getUser("member").id);
            if (!interaction.member.permissions.has("ModerateMembers")) {
                await interaction.deleteReply();
                interaction.followUp({ content: "You can't mute this member", ephemeral: true });
                return;
            }

            if (interaction.member.id === member.id) {
                await interaction.deleteReply();
                interaction.followUp({ content: "You can't mute yourself", ephemeral: true });
                return;
            }
            
            if (!member.manageable) {
                await interaction.deleteReply();
                interaction.followUp({ content: "I can't mute this member", ephemeral: true });
                return;
            }
            if (member.roles.cache.find(role => role.name === "mute" && role.color === 0xFF0000 && role.permissions.length === 0)) {
                await interaction.deleteReply();
                interaction.followUp({ content: "I can't mute this member cause he is already mute", ephemeral: true });
                return;
            }
            
            member.timeout(interaction.options.getNumber("duration") * 1_000);
            await interaction.deleteReply();
            interaction.followUp({ content: "This member has been muted", ephemeral: true });
        } catch(err) { return err; }
    }
}