import "../../../cdn/css/content/sidenav.css";

export default function Sidenav() {
    const developpeMenu = (e) => {
        if (e.target.parentNode.className === "active") {
            e.target.parentNode.classList.remove("active");
        } else {
            e.target.parentNode.classList.add("active");
        }
    }

    return (
        <ul class="sidenav">
            <li>
                <p onClick={developpeMenu}>Gettings started</p>
                <ul>
                    <li>
                        <a href="/docs/gettings-started/get-code" rel="noopener noreferrer">Code recovery</a>
                    </li>
                    <li>
                        <a href="/docs/gettings-started/download-modules" rel="noopener noreferrer">Installing Node.js modules</a>
                    </li>
                    <li>
                        <a href="/docs/gettings-started/config.json" rel="noopener noreferrer">config.js</a>
                    </li>
                    <li>
                        <a href="/docs/gettings-started/launch" rel="noopener noreferrer">Launch</a>
                    </li>
                </ul>
            </li>
            <li>
                <p onClick={developpeMenu}>How it's work</p>
                <ul>
                    <li>
                        <a href="/docs/how-it's-work/folder-file-tree" rel="noopener noreferrer">Folder/File Tree</a>
                    </li>
                </ul>
            </li>
            <a href="/server" rel="noopener noreferrer">Help</a>
        </ul>
    );
}