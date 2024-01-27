module.exports = (...args) => {
    args.forEach(log => {
        if (log === "" || log  === "\n") {
            console.log("\n");
        } else {
            log = require("./parseColor")(log);
            console.log(`  ↪ [\x1b[90m${(new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate())}/${(new Date().getMonth()+1 < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1)}/${(new Date().getFullYear() < 10 ? `0${new Date().getFullYear()}` : new Date().getFullYear())} ${(new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours())}:${(new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes())}:${(new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds())}\x1b[0m] ${log}\x1b[0m`);
        }
    });
}