module.exports = {
    name: "DatabaseHandler",
    event: "ClientReady",
    type: "once",
    async execute([], serverData, client, Discord) {
        try {
            // const firebase = require("firebase-admin");
            // firebase.initializeApp({
            //     credential: firebase.credential.cert(require("../token.json").firebase),
            //     databaseURL: "https://underscore-bot-cc963-default-rtdb.europe-west1.firebasedatabase.app"
            // });
            // const db = firebase.database();
            // const dataSnap = await db.ref("/data").once("value");
            // for (const data in dataSnap.val()) client.data.level.set(data, dataSnap.val()[data]);
            // const ticketsSnap = await db.ref("/tickets").once("value");
            // for (const ticket in ticketsSnap.val()) client.data.tickets.set(ticket, ticketsSnap.val()[ticket]);
            // console.log("All of users's datas has been loaded!");
            
            // setInterval(() => {
            //     const levels = {};
            //     for (const [userId, data] of client.data.level) {
            //         levels[userId] = data;
            //     }
            //     db.ref("/data").set(levels);
            //     const tickets = {};
            //     for (const [userId, data] of client.data.tickets) {
            //         tickets[userId] = data;
            //     }
            //     db.ref("/tickets").set(tickets);
            // }, 15_000);
        } catch(err) { console.error("Data of member not loaded!\n\n", err); }
    }
}