module.exports = {
    name: "ClientLeaveHandler",
    event: "GuildDelete",
    type: "on",
    async execute([guild], serverData, client, Discord) {
        require("../components/database").delete(`/${guild.id}`, client);
        require("../components/log")(`${client.user.username} has been removed in "${guild.name}" (${guild.id})`)
    }
}