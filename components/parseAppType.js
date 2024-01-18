module.exports = (type) => {
    if (type === "chatinput") return 1;
    if (type === "user") return 2;
    if (type === "message") return 3;
    return 1;
}