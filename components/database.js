module.exports = {
    set: async (path, data, client) => {
        try {
            client.data.db.ref(path).set(data);
        } catch (err) { console.error(err); }
    },
    get: async (path, client) => {
        try {
            const dataSnap = await client.data.db.ref(path).once("value");
            if (dataSnap.val()) return dataSnap.val();
            return {};
        } catch (err) { console.error(err); }
    }
}