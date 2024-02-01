let data = JSON.parse(localStorage.getItem("guilds"));
const params = new URLSearchParams(window.location.search);

if (params.get("guild")) {
    document.querySelector("#guildId").value = params.get("guild");
}

document.querySelector("#index > #login button#submit").onclick = () => {
    if (!data) data = {};
    data[document.querySelector("#guildId").value] = document.querySelector("#password").value;
    localStorage.setItem("guilds", JSON.stringify(data));
    window.location.href = `/control/guild?id=${document.querySelector("#guildId").value}`;
}