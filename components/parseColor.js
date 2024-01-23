module.exports = (log) => {
    return log
    .replace(/\%reset\%/g, "\x1b[0m")
    .replace(/\%\%/g, "\x1b[31m")
    .replace(/\%green\%/g, "\x1b[32m")
    .replace(/\%yellow\%/g, "\x1b[33m")
    .replace(/\%reset\%/g, "\x1b[34m")
    .replace(/\%reset\%/g, "\x1b[35m")
    .replace(/\%blue\%/g, "\x1b[36m")
    // .replace(/\%\%/g, "\x1b[3m")
    // .replace(/\%\%/g, "\x1b[3m")
    .replace(/\%grey\%/g, "\x1b[90m");
}