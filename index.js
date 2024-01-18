const Discord = require("discord.js");
const {
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
    REST,
} = require("discord.js");

const client = new Client({
    presence: {
        status: "idle",
        activities: [ { type: ActivityType.Playing, name: "Starting...", url: "https://discord.gg/xKxSt7Ke8x", state: "Please wait" } ]
    },
    intents: Object.keys(GatewayIntentBits).map((i) => GatewayIntentBits[i]),
    partials: Object.keys(Partials).map((i) => Partials[i]),
});

const { readdirSync } = require("fs");
const firebase = require("firebase-admin");
firebase.initializeApp({
    credential: firebase.credential.cert(require("./config.json").firebase),
    databaseURL: "https://blueprint-bot-db-default-rtdb.europe-west1.firebasedatabase.app/"
});
client.data = {
    cooldown: new Collection(),
    canvas: "canvas", // require("canvas"),
    commands: {
        prefix: new Collection(),
        app: new Collection(),
    },
    db: firebase.database()
};

client.config = require("./config.json");
serverData = new Collection();
console.clear();

for (const file of readdirSync("./commands/prefix").filter((file) => file.endsWith(".js"))) {
    const command = require(`./commands/prefix/${file}`);
    client.data.commands.prefix.set(command.name, command);
    require("./components/log")(`Command "%blue%${command.name}%reset%" loaded`);
}

require("./components/log")("");

// add all command in a array
for (const file of readdirSync("./commands/slash").filter((file) => file.endsWith(".js"))) {
    const command = require(`./commands/slash/${file}`);
    if (command.data && command.data.name && command.execute) {
        if (command.data.options) command.data.options.forEach((option) => {
            if (typeof option.type === "number") return;
            option.type = require("./components/parseAppOptionsTypes")(option.type);
        });
        if (!command.data.type) command.data.type = 1;
        if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${require("./components/parsePermissions")(`${command.data.default_member_permissions}`.toLowerCase())}`;
        client.data.commands.app.set(command.data.name, command);
        require("./components/log")(`Command "%blue%/${command.data.name}%reset%" created`);
    } else require("./components/log")(`%yellow%[WARNING] Something missing with ${file}'s command`);
}

// Add all command in the options of /help
if (Object.keys(client.data.commands.app.has("help"))) {
    Object.keys(client.data.commands.app).forEach((command) => {
        if (command.name !== "help") {
            Object.keys(client.data.commands.app).find((item) => item.name === "help").options[0].choices.push({
                name: command.name,
                name_localizations: command.name_localizations,
                value: command.name
            });
        }
    });
};

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
        require("./components/log")(`Context command "%blue%${command.data.name}%reset%" created`);
    } else require("./components/log")(`%yellow%[WARNING] Something missing with ${file} context command`);
}
// update all / commands

require("./components/log")("");

for (const file of readdirSync("./events").filter((file) => file.endsWith(".js"))) {
    const event = require(`./events/${file}`);
    require("./components/log")(`Event "%yellow%${event.name} (${event.event})%reset%" loaded`);
    if (Object.hasOwnProperty.call(Events, event.event) && event.name && event.type && event.execute) {
        client[event.type](Events[`${event.event}`], (...args) => {
            if (args[0] && args[0].guild && !serverData.has(args[0].guild.id)) serverData.set(args[0].guild.id, {
                prefix: "!",
                channel: {
                    log: {
                        channelId: undefined,
                        whiteListed: []
                    },
                    welcom: {
                        channelId: undefined,
                        message: "%member% joined us!"
                    },
                    leave: {
                        channelId: undefined,
                        message: "%member% left us!"
                    },
                    boost: {
                        channelId: undefined,
                        message: "%member% boosted this server"
                    },
                    punishment: undefined,
                },
                rolesReaction: {},
                disabledCommands: [],
                disabeledEvents: []
            });
            try {
                return event.execute(args, serverData, client, Discord);
            } catch(err) { return; }
        });
    }
}

client.login(client.config.token).then(() => {
    require("./components/log")("\n", `%green%Logging...%reset%`);
});

// client.on("interactionCreate", message => {
//     message
// });

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');
if (process.stdout.columns < 143) process.stdout.columns = 143;

process.stdin.on("data", (key) => {
    switch (key) {
        case "e": 
            client.destroy(client.config.token).then(() => process.exit(0));
            break
        case "c": 
            console.clear();
            console.log(`\n\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))} \x1b[31m/$$\x1b[0m   \x1b[31m/$$\x1b[0m                 \x1b[33m/$$\x1b[0m                                                                                    \x1b[36m/$$$$$$$\x1b[0m              \x1b[32m/$$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[0m                \x1b[33m| $$\x1b[0m                                                                                   \x1b[36m| $$__  $$\x1b[0m            \x1b[32m| $$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[0m \x1b[32m/$$$$$$$\x1b[0m   \x1b[33m/$$$$$$$\x1b[0m  \x1b[34m/$$$$$$\x1b[0m   \x1b[35m/$$$$$$\x1b[0m   \x1b[36m/$$$$$$$\x1b[0m  \x1b[31m/$$$$$$$\x1b[0m  \x1b[32m/$$$$$$\x1b[0m   \x1b[33m/$$$$$$\x1b[0m   \x1b[34m/$$$$$$\x1b[0m              \x1b[36m| $$\x1b[0m  \x1b[36m\\ $$\x1b[0m  \x1b[31m/$$$$$$\x1b[0m  \x1b[32m/$$$$$$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[32m| $$__  $$\x1b[0m \x1b[33m/$$__  $$\x1b[0m \x1b[34m/$$__  \x1b[34m$$\x1b[0m \x1b[35m/$$__  $$\x1b[0m \x1b[36m/$$_____/\x1b[0m \x1b[31m/$$_____/\x1b[0m \x1b[32m/$$__  $$\x1b[0m \x1b[33m/$$__  $$\x1b[0m \x1b[34m/$$__  \x1b[34m$$\x1b[0m             \x1b[36m| $$$$$$$\x1b[0m  \x1b[31m/$$__  $$\x1b[32m|_  $$_/\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[32m| $$\x1b[0m  \x1b[32m\\ $$\x1b[33m| $$\x1b[0m  \x1b[33m| $$\x1b[34m| $$$$$$$$\x1b[35m| $$\x1b[0m  \x1b[35m\\__/\x1b[36m|  $$$$$$\x1b[0m \x1b[31m| $$\x1b[0m      \x1b[32m| $$\x1b[0m  \x1b[32m\\ $$\x1b[33m| $$\x1b[0m  \x1b[33m\\__/\x1b[34m| $$$$$$$$\x1b[0m             \x1b[36m| $$__  $$\x1b[31m| $$\x1b[0m  \x1b[31m\\ $$\x1b[0m  \x1b[32m| $$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[32m| $$\x1b[0m  \x1b[32m| $$\x1b[33m| $$\x1b[0m  \x1b[33m| $$\x1b[34m| $$_____/\x1b[35m| $$\x1b[0m       \x1b[36m\\____  $$\x1b[31m| $$\x1b[0m      \x1b[32m| $$\x1b[0m  \x1b[32m| $$\x1b[33m| $$\x1b[0m      \x1b[34m| $$_____/\x1b[0m             \x1b[36m| $$\x1b[0m  \x1b[36m\\ $$\x1b[31m| $$\x1b[0m  \x1b[31m| $$\x1b[0m  \x1b[32m| $$\x1b[0m \x1b[32m/$$\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m|  $$$$$$/\x1b[32m| $$\x1b[0m  \x1b[32m| $$\x1b[33m|  $$$$$$$\x1b[34m|  $$$$$$$\x1b[35m| $$\x1b[0m       \x1b[36m/$$$$$$$/\x1b[31m|  $$$$$$$\x1b[32m|  $$$$$$/\x1b[33m| $$\x1b[0m      \x1b[34m|  $$$$$$$\x1b[0m \x1b[35m/$$$$$$\x1b[0m     \x1b[36m| $$$$$$$/\x1b[31m|  $$$$$$/\x1b[0m  \x1b[32m|  $$$$/\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))} \x1b[31m\\______/\x1b[0m \x1b[32m|__/\x1b[0m  \x1b[32m|__/\x1b[0m \x1b[33m\\_______/\x1b[0m \x1b[34m\\_______/\x1b[35m|__/\x1b[0m      \x1b[36m|_______/\x1b[0m  \x1b[31m\\_______/\x1b[0m \x1b[32m\\______/\x1b[0m \x1b[33m|__/\x1b[0m       \x1b[34m\\_______/\x1b[0m \x1b[35m|______/\x1b[0m    \x1b[36m|_______/\x1b[0m  \x1b[31m\\______/\x1b[0m    \x1b[32m\\____/\x1b[0m\n${" ".repeat(Math.floor((process.stdout.columns - "Made by Sleezzi".length) / 2))}Made by Sleezzi\n\n\n  \x1b[32m➜\x1b[0m  press h to show help\n  \x1b[32m➜\x1b[0m  press c to clear\n  \x1b[32m➜\x1b[0m  press r to restart\n  \x1b[32m➜\x1b[0m  press e to exit\n\n`);
            break;
        case "r":
            client.destroy(client.config.token).then(() => {
                client.login(client.config.token).then(() => {
                    require("./components/log")(`  %green%➜ Restarted%reset%\n\n`);
                });
            });
            break;
        case "h":
            console.log(`\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n`);
            break;
    }
});