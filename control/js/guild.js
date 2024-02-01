let data = JSON.parse(localStorage.getItem("guilds"));
const params = new URLSearchParams(window.location.search);


(async () => {
    if (!data || !data[params.get("id")]) {
        window.location.href = `/control/login?guild=${params.get("id")}`;
        return;
    }
})();