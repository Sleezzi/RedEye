let data = JSON.parse(localStorage.getItem("guilds"));
const params = new URLSearchParams(window.location.search);

(async () => {
    if (!data || !data[params.get("id")]) {
        window.location.href = `/control/login?guild=${params.get("id")}`;
        return;
    }
    document.querySelector("section#core > div > input").oninput = (e) => {
        e.target.value = e.target.value.replace(/\@|\#|\n|\ /g, "");
        if (e.target.value.length > 3) e.target.value = e.target.value?.slice(0, 3);
        document.querySelector("section#core p[name=\"clear\"").innerText = `${e.target.value}clear 5`;
        document.querySelector("section#core p[name=\"help\"").innerText = `${e.target.value}help`;
        document.querySelector("section#core p[name=\"about\"").innerText = `${e.target.value}about`;
        document.querySelector("section#core p[name=\"ban\"").innerText = `${e.target.value}ban @user`;
        document.querySelector("section#core p[name=\"image\"").innerText = `${e.target.value}image dog`;
    }

    let response = await fetch("/commands.json", { method: "GET" });
    if (response.status === 200) {
        response = await response.json();
        for (const command in response) {
            const container = document.createElement("div");
            container.setAttribute("name", command);

            const name = document.createElement("div");
            name.classList.add("name");
            name.innerHTML = `<p>${command}</p>`;
            container.appendChild(name);

            const cat = document.createElement("div");
            cat.classList.add("category");
            cat.innerHTML = `<div style="display: flex;">${response[command].category}</div>`;
            container.appendChild(cat);

            const permissions = document.createElement("div");
            permissions.classList.add("permissions");
            permissions.innerHTML = `<div style="display: flex;">${response[command].permissions}</div>`;
            container.appendChild(permissions);

            const model = document.createElement("div");
            model.classList.add("model");
            model.innerHTML = `${command} ${response[command].options.map(option => `<p><${option.required ? "b" : "i"}>${option.type === "user" ? "@" : ""}${option.type === "channel" ? "#" : ""}${option.name}</${option.required ? "b" : "i"}><aria-label>${option.description}</aria-label></p>`).join(" ")}`;
            container.appendChild(model);

            const select = document.createElement("div");
            select.classList.add("toggle");
            select.style.width = "5%";
            select.innerHTML = `<div class="button r"><input type="checkbox" class="checkbox" checked/><div class="knobs"></div><div class="layer"></div></div>`;
            container.appendChild(select); 
            document.querySelector("section#commands").appendChild(container);
        }
    };
})();