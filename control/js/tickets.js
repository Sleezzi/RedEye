import { getData, listener, removeData, setData } from "./firebase.js";

const parseDate = (timestamp) => {
    return `${(new Date(timestamp).getDate() < 10 ? `0${new Date(timestamp).getDate()}` : new Date(timestamp).getDate())}/${(new Date(timestamp).getMonth()+1 < 10 ? `0${new Date(timestamp).getMonth()+1}` : new Date(timestamp).getMonth()+1)}/${(new Date(timestamp).getFullYear() < 10 ? `0${new Date(timestamp).getFullYear()}` : new Date(timestamp).getFullYear())} ${(new Date(timestamp).getHours() < 10 ? `0${new Date(timestamp).getHours()}` : new Date(timestamp).getHours())}:${(new Date(timestamp).getMinutes() < 10 ? `0${new Date(timestamp).getMinutes()}` : new Date(timestamp).getMinutes())}`;
};
let tickets = [];

function renderTicket () {
    document.querySelector("main#tickets > section:nth-child(2) > #tickets").innerHTML = "";
    tickets.forEach((ticket, index) => {
        const ticketDiv = document.createElement("div");
        ticketDiv.setAttribute("ticket-id", ticket.id);
        ticketDiv.classList.add("ticket");
        if (ticket.status === "Done") ticketDiv.classList.add("done");
        if (ticket.status === "In progress") ticketDiv.classList.add("inProgress");
        if (ticket.hidden) ticketDiv.classList.add("hide");

        const options = document.createElement("div");
        options.classList.add("options");
        options.innerHTML = `<span class="guild">Guild:${ticket.guildId}</span><span class="username">Made by: <b>${ticket.username}</b></span><span class="type">Type: <b>${ticket.cat}</b></span><span class="madeAt">Made at: <b>${parseDate(eval(ticket.madeAt) * 1000)}</b></span>${(ticket.updatedAt ? `<span class="updatedAt">Updated at: <b>${parseDate(eval(ticket.updatedAt) * 1000)}</b></span>` : "")}`;
        ticketDiv.appendChild(options);

        const content = document.createElement("p");
        content.classList.add("content");
        content.innerText = ticket.content;
        ticketDiv.appendChild(content);

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        buttons.innerHTML = `<select id="status"><option value="done"${(ticket.status === "Done" ? " selected" : "")}>✔</option><option value="inProgress"${(ticket.status === "In progress" ? " selected" : "")}>⧗</option><option value="notDone"${(ticket.status === "Not done" ? " selected" : "")}>✘</option></select><button type="reset" id="remove"><span class="material-symbols-outlined">delete</span></button>`;
        ticketDiv.appendChild(buttons);
        
        document.querySelector("main#tickets > section:nth-child(2) > #tickets").appendChild(ticketDiv);
        
        buttons.querySelector("select#status").onchange = (e) => {
            setData(`/${ticket.guildId}/tickets/${ticket.userId}/${ticket.id}/status`, (
                e.target.value === "done" ? "Done" : (
                    e.target.value === "inProgress" ? "In progress" : "Not done"
                )
            ));
        };
        buttons.querySelector("button#remove").onclick = async () => {
            document.querySelector("main#tickets .popup-content > p").innerText = `Are you sure you wanna delete "${ticket.id}" ?`;
            document.querySelector("main#tickets section:nth-child(3)").style.display = "flex";
            document.querySelector("main#tickets #popup button.close-btn").onclick = () => {
                document.querySelector(".popup-content > button.yes").onclick = () => {};
                document.querySelector("main#tickets section:nth-child(3)").removeAttribute("style");
            }
            document.querySelector(".popup-content > button.yes").onclick = async () => {
                removeData(`/${ticket.guildId}/tickets/${ticket.userId}/${ticket.id}`)
                document.querySelector(".popup-content > button.yes").onclick = () => {};
                document.querySelector("main#tickets section:nth-child(3)").removeAttribute("style");
            };
        };
    });
};

function sort(value) {
    switch (value) {
        case "type":
            tickets.sort((a, b) => a.cat.localeCompare(b.cat));
            break;
        case "date":
            tickets.sort((a, b) => a.madeAt.localeCompare(b.madeAt));
            break;
        case "user":
            tickets.sort((a, b) => a.username.localeCompare(b.username));
            break;
        case "status":
            tickets.sort((a, b) => a.status.localeCompare(b.status));
            break;
    }
    if (document.querySelector("select#ascButtons").value === "Desc") tickets.reverse();
    renderTicket();
}

