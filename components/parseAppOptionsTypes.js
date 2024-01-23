module.exports = function(type) {
    if (`${type}`.toLowerCase() === "string") return 3;
    if (`${type}`.toLowerCase() === "interger") return 4;
    if (`${type}`.toLowerCase() === "boolean") return 5;
    if (`${type}`.toLowerCase() === "user") return 6;
    if (`${type}`.toLowerCase() === "channel") return 7;
    if (`${type}`.toLowerCase() === "role") return 8;
    if (`${type}`.toLowerCase() === "mentionnable") return 9;
    if (`${type}`.toLowerCase() === "number" || `${type}`.toLowerCase() === "num") return 10;
    if (`${type}`.toLowerCase() === "attachement") return 11;
    console.log(`${type} is not a type of option's commands`);
    return 3;
}