(async () => {
    if (!JSON.parse(localStorage.getItem("token"))) return;
    let response = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
		    authorization: `${JSON.parse(localStorage.getItem("token")).type} ${JSON.parse(localStorage.getItem("token")).token}`,
		},
	});
    if (response.status !== 200) return;
    document.querySelector("a#manage").style.display = "flex";
})();