listener("/", (serversId) => {
    tickets = [];
    document.querySelector("main#tickets > section:nth-child(2) > h2").hidden = true;
    document.querySelector("select#guild").innerHTML = "<option value=\"\" selected></option>";
    document.querySelector("select#user").innerHTML = "<option value=\"\" selected></option>";
    
    for (let serverId in serversId) {
        const guildOption = document.createElement("option");
        guildOption.value = serverId;
        guildOption.innerText = serverId;
        document.querySelector("select#guild").appendChild(guildOption);

        for (const user in serversId[serverId].tickets) {
            if (!document.querySelector(`select#user > option[value="${user}"]`)) {
                const userOption = document.createElement("option");
                userOption.value = user;
                userOption.innerText = serversId[serverId].tickets[user][Object.keys(serversId[serverId].tickets[user])[0]].username;
                document.querySelector("select#user").appendChild(userOption);     
            }
            for (let ticket in serversId[serverId].tickets[user]) {
                serversId[serverId].tickets[user][ticket].id = ticket;
                serversId[serverId].tickets[user][ticket].userId = user;
                ticket = serversId[serverId].tickets[user][ticket];
                ticket.hidden = false;
                ticket.guildId = serverId;
                ticket.madeAt = `${ticket.madeAt}`;

                if (ticket.updatedAt) ticket.updatedAt = `${ticket.updatedAt}`;
                if (ticket.username.includes("<")) ticket.username = ticket.username.replace(/\</g, "‹");
                if (ticket.username.includes(">")) ticket.username = ticket.username.replace(/\>/g, "›");
                if (ticket.username.includes("=>")) ticket.username = ticket.username.replace(/\=\>/g, "➔");
                if (ticket.username.includes("->")) ticket.username = ticket.username.replace(/\-\>/g, "➔");
                if (ticket.username.includes("<-")) ticket.username = ticket.username.replace(/\<\=/g, "🡰");
                if (ticket.username.includes("<-")) ticket.username = ticket.username.replace(/\-\>/g, "🡰");
                
                if (ticket.content.includes("<")) ticket.content = ticket.content.replace(/\</g, "‹");
                if (ticket.content.includes(">")) ticket.content = ticket.content.replace(/\>/g, "›");
                if (ticket.content.includes("=>")) ticket.content = ticket.content.replace(/\=\>/g, "➔");
                if (ticket.content.includes("->")) ticket.content = ticket.content.replace(/\-\>/g, "➔");
                if (ticket.content.includes("<-")) ticket.content = ticket.content.replace(/\<\=/g, "🡰");
                if (ticket.content.includes("<-")) ticket.content = ticket.content.replace(/\-\>/g, "🡰");
                tickets.push(ticket);
            }
            sort(document.querySelector("select#sortButtons").options[document.querySelector("select#sortButtons").selectedIndex].value);
            renderTicket();
        }
    }
});


document.querySelector("select#sortButtons").onchange = (e) => {
    sort(e.target.value);
};

document.querySelector("select#ascButtons").onchange = () => {
    tickets.reverse();
    renderTicket();
}

document.querySelector("select#search").onchange = (e) => {
    document.querySelector("select#user").style.display = "none";
    document.querySelector("select#guild").style.display = "none";
    document.querySelector("select#user > option[value=\"\"]").setAttribute("selected", "selected");
    document.querySelector("select#guild > option[value=\"\"]").setAttribute("selected", "selected");
    if (e.target.value === "user") {
        document.querySelector("select#user").style.display = "flex";
    }
    if (e.target.value === "guild") {
        document.querySelector("select#guild").style.display = "flex";
    }
    if (e.target.value === "") {
        tickets.forEach(ticket => ticket.hidden = false);
        renderTicket();
    }
}

document.querySelector("select#user").onchange = (e) => {
    tickets.forEach(ticket => {
        if (e.target.value === "") {
            ticket.hidden = false;
        } else {
            if (ticket.userId === e.target.value) {
                ticket.hidden = false;
            } else ticket.hidden = true;
        }
    });
    renderTicket();
}

document.querySelector("select#guild").onchange = (e) => {
    const option = 
    tickets.forEach(ticket => {
        if (e.target.value === "") {
            ticket.hidden = false;
        } else {
            if (ticket.guildId === e.target.value) {
                ticket.hidden = false;
            } else ticket.hidden = true;
        }
    });
    renderTicket();
}