import { Link } from "react-router-dom";

import Header from "../../Header";
import Sidenav from "../Sidenav"


export default function InstallingNodeJsModules() {
    return (
        <>
        <Header />
            <div>
                <Sidenav />
                <main>
                    <div>
                        <h1>RedEye - Download Node.js modules</h1>
                        <div style={{display: "flex", width: "100%"}}>
                            <p>Open a terminal and enter the command&nbsp;</p>
                            <pre className="small">$ npm i</pre>
                            <p>&nbsp;to download all Node.js modules.</p>
                        </div>
                        
                        <div className="note">
                            We use <a href="https://firebase.google.com" target="_blank" rel="noreferrer">Firebase</a> to record user data (tickets, level, etc.), for this we need the <i>firebase-admin</i> module, if you choose something else for saving data you can uninstall it by doing <pre className="small">$ npm uninstall firebase-admin</pre>
                        </div>
                        <Link rel="noopener noreferrer" className="nav" to="/docs/gettings-started/get-code">Previous</Link>
                        <Link rel="noopener noreferrer" className="nav" to="/docs/gettings-started/config.json">Next</Link>
                    </div>
                </main>
            </div>
        </>
    );
}