import * as firebase from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, get, set, remove, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

firebase.initializeApp({
    apiKey: localStorage.getItem("apiKey"),
    authDomain: "blueprint-bot-db.firebaseapp.com",
    databaseURL: "https://blueprint-bot-db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blueprint-bot-db",
    storageBucket: "blueprint-bot-db.appspot.com",
    messagingSenderId: "857297152967",
    appId: "1:857297152967:web:e0300cf5ea5023a70d87e2",
    measurementId: "G-KLZWSZ8ZP2"
});


const db = getDatabase();

export async function getData(path) {
    try {
        const dataSnap = await get(ref(db, (path.startsWith("/") ? path : `/${path}`)));
        return dataSnap.val();
    } catch (err) { console.error(err); }
}
export async function setData(path, data) {
    try {
        set(ref(db, (path.startsWith("/") ? path : `/${path}`)), data);
    } catch (err) { console.error(err); }
}
export async function removeData(path) {
    try {
        remove(ref(db, (path.startsWith("/") ? path : `/${path}`)));
    } catch (err) { console.error(err); }
}

export async function listener(path, callback) {
    try {
        onValue(ref(db, (path.startsWith("/") ? path : `/${path}`)), (snapshot) => callback(snapshot.val()));
    } catch (err) { console.error(err); }
}