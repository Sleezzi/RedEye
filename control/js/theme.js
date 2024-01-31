if (localStorage.getItem("theme") === undefined || localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "dark");
} else if (localStorage.getItem("theme") === "light") {
    document.querySelector("#toggleTheme > input").removeAttribute("checked");
    document.body.classList.remove("dark");
    document.body.classList.add("light");
}
//      Change the theme
document.querySelector("#toggleTheme").onclick = function() {
    this.classList.remove("fade");
    document.body.classList.remove("fade");
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    } else {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
    document.body.classList.add("fade");
    setTimeout(function() { document.body.classList.remove("fade"); }, 500);
}