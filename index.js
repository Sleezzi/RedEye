/*
    We try to put comments everywhere in the code to make development easier, but in some places there may not be any.
    If you have any questions, you can view the documentation at https://redeye.sleezzi.fr/docs
    /!\ Before you begin, please read the LICENSE file /!\
    /!\ This bot was made by Sleezzi. /!\
*/

console.clear(); // Clear the console
const [Discord, {
    Client, // This will be useful for creating the client
    GatewayIntentBits, // This will be useful for permissions
    Partials, // This will be useful for permissions
    Collection, // This will be useful for storing data (list of commands, cooldown...)
    Events, // This will be useful for listening to events (new message, new member...)
    ActivityType // This will be useful to modify the presence
}] = [ require("discord.js"), require("discord.js") ]; // Recover Discord module
    

const client = new Client({ // Create a new Discord client
    presence: { // Define presence
        status: "idle", // Set the bot status => https://discordjs.guide/popular-topics/faq.html#how-do-i-make-my-bot-display-online-idle-dnd-invisible
        activities: [ { type: ActivityType.Playing, name: "Starting...", url: "https://discord.gg/xKxSt7Ke8x", state: "Please wait" } ] // Set the precense => https://discordjs.guide/popular-topics/faq.html#how-do-i-set-my-status-to-watching-listening-to-competing-in
    },
    // /!\ Here we take them all, this is not recommended by Discord which is why we recommend that you only put the one you use /!\
    // You can watch the Discord.js documentation at https://discordjs.guide/popular-topics/intents.html
    intents: Object.keys(GatewayIntentBits).map((i) => GatewayIntentBits[i]), // Set permissions
    partials: Object.keys(Partials).map((i) => Partials[i]),
});

const { readdirSync } = require("fs"); // Recover FS module, It allows you to read the contents of a folder

client.cooldown = new Collection(); // Here will be recorded the members' cooldowns.
client.commands = { // Here will be the list of commands
    prefix: new Collection(), // Here will be the list of prefix type commands
    app: new Collection() // Here will be the list of application type commands
}
client.ownerId = "542703093981380628"; // Here is the Owner's ID, by default it is Sleezzi's but you can put your own

client.config = require("./config.json"); // /!\ TO BE COMPLETED /!\, the bot absolutely needs it => https://redeye.sleezzi.fr/docs/gettings-started/config.json
console.clear(); // Clear the console

require("./components/database").initialize(); // Start the database

for (const file of readdirSync("./commands/prefix").filter((file) => file.endsWith(".js"))) { // Creates a list of all files present in the "commands/prefix" folder then browses it
    const command = require(`./commands/prefix/${file}`); // Get the contents of the file
    if (command.name && command.description && command.model && command.category && command.cooldown && command.execute) { // Check if the file is valid
        client.commands.prefix.set(command.name, command); // Add the command to the list of prefix commands
        require("./components/log")(`Command "%aqua%${command.name}%reset%" loaded`); // Log
    } else require("./components/log")(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.name ? "Command name is missing" : (!command.description ? "Command description is missing" : (!command.execute ? "The command execution function is missing" : (!command.model ? "Command model is missing" : (!command.category ? "Command category is missing" : (!command.cooldown ? "Command cooldown is missing" : "Unknow")))))})%reset%`); // Log the error
}

// add all command in a array
for (const file of readdirSync("./commands/slash").filter((file) => file.endsWith(".js"))) { // Creates a list of all files present in the "commands/slash" folder then browses it
    const command = require(`./commands/slash/${file}`); // Get the contents of the file
    if (command.data && command.data.name && command.execute) { // Check if the file is valid
        if (command.data.options) command.data.options.forEach((option) => {
            if (typeof option.type !== "number") option.type = require("./components/parseAppOptionsTypes")(option.type); // Modify the type of options to pass them in numbers so that Discord.js understands them
        });
        if (!command.data.type) command.data.type = 1; // Sets the default type of a command
        if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${require("./components/parsePermissions")(`${command.data.default_member_permissions}`.toLowerCase())}`; // Change the permissions to pass them in numbers so that Discord.js understands them
        client.commands.app.set(command.data.name, command); // Adds the command to the list of application commands
        require("./components/log")(`Command "%aqua%/${command.data.name}%reset%" created`); // Log
    } else require("./components/log")(`%red%[WARNING] Something missing with ${file}'s command %gray%(${!command.data ? "Command information is missing" : (!command.data.name ? "Command name is missing" : (!command.execute ? "The command execution function is missing" : ""))})%reset%`); // Log the error
}

