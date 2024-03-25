import { useEffect } from "react";
import "../../../cdn/css/docs/sidenav.css";

import { Link } from "react-router-dom";

export default function Sidenav() {
    const developpeMenu = (e) => {
        if (e.target.parentNode.className === "active") {
            e.target.parentNode.classList.remove("active");
        } else {
            e.target.parentNode.classList.add("active");
        }
    }
    useEffect(() => {
        if (document.querySelector(`a[href="${window.location.href.split(window.location.host)[1]}"]`)) {
            document.querySelector(`a[href="${window.location.href.split(window.location.host)[1]}"]`).parentNode.classList.add("active");
            document.querySelector(`a[href="${window.location.href.split(window.location.host)[1]}"]`).parentNode.parentNode.parentNode.classList.add("active");
        } else {
            console.log(window.location.href.split(window.location.host)[1]);
        }
    }, []);

    return (
        <ul className="sidenav">
            <li>
                <p onClick={developpeMenu}>Gettings started</p>
                <ul>
                    <li>
                        <Link to="/docs/gettings-started/get-code" rel="noopener noreferrer">Code recovery</Link>
                    </li>
                    <li>
                        <Link to="/docs/gettings-started/download-modules" rel="noopener noreferrer">Installing Node.js modules</Link>
                    </li>
                    <li>
                        <Link to="/docs/gettings-started/config.json" rel="noopener noreferrer">config.js</Link>
                    </li>
                    <li>
                        <Link to="/docs/gettings-started/launch" rel="noopener noreferrer">Launch</Link>
                    </li>
                </ul>
            </li>
            <li>
                <p onClick={developpeMenu}>How it's work</p>
                <ul>
                    <li>
                        <Link to="/docs/how-it's-work/folder-file-tree" rel="noopener noreferrer">Folder/File Tree</Link>
                    </li>
                </ul>
            </li>
            <a href="/server" rel="noopener noreferrer">Help</a>
        </ul>
    );
}