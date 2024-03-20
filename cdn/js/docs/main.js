if (localStorage.getItem("theme") === "light") {
    document.querySelector("button.toggleTheme").innerText = "light_mode";
        document.body.classList.add("light");
    }
document.querySelector("button.toggleTheme").onclick = (e) => {
    if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "dark");
        e.target.innerText = "dark_mode";
        document.body.classList.remove("light");
    } else {
        localStorage.setItem("theme", "light");
        e.target.innerText = "light_mode";
        document.body.classList.add("light");
    }
}
document.querySelector(".sidenavOpener").onclick = () => {
    if (document.querySelector(".sidenav").className === "sidenav") {
        document.querySelector(".sidenav").classList.add("active");
    } else {
        document.querySelector(".sidenav").classList.remove("active");
    }
}
fetch("/docs/docs.json").then((response) => response.json()).then((response) => {
    for (const nav in response) {
        if (typeof response[nav] === "string") {
            const a = document.createElement("a");
            a.rel = "noopener noreferrer";
            a.innerText = nav;
            a.href = response[nav];
            document.querySelector(".sidenav").appendChild(a);
        } else {
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerText = nav;
            p.onclick = (e) => {
                if (e.target.parentNode.className === "active") {
                    e.target.parentNode.classList.remove("active");
                    console.log("remove");
                } else {
                    e.target.parentNode.classList.add("active");
                    console.log(document.body);
                }
            }
            li.appendChild(p);
            const ul = document.createElement("ul");
            li.appendChild(ul);
            for (const undernav in response[nav]) {
                const secondeLi = document.createElement("li");
                const a = document.createElement("a");
                a.rel = "noopener noreferrer";
                a.innerText = undernav;
                a.href = response[nav][undernav];
                if (window.location.href.replace(".html", "").endsWith(response[nav][undernav].replace(".html", ""))) {
                    li.classList.add("active");
                    secondeLi.classList.add("active");

                    if (Object.keys(response[nav])[Object.keys(response[nav]).indexOf(undernav)-1]) {
                        const previous = document.createElement("a");
                        previous.rel = "noopener noreferrer";
                        previous.innerText = "Previous";
                        previous.classList.add("nav")
                        previous.href = response[nav][Object.keys(response[nav])[Object.keys(response[nav]).indexOf(undernav)-1]];
                        document.querySelector("main > div").appendChild(previous);
                    }
                    if (Object.keys(response[nav])[Object.keys(response[nav]).indexOf(undernav)+1]) {
                        const next = document.createElement("a");
                        next.rel = "noopener noreferrer";
                        next.innerText = "Next";
                        next.classList.add("nav")
                        next.href = response[nav][Object.keys(response[nav])[Object.keys(response[nav]).indexOf(undernav)+1]];
                        document.querySelector("main > div").appendChild(next);
                    }
                }
                secondeLi.appendChild(a);
                ul.appendChild(secondeLi);
            }
            
            document.querySelector(".sidenav").appendChild(li);
        }
    }
});