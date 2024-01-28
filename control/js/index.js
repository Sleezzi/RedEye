const data = JSON.parse(localStorage.getItem("token"));
// const firebase = require("firebase");
// require('firebase/database');

// listener("/", (servers) => {
//     if (Object.keys(servers).length === 0) return;
//     document.querySelector("#control-panel #serversCounter").innerText = `Guild${(Object.keys(servers).length > 1 ? "s" : "")}: ${Object.keys(servers).length}`;
//     let members = [];
//     for (const server in servers) {
//         for (const member in servers[server].levels) {
//             if (members.find(m => m === member)) continue;
//             members.push(member);
//         }
//     }
//     document.querySelector("#control-panel #membersCounter").innerText = `Member${(members.length > 1 ? "s" : "")}: ${members.length}`;
// });

async function withServer(id) {
    document.querySelector("#index > #withoutGuild").style.display = "none";
    document.querySelector("#index > #withGuild").style.display = "flex";
    let response = await fetch(`https://discord.com/api/guilds/${id}/preview`, {
		headers: {
		    authorization: `${data.type} ${data.token}`,
		},
	});
    if (response.status !== 200) return;
    response = await response.json();
    console.log(response);
}

async function withoutServer() {
    let response = await fetch('https://discord.com/api/users/@me/guilds?limit=200&with_counts=true', {
		headers: {
		    authorization: `${data.type} ${data.token}`,
		},
	});
    if (response.status !== 200) return;
    response = await response.json();
    response.sort((a, b) => (a.owner ? "1" : `${a.permissions}`).localeCompare((b.owner ? "1" : `${b.permissions}`)));
    response.forEach(server => {
        if (!server.owner && server.permissions !== 536211447) return;
        const card = document.createElement("a");
        card.href = `./index.html?guild=${server.id}`
        card.classList.add("guild");
        card.setAttribute("guildId", server.id);
        card.innerHTML = `<div class="banner"></div>
        <div>
            <div>
                ${(server.icon ? `<img class="avatar" src="https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png" alt="${server.name}"></img>` : `<h3 class="avatar">${server.name.split(" ").map(letter => letter.slice(0, 1)).join("")}</h3>`)}
            </div>
                <div class="rank"><img src="../img/${(server.owner ? "owner" : (server.permissions === 536211447 ? "mod" : "member"))}.png" alt="${(server.owner ? "Owner" : (server.permissions === 536211447 ? "Mod" : "Member"))}" height="100%"></div>
            </div>
            <h4 class="name">${(server.name.length > 17 ? `${server.name.slice(0, 14)}...` : server.name)}</h4>
        </div>`;
        document.querySelector("#index > #withoutGuild > #guildContainer").appendChild(card);
    });
    document.querySelector("#index > #withoutGuild > h2").innerText = `You are on ${response.length} server${(response.length > 1 ? "s" : "")}`;
}

(async () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("guild")) {
        withServer(params.get("guild"));
        return;
    } else {
        withoutServer();
        return;
    }
})();