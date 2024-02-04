const data = JSON.parse(localStorage.getItem("token"));

(async () => {
    if (!data || !data.token || !data.type) return window.location.href = "/invite";
    let response = await fetch('https://discord.com/api/v10/users/@me/guilds?limit=200&with_counts=true', {
		headers: {
		    authorization: `${data.type} ${data.token}`,
		},
	});
    if (response.status !== 200) return window.location.href = "/invite";
    response = await response.json();
    response.sort((a, b) => (a.owner ? "1" : `${a.permissions}`).localeCompare((b.owner ? "1" : `${b.permissions}`)));
    response.forEach(server => {
        if (!server.owner && server.permissions !== 536211447) return;
        const card = document.createElement("a");
        card.href = `/control/guild?id=${server.id}`
        card.classList.add("guild");
        card.setAttribute("guildId", server.id);
        card.innerHTML = `
        <div class="banner"></div>
        <div>
            ${(server.icon ? `<img class="avatar" src="https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png" alt="${server.name}"></img>` : `<h3 class="avatar">${server.name.split(" ").map(letter => letter.slice(0, 1)).join("").toUpperCase()}</h3>`)}
            <div class="rank" style="background: url(/cdn/img/${(server.owner ? "owner" : (server.permissions === 536211447 ? "mod" : "member"))}.png) center/cover no-repeat #222" height="100%">
                <aria-label>Server ${(server.owner ? "Owner" : (server.permissions === 536211447 ? "Mod" : "Member"))}</aria-label>
            </div>
            </div>
            <h4 class="name">${(server.name.length > 16 ? `${server.name.slice(0, 10)}...` : server.name)}</h4>
        </div>`;
        document.querySelector("#index > #guildContainer").appendChild(card);
    });
    document.querySelector("#index > h2").innerText = `You are on ${response.length} server${(response.length > 1 ? "s" : "")}, but you can only moderate ${response.filter(server => server.owner || server.permissions === 536211447).length} of them`;
})();