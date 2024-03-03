console.clear();
const [Discord, {
    Client,
    version,
    PermissionFlagsBits,
    IntentsBitField,
    GatewayIntentBits,
    Partials,
    Collection,
    Events,
    ActivityType,
    ChannelType,
    PresenceUpdateStatus,
    SlashCommandBuilder,
    Routes,
    REST
}] = [ require("discord.js"), require("discord.js") ];
    

const client = new Client({
    presence: {
        status: "idle",
        activities: [ { type: ActivityType.Playing, name: "Starting...", url: "https://discord.gg/xKxSt7Ke8x", state: "Please wait" } ]
    },
    intents: Object.keys(GatewayIntentBits).map((i) => GatewayIntentBits[i]),
    partials: Object.keys(Partials).map((i) => Partials[i]),
});

const { readdirSync } = require("fs");

client.data = {
    cooldown: new Collection(),
    commands: {
        prefix: new Collection(),
        app: new Collection(),
    }
};
client.ownerId = "542703093981380628";

client.config = require("./config.json");
console.clear();

require("./components/database").initialize();

for (const file of readdirSync("./commands/prefix").filter((file) => file.endsWith(".js"))) {
    const command = require(`./commands/prefix/${file}`);
    if (command.name && command.description && command.model && command.category && command.cooldown && command.execute) {
        client.data.commands.prefix.set(command.name, command);
        require("./components/log")(`Command "%aqua%${command.name}%reset%" loaded`);
    } else require("./components/log")(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.name ? "Command name is missing" : (!command.description ? "Command description is missing" : (!command.execute ? "The command execution function is missing" : (!command.model ? "Command model is missing" : (!command.category ? "Command category is missing" : (!command.cooldown ? "Command cooldown is missing" : "Unknow")))))})%reset%`);
}

require("./components/log")("");

// add all command in a array
for (const file of readdirSync("./commands/slash").filter((file) => file.endsWith(".js"))) {
    const command = require(`./commands/slash/${file}`);
    if (command.data && command.data.name && command.execute) {
        if (command.data.options) command.data.options.forEach((option) => {
            if (typeof option.type !== "number") option.type = require("./components/parseAppOptionsTypes")(option.type);
        });
        if (!command.data.type) command.data.type = 1;
        if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${require("./components/parsePermissions")(`${command.data.default_member_permissions}`.toLowerCase())}`;
        client.data.commands.app.set(command.data.name, command);
        require("./components/log")(`Command "%aqua%/${command.data.name}%reset%" created`);
    } else require("./components/log")(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.data ? "Command information is missing" : (!command.data.name ? "Command name is missing" : (!command.execute ? "The command execution function is missing" : ""))})%reset%`);
}

for (const file of readdirSync("./contextMenu").filter((file) => file.endsWith(".js"))) {
    const command = require(`./contextMenu/${file}`);
    if (command.data && command.data.name && command.data.type && command.execute) {
        if (command.data.options) command.data.options.forEach((option) => {
            if (typeof option.type === "number") return;
            option.type = require("./components/parseAppOptionsTypes")(option.type);
        });
        if (typeof command.data.type !== "number") command.data.type = require("./components/parseAppType")(command.data.type);
        if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${require("./components/parsePermissions")(`${command.data.default_member_permissions}`.toLowerCase())}`;
        client.data.commands.app.set(command.data.name, command);
        require("./components/log")(`Context command "%aqua%${command.data.name}%reset%" created`);
    } else require("./components/log")(`%yellow%[WARNING] Something missing with ${file} context command`);
}
// update all / commands
require("./components/log")("");

for (const file of readdirSync("./events").filter((file) => file.endsWith(".js"))) {
    const event = require(`./events/${file}`);
    require("./components/log")(`Event "%yellow%${event.name} (${event.event})%reset%" loaded`);
    if (Object.hasOwnProperty.call(Events, event.event) && event.name && event.type && event.execute) {
        client[event.type](Events[`${event.event}`], (...args) => {
            try {
                return event.execute(args, client, Discord).then((err) => {
                    try {
                        if (err) {
                            if (typeof err === "object") {
                                console.error("\x1b[31m", err, "\x1b[0m");
                            } else {
                                require("./components/log")(`%red%${err}`);
                            }
                        }
                    } catch (_) {}
                });
            } catch(err) { return; }
        });
    }
}

client.login(client.config.token).then(() => {
    require("./components/log")("\n", `%green%Logging...%reset%`);
});

client.on(Events.MessageCreate, async (message) => {
    message.guild.members.cache.map
});

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on("data", async (key) => {
    switch (key) {
        case "e": 
            await client.destroy(client.config.token);
            process.exit(0);
            break
        case "c": 
            console.clear();
            if (process.stdout.columns < 143) {
                require("./components/log")("%red%B%green%L%yellow%U%blue%E%purpule%P%aqua%R%red%I%green%N%yellow%T%reset% %green%READY%reset%\n\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n");
            } else {
                console.log(`\n\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))} \x1b[31m/$$\x1b[0m   \x1b[31m/$$\x1b[0m                 \x1b[33m/$$\x1b[0m                                                                                    \x1b[36m/$$$$$$$\x1b[0m              \x1b[32m/$$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[0m                \x1b[33m| $$\x1b[0m                                                                                   \x1b[36m| $$__  $$\x1b[0m            \x1b[32m| $$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[0m \x1b[32m/$$$$$$$\x1b[0m   \x1b[33m/$$$$$$$\x1b[0m  \x1b[34m/$$$$$$\x1b[0m   \x1b[35m/$$$$$$\x1b[0m   \x1b[36m/$$$$$$$\x1b[0m  \x1b[31m/$$$$$$$\x1b[0m  \x1b[32m/$$$$$$\x1b[0m   \x1b[33m/$$$$$$\x1b[0m   \x1b[34m/$$$$$$\x1b[0m              \x1b[36m| $$\x1b[0m  \x1b[36m\\ $$\x1b[0m  \x1b[31m/$$$$$$\x1b[0m  \x1b[32m/$$$$$$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[32m| $$__  $$\x1b[0m \x1b[33m/$$__  $$\x1b[0m \x1b[34m/$$__  \x1b[34m$$\x1b[0m \x1b[35m/$$__  $$\x1b[0m \x1b[36m/$$_____/\x1b[0m \x1b[31m/$$_____/\x1b[0m \x1b[32m/$$__  $$\x1b[0m \x1b[33m/$$__  $$\x1b[0m \x1b[34m/$$__  \x1b[34m$$\x1b[0m             \x1b[36m| $$$$$$$\x1b[0m  \x1b[31m/$$__  $$\x1b[32m|_  $$_/\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[32m| $$\x1b[0m  \x1b[32m\\ $$\x1b[33m| $$\x1b[0m  \x1b[33m| $$\x1b[34m| $$$$$$$$\x1b[35m| $$\x1b[0m  \x1b[35m\\__/\x1b[36m|  $$$$$$\x1b[0m \x1b[31m| $$\x1b[0m      \x1b[32m| $$\x1b[0m  \x1b[32m\\ $$\x1b[33m| $$\x1b[0m  \x1b[33m\\__/\x1b[34m| $$$$$$$$\x1b[0m             \x1b[36m| $$__  $$\x1b[31m| $$\x1b[0m  \x1b[31m\\ $$\x1b[0m  \x1b[32m| $$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[32m| $$\x1b[0m  \x1b[32m| $$\x1b[33m| $$\x1b[0m  \x1b[33m| $$\x1b[34m| $$_____/\x1b[35m| $$\x1b[0m       \x1b[36m\\____  $$\x1b[31m| $$\x1b[0m      \x1b[32m| $$\x1b[0m  \x1b[32m| $$\x1b[33m| $$\x1b[0m      \x1b[34m| $$_____/\x1b[0m             \x1b[36m| $$\x1b[0m  \x1b[36m\\ $$\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[0m  \x1b[32m| $$\x1b[0m \x1b[32m/$$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m|  $$$$$$/\x1b[32m| $$\x1b[0m  \x1b[32m| $$\x1b[33m|  $$$$$$$\x1b[34m|  $$$$$$$\x1b[35m| $$\x1b[0m       \x1b[36m/$$$$$$$/\x1b[31m|  $$$$$$$\x1b[32m|  $$$$$$/\x1b[33m| $$\x1b[0m      \x1b[34m|  $$$$$$$\x1b[0m \x1b[35m/$$$$$$\x1b[0m     \x1b[36m| $$$$$$$/\x1b[31m|  $$$$$$/\x1b[0m  \x1b[32m|  $$$$/\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))} \x1b[31m\\______/\x1b[0m \x1b[32m|__/\x1b[0m  \x1b[32m|__/\x1b[0m \x1b[33m\\_______/\x1b[0m \x1b[34m\\_______/\x1b[35m|__/\x1b[0m      \x1b[36m|_______/\x1b[0m  \x1b[31m\\_______/\x1b[0m \x1b[32m\\______/\x1b[0m \x1b[33m|__/\x1b[0m       \x1b[34m\\_______/\x1b[0m \x1b[35m|______/\x1b[0m    \x1b[36m|_______/\x1b[0m  \x1b[31m\\______/\x1b[0m    \x1b[32m\\____/\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - "Made by Sleezzi".length) / 2))}Made by Sleezzi\n\n\n  \x1b[32m➜\x1b[0m  press h to show help\n  \x1b[32m➜\x1b[0m  press c to clear\n  \x1b[32m➜\x1b[0m  press r to restart\n  \x1b[32m➜\x1b[0m  press e to exit\n\n`);
            }
            break;
        case "r":
            await client.destroy(client.config.token);
            await client.login(client.config.token);
            require("./components/log")(`  %green%➜ Restarted%reset%\n\n`);
            break;
        case "h":
            console.log(`\n\n  \x1b[32m➜\x1b[0m  press h to show help\n  \x1b[32m➜\x1b[0m  press c to clear\n  \x1b[32m➜\x1b[0m  press r to restart\n  \x1b[32m➜\x1b[0m  press e to exit\n\n`);
            break;
    }
});