import { useEffect, useState } from "react";
import "../../cdn/css/header.css";

export default function Header() {
    const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.body.className = theme;
        document.querySelector(".toggleTheme > span").innerText = `${theme}_mode`;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        if (localStorage.getItem("theme") === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    useEffect(() => {
        if (sidenavIsOpen) {
            document.querySelector(".sidenav").classList.add("active");
        } else {
            document.querySelector(".sidenav").classList.remove("active");
        }
    }, [sidenavIsOpen]);

    const toggleSidenav = () => {
        if (sidenavIsOpen) {
            setSidenavIsOpen(false)
        } else {
            setSidenavIsOpen(true)
        }
    }

    return (
        <header>
            <div onClick={toggleSidenav} className="sidenavOpener">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <a href="/docs/">
                <img src="https://redeye.sleezzi.fr/cdn/img/Logo/RedEye_Rounded.png" alt="logo"></img>RedEye - Docs
            </a>
            <button onClick={toggleTheme} class="toggleTheme" title="Switch from dark mode to light mode">
                <span class="material-symbols-outlined">dark_mode</span>
            </button>
        </header>
    );
}