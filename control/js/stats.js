(async () => {
    const params = new URLSearchParams(window.location.search);
    let response = await fetch("http://localhost:8080/commands/stats", {
        method: "GET",
        mode: "cors",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${tokenAPI}`
        }
    });
    if (response.status !== 200) return console.error("Invalid response", response.statusText);
    response = await response.json();
    if (response.code !== 200) return console.error("Invalid response", response.error);
    if (Object.keys(response.data.commands).length === 0) return;
    document.querySelector("main#stats > section > h2").style.display = "none";
    
    const datasets = [];
    for (const command in response.data.commands) {
        datasets.push({
            label: command,
            data: response.data.commands[command]
        });
    }

    const chart = new Chart(document.querySelector("main#stats > section > canvas").getContext("2d"), {
        type: "line",
        data: {
            labels: response.data.date,
            datasets: datasets
        },
        options: {
            maintainAspectRatio: true,
            responsive: true,
            scales: {
                y: {
                    startAtZero: true
                }
            },
            layout: {
                borderWidth: 1
            }
        }
    });
})();