for (const file of readdirSync("./contextMenu").filter((file) => file.endsWith(".js"))) { // Creates a list of all files present in the "contextMenu" folder then browses it
    const command = require(`./contextMenu/${file}`); // Get the contents of the file
    if (command.data && command.data.name && command.data.type && command.execute) { // Check if the file is valid
        if (command.data.options) command.data.options.forEach((option) => {
            if (typeof option.type !== "number") option.type = require("./components/parseAppOptionsTypes")(option.type); // Modify the type of options to pass them in numbers so that Discord.js understands them
        });
        if (typeof command.data.type !== "number") command.data.type = require("./components/parseAppType")(command.data.type);
        if (command.data.default_member_permissions && !/^\d+$/.test(command.data.default_member_permissions)) command.data.default_member_permissions = `${require("./components/parsePermissions")(`${command.data.default_member_permissions}`.toLowerCase())}`; // Change the permissions to pass them in numbers so that Discord.js understands them
        client.commands.app.set(command.data.name, command); // Adds the command to the list of application commands
        require("./components/log")(`Context command "%aqua%${command.data.name}%reset%" created`); // Log
    } else require("./components/log")(`%yellow%[WARNING] Something missing with ${file} context command`); // Log the error
}

for (const file of readdirSync("./events").filter((file) => file.endsWith(".js"))) { // Creates a list of all files present in the "events" folder then browses it
    const event = require(`./events/${file}`); // Get the contents of the file
    if (Object.hasOwnProperty.call(Events, event.event) && event.name && event.type && event.execute) { // Check if the file is valid
        require("./components/log")(`Event "%yellow%${event.name} (${event.event})%reset%" loaded`); // Log
        client[event.type](Events[`${event.event}`], async (...args) => { // Create a listen for the event. When Discord.js detects the event, we retrieve the arguments and put them in an array called “args”
            try {
                const err = await event.execute(args, client, Discord); // We call the “execute” function present in the file
                if (err) { // Check if there are any errors
                    if (typeof err === "object") {
                        console.error("\x1b[31m", err, "\x1b[0m"); // Log the error
                    } else {
                        require("./components/log")(`%red%${err}`); // Log the error
                    }
                }
            } catch(err) { return; }
        });
    }
}

client.login(client.config.token).then(() => { // Register the bot on Discord
    require("./components/log")("\n", `%green%Logging...%reset%`); // Log
});

// client.on(Events.MessageCreate, async (message) => {
//     message.guild.members.cache.map
// });

process.stdin.setRawMode(true); // Allows writing to the console
process.stdin.resume(); // Pause the console
process.stdin.setEncoding('utf8'); // Allows you to put special characters in the console

process.stdin.on("data", async (key) => {
    switch (key) {
        case "e": 
            await client.destroy(client.config.token); // Notify Discord that the bot is stopping
            process.exit(0); // Shut down the console
            break
        case "c": 
            console.clear(); // Clear the console
            if (process.stdout.columns < 143) { // Checks if the console width is less than 143
                require("./components/log")("%red%B%green%L%yellow%U%blue%E%purpule%P%aqua%R%red%I%green%N%yellow%T%reset% %green%READY%reset%\n\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n"); // Log
            } else {
                console.log(`\n\n╔═══╗╔═══╗╔══╗ ╔═══╗╔╗╔╗╔═══╗\n║╔═╗║║╔══╝║╔╗╚╗║╔══╝║║║║║╔══╝\n║╚═╝║║╚══╗║║╚╗║║╚══╗║╚╝║║╚══╗\n║╔╗╔╝║╔══╝║║ ║║║╔══╝╚═╗║║╔══╝\n║║║║ ║╚══╗║╚═╝║║╚══╗ ╔╝║║╚══╗\n╚╝╚╝ ╚═══╝╚═══╝╚═══╝ ╚═╝╚═══╝\n\n  \x1b[32m➜\x1b[0m  press h to show help\n  \x1b[32m➜\x1b[0m  press c to clear\n  \x1b[32m➜\x1b[0m  press r to restart\n  \x1b[32m➜\x1b[0m  press e to exit\n\n`); // Log
            }
            break;
        case "r":
            await client.destroy(client.config.token); // Notify Discord that the bot is stopping
            await client.login(client.config.token); // Register the bot on Discord
            require("./components/log")(`  %green%➜ Restarted%reset%\n\n`); // Log
            break;
        case "h":
            console.log(`\n\n  \x1b[32m➜\x1b[0m  press h to show help\n  \x1b[32m➜\x1b[0m  press c to clear\n  \x1b[32m➜\x1b[0m  press r to restart\n  \x1b[32m➜\x1b[0m  press e to exit\n\n`); // Log
            break;
    }
});