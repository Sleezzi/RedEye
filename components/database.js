const firebase = require("firebase-admin");
firebase.initializeApp({
    credential: firebase.credential.cert(require("../config.json").firebase),
    databaseURL: "https://blueprint-bot-db-default-rtdb.europe-west1.firebasedatabase.app/"
});

const db = firebase.database();

let data;



module.exports = {
    initialize: async () => {
        async function refresh() {
            const dataSnap = await db.ref("/").once("value");
            if (dataSnap.val()) data = dataSnap.val();
        }
        refresh();
        setInterval(refresh, 15_000);
    },
    get: async (path) => {
        try {
            let currentObj = data;
            for (const name of path.split("/").filter(part => part !== "")) {
                if (!currentObj[name]) {
                    currentObj[name] = {};
                }
                currentObj = currentObj[name]
            };
            return currentObj;
        } catch (err) { console.error(err); }
    },
    set: async (path, newData) => {
        try {
            function navigate(obj, parts) {
                if (parts.length === 1) {
                    obj[parts[0]] = newData;
                    return;
                } else obj[parts[0]] = {}
                
                const currentPart = parts.shift();
                if (obj) {
                    navigate(obj[currentPart], parts);
                }
            }
            navigate(data, path.split("/").filter(part => part !== ""));
            db.ref((path.startsWith("/") ? path : `/${path}`)).set(newData);
        } catch (err) { console.error(err); }
    },
    delete: async (path) => {
        try {
            function navigate(obj, parts) {
                if (parts.length === 1) {
                    delete obj[parts[0]];
                    return;
                }
                
                const currentPart = parts.shift();
                if (obj && obj.hasOwnProperty(currentPart)) {
                    navigate(obj[currentPart], parts);
                }
            }
            navigate(data, path.split("/").filter(part => part !== ""));
            db.ref((path.startsWith("/") ? path : `/${path}`)).remove();
        } catch (err) { console.error(err); }
    }
}