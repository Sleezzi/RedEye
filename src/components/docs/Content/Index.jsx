export default function Index() {
    return (
        <main>
            <div>
                <h1 style={{color: "var(--a-color)", WebkitTextStroke  : "1px black"}}>RedEye</h1>
                <p>RedEye est un bot OpenSource, son code se trouve sur <a href="https://github.com/Sleezzi/RedEye">Github</a>, cependant, son développer <a href="https://sleezzi.fr">Sleezzi</a> peu ne parfois ne pas suivre cette logique et faire du code un peu compliqué. C'est pourquoi cetter pas est ici, elle vous permet de mieux comprendre comment le bot a été pensé et son fonctionnement.</p>
                <p>Les pages de documentation arrive au fure est a mesure, nous nous faisons de notre mieux pour vous aider mais parfois le temps nous manque. Si vous avez la moindre question, n'hésitez pas la poser sur notre <a href="/server">serveur Discord</a></p>
                <div class="warning">
                    RedEye is an OpenSource bot, but it was not initially designed as such, so some parts may be complex or not optimized. If you encounter an issue, you can report it <a href="/server">here</a> or <a href="https://github.com/Sleezzi/RedEye/issues" target="_blank" rel="noreferrer"> here</a>
                </div>
                <br></br>
                <a href="/docs/gettings-started/get-code" rel="noopener noreferrer" class="nav">Start up</a>
            </div>
        </main>
    );
}