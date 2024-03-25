import { Link } from "react-router-dom";

import Header from "../../Header";
import Sidenav from "../Sidenav"


export default function ConfigJson() {
    return (
        <>
            <Header />
            <div>
                <Sidenav />
                <main>
                    <div>
                        <h1>Config.json</h1>
                        <p>To make RedEye work, you need to create and complete a <i>config.js</i> file</p>
                        <p>This is what it should look like</p>
                        <pre lang="json">
        {`
{
    "token": "Your bot's token",`}<i> =&gt;{` The token can be found on `}<a href="https://discord.com/developers/applications">Discord developers</a></i>{`
        "firebase": {`}<i> =&gt; {`By default, the bot uses Firebase to store its data, if you do not want to use it then change the database.js code`}</i>{`
            ... `}<i>=&gt; {`all this code can be found on the firebase page`}</i>{`
        }
}`}
                        </pre>
                        <Link rel="noopener noreferrer" className="nav" to="/docs/gettings-started/download-modules">Previous</Link>
                        <Link rel="noopener noreferrer" className="nav" to="/docs/gettings-started/launch">Next</Link>
                    </div>
                </main>
            </div>
        </>
    );
}