module.exports = {
    name: "BotReady",
    event: "ClientReady",
    type: "on",
    execute([], client, Discord) {
        if (process.stdout.columns < 28) {
            require("../components/log")("%red%B%green%L%yellow%U%blue%E%purpule%P%aqua%R%red%I%green%N%yellow%T%reset% %green%READY%reset%\n\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n\n\n"); // Log
        } else {
            require("../components/log")(`\n\n${" ".repeat(process.stdout.columns / 2 - 28 / 2)}%red%████%reset% %blue%███%reset% %purpule%████%reset%  %yellow%███%reset% %aqua%██%reset% %aqua%██%reset% %green%███%reset%\n${" ".repeat(process.stdout.columns / 2 - 28 / 2)}%red%█%reset%  %red%█%reset% %blue%█%reset%   %purpule%█%reset%  %purpule%██%reset% %yellow%█%reset%    %aqua%███%reset%  %green%█%reset%\n${" ".repeat(process.stdout.columns / 2 - 28 / 2)}%red%████%reset% %blue%███%reset% %purpule%█%reset%  %purpule%██%reset% %yellow%██%reset%    %aqua%█%reset%   %green%██%reset%\n${" ".repeat(process.stdout.columns / 2 - 28 / 2)}%red%█%reset% %red%█%reset%  %blue%█%reset%   %purpule%█%reset%  %purpule%██%reset% %yellow%█%reset%     %aqua%█%reset%   %green%█%reset%\n${" ".repeat(process.stdout.columns / 2 - 28 / 2)}%red%█%reset%  %red%█%reset% %blue%███%reset% %purpule%████%reset%  %yellow%███%reset%   %aqua%█%reset%   %green%███%reset%\n\n\n  %green%➜%reset%  press h to show help\n  %green%➜%reset%  press c to clear\n  %green%➜%reset%  press r to restart\n  %green%➜%reset%  press e to exit\n\n\n\n`); // Log
        }
        // try {
        //     client.user.edit({ avatar: "./cdn/img/avatar.gif" });
        // } catch (err) { return "Unable to apply bot avatar"; }
    }
}