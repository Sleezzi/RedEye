import { getData } from "./firebase.js";

async function withServer(id) {
    const levelsData = await getData(`/${id}/levels`);

    if (Object.keys(levelsData).length === 0) return;
    document.querySelector("main#levels > section > h2").style.display = "none";
    const datasets = [];
    const labels = [];
    for (const user in levelsData) {
        labels.push(user);
        datasets.push({
            label: user,
            data: [levelsData[user].level]
        })
    }
    new Chart(document.querySelector("main#levels > section > canvas").getContext("2d"), {
        type: "bar",
        data: {
            labels: [" "],
            datasets: datasets
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            layout: {
                borderWidth: 1
            }
        }
    });
}

async function withoutServer() {
    const serversData = await getData(`/`);

    if (Object.keys(serversData).length === 0) return;
    document.querySelector("main#levels > section > h2").style.display = "none";
    document.querySelector("main#levels #levelsContainer").style.display = "block";
    for (const serverData in serversData) {
        const server = document.createElement("a");
        server.classList.add("server");
        server.setAttribute("guild", serverData);
        server.href = `./levels?guild=${serverData}`;
        server.innerHTML = `<div style="height: 118px; width: 118px; display: flex; justify-content: center; align-items: center;"><img src="${(serversData[serverData].icon ? `https://cdn.discordapp.com/icons/${serverData}/${serversData[serverData].icon}.png?size=128` : "")}" style="height: 90%; width: 90%; border-radius: 1vh;" alt="${serversData[serverData].name}"></img></div><div style="display: flex; flex-direction: column; justify-content: center; aligne-items: center; height: 100%; width: 100%;"><span>Id: <b>${serverData}</b></span><span>Name: <b>${serversData[serverData].name}</b></span><span>Members: <b>${(serversData[serverData].levels ? Object.keys(serversData[serverData].levels).length : 0)}</b></span></div>`;
        document.querySelector("main#levels #levelsContainer").appendChild(server);
    }
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