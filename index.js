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
client.data = {
    cooldown: new Collection(),
    canvas: "canvas", // require("canvas"),
    commands: {
        prefix: new Collection(),
        slash: new Collection(),
    },
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
            option.type = require("./components/parseApplicationTypes")(option.type);
        });
        if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${require("./components/parsePermissions")(`${command.data.default_member_permissions}`.toLowerCase())}`;
        client.data.commands.slash.set(command.data.name, command);
        require("./components/log")(`Command "%blue%/${command.data.name}%reset%" created`);
    } else require("./components/log")(`%yellow%[WARNING] Something missing with ${file}'s command`);
}
// Add all command in the options of /help
if (Object.keys(client.data.commands.slash.has("help"))) {
    Object.keys(client.data.commands.slash).forEach((command) => {
        if (command.name !== "help") {
            Object.keys(client.data.commands.slash).find((item) => item.name === "help").options[0].choices.push({
                name: command.name,
                name_localizations: command.name_localizations,
                value: command.name
            });
        }
    });
};
// update all / commands
// (async () => {
//     try {
//         // The put method is used to fully refresh all commands in the guild with the current set
//         const data = await new REST().setToken(client.config.token).put(
//             Routes.applicationGuildCommands(client.config.clientId, client.config.serverId),
//             { body: client.data.commands.slash.array },
//         );
//         require("./components/log")(`Successfully updated ${data.length} slash command${(data.length > 1 ? "s" : "")}.`);
//     } catch(error) { return "Error"; }
// })();
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
                        enable: false,
                        channelId: undefined,
                        whiteListed: []
                    },
                    welcom: {
                        enable: false,
                        channelId: undefined,
                        message: "%member% joined us!"
                    },
                    leave: {
                        enable: false,
                        channelId: undefined,
                        message: "%member% left us!"
                    },
                    boost: {
                        enable: false,
                        channelId: undefined,
                        message: "%member% boosted this server"
                    },
                    punishment: {
                        enable: false,
                        channelId: undefined,
                    },
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

client.on("messageCreate", message => {
    message.member.permissions.has("Administrator")
})

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
            console.log(`\n\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))} \x1b[31m/$$%reset%   \x1b[31m/$$%reset%                 %yellow%/$$%reset%                                                                                    %blue%/$$$$$$$%reset%              %green%/$$%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$%reset%  \x1b[31m| $$%reset%                %yellow%| $$%reset%                                                                                   %blue%| $$__  $$%reset%            %green%| $$%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$%reset%  \x1b[31m| $$%reset% %green%/$$$$$$$%reset%   %yellow%/$$$$$$$%reset%  \x1b[34m/$$$$$$%reset%   \x1b[35m/$$$$$$%reset%   %blue%/$$$$$$$%reset%  \x1b[31m/$$$$$$$%reset%  %green%/$$$$$$%reset%   %yellow%/$$$$$$%reset%   \x1b[34m/$$$$$$%reset%              %blue%| $$%reset%  %blue%\\ $$%reset%  \x1b[31m/$$$$$$%reset%  %green%/$$$$$$%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$%reset%  \x1b[31m| $$%green%| $$__  $$%reset% %yellow%/$$__  $$ \x1b[34m/$$__%reset%  \x1b[34m$$%reset% \x1b[35m/$$__  $$%reset% %blue%/$$_____/%reset% \x1b[31m/$$_____/%reset% %green%/$$__  $$%reset% %yellow%/$$__  $$%reset% \x1b[34m/$$__%reset%  \x1b[34m$$%reset%             %blue%| $$$$$$$%reset%  \x1b[31m/$$__  $$%green%|_  $$_/%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$%reset%  \x1b[31m| $$%green%| $$%reset%  %green%\\ $$%yellow%| $$%reset%  %yellow%| $$\x1b[34m| $$$$$$$$\x1b[35m| $$%reset%  \x1b[35m\\__/%blue%|  $$$$$$%reset% \x1b[31m| $$%reset%      %green%| $$%reset%  %green%\\ $$%yellow%| $$%reset%  %yellow%\\__/\x1b[34m| $$$$$$$$%reset%             %blue%| $$__  $$\x1b[31m| $$%reset%  \x1b[31m\\ $$%reset%  %green%| $$%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m| $$%reset%  \x1b[31m| $$%green%| $$%reset%  %green%| $$%yellow%| $$%reset%  %yellow%| $$\x1b[34m| $$_____/\x1b[35m| $$%reset%       %blue%\\____  $$\x1b[31m| $$%reset%      %green%| $$%reset%  %green%| $$%yellow%| $$%reset%      \x1b[34m| $$_____/%reset%             %blue%| $$%reset%  %blue%\\ $$\x1b[31m| $$%reset%  \x1b[31m| $$%reset%  %green%| $$ /$$%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))}\x1b[31m|  $$$$$$/%green%| $$%reset%  %green%| $$%yellow%|  $$$$$$$\x1b[34m|  $$$$$$$\x1b[35m| $$%reset%       %blue%/$$$$$$$/\x1b[31m|  $$$$$$$%green%|  $$$$$$/%yellow%| $$%reset%      \x1b[34m|  $$$$$$$%reset% \x1b[35m/$$$$$$%reset%     %blue%| $$$$$$$/\x1b[31m|  $$$$$$/%reset%  %green%|  $$$$/%reset%\n${" ".repeat(Math.floor((process.stdout.columns - 143) / 2))} \x1b[31m\\______/%reset% %green%|__/%reset%  %green%|__/%reset% %yellow%\\_______/%reset% \x1b[34m\\_______/\x1b[35m|__/%reset%      %blue%|_______/%reset%  \x1b[31m\\_______/%reset% %green%\\______/%reset% %yellow%|__/%reset%       \x1b[34m\\_______/%reset% \x1b[35m|______/%reset%    %blue%|_______/%reset%  \x1b[31m\\______/%reset%    %green%\\____/%reset%\n\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n`);
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