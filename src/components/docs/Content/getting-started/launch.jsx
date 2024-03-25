import { Link } from "react-router-dom";

import Header from "../../Header";
import Sidenav from "../Sidenav"


export default function Launch() {
    return (
        <>
            <Header />
            <div>
                <Sidenav />
                <main>
                    <div>
                        <h1>RedEye - Launch</h1>
                        <div style={{display: "flex", width: "100%"}}>
                            <p>To start the bot, you had to paste this command&nbsp;</p>
                            <pre className="small">$ npm start</pre>
                            <p>&nbsp;in the terminal.</p>
                        </div>
                        <div className="note">If you don't want to have to do the command constantly you can create a <i>start.bat</i> file with the command inside</div>
                        <h3>Now you are good, your bot is running. You can now personalize the bot!</h3>
                        <Link rel="noopener noreferrer" className="nav" to="/docs/gettings-started/config.json">Previous</Link>
                    </div>
                </main>
            </div>
        </>
    );
}