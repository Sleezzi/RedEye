module.exports = {
    name: "ClientLeaveHandler",
    event: "GuildDelete",
    type: "on",
    async execute([guild], client, Discord) {
        require("../components/database").delete(`/${guild.id}`);
        require("../components/log")(`${client.user.username} has been removed in %aqua%${guild.name}%reset% (%gray%${guild.id}%reset%)`)
    }
}