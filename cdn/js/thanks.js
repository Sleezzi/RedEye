(async () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType, guild, permissions] = [fragment.get('access_token'), fragment.get('token_type'), fragment.get("guild_id"), fragment.get("permissions")];

    if (!accessToken || permissions !== "8") return window.location.href = "/invite";
    localStorage.setItem("token", JSON.stringify({token: accessToken, type: tokenType}));
    window.location.href = `/control/guild?id=${guild}`;
})();