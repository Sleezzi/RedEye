module.exports = {
    data: {
        name: "pic",
        name_localizations: {
            "en-US": "pic",
            fr: "pdp"
        },
        description: "Displays a member's profile picture",
        description_localizations: {
            "en-US": "Displays a member's profile picture",
            fr: "Affiche la photo de profil d'un membre"
        },
        options: [
            {
                name: 'member',
                name_localizations: {
                    fr: "membre",
                    "en-US": "member"
                },
                description: 'Member',
                description_localizations: {
                    fr: "Membre",
                    "en-US": "Member"
                },
                required: false,
                type: 6,
            }
        ],
        nsfw: false
    },
    async execute(interaction, client, Discord) {
        try {
            let member = interaction.guild.members.cache.find((m) => m.id === (interaction.options.getUser("member") ? interaction.options.getUser("member") : interaction.member).id) ?? interaction.member;
            await interaction.deleteReply();
            interaction.followUp({ content: `[Picture of ${member.user.username}](${(member.user.avatarURL() ? member.user.avatarURL() : "https://discord.com/assets/c722e74f644b4a758b11.png")})`, ephemeral: true });
        } catch(err) { return err; }
    }
}