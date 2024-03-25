import { Link } from "react-router-dom";

import Header from "../../Header";
import Sidenav from "../Sidenav"

export default function GetRecovery() {
    return (
        <>
            <Header />
                <div>
                    <Sidenav />
                    <main>
                    <div>
                        <h1>RedEye - Get Code</h1>
                        <h2>With Git</h2>
                        <p>To retrieve the bot code, you must go to <a href="https://github.com/Sleezzi/RedEye">RedEye's GitHub</a></p>
                        <p>Then click on the <b style={{background: "#238636", padding: ".5rem 1rem", borderRadius: ".4rem", fontFamily: "inherit", fontSize: "80%", cursor: "not-allowed", color: "white"}}>&lt; &gt; Code ▾</b> button and on the <i>Copy</i> button</p>
                        <p>Ensuite, ouvrez un terminal et collez la commande dedans.</p>
                        <br></br>
                        <h2>Without Git</h2>
                        <p>To retrieve the bot code, you must go to <a href="https://github.com/Sleezzi/RedEye">RedEye's GitHub</a></p>
                        <p>Then click on the <b style={{background: "#238636", padding: ".5rem 1rem", borderRadius: ".4rem", fontFamily: "inherit", fontSize: "80%", cursor: "not-allowed", color: "white"}}>&lt; &gt; Code ▾</b> and <i>Download ZIP</i> button then unzip it.</p>
                        <Link rel="noopener noreferrer" className="nav" to="/docs/gettings-started/download-modules">Next</Link>
                    </div>
                </main>
            </div>
        </>
    );
}