module.exports = {
    get: async (path, client) => {
        try {
            const dataSnap = await client.data.db.ref((path.startsWith("/") ? path : `/${path}`)).once("value");
            if (dataSnap.val()) return dataSnap.val();
            return {};
        } catch (err) { console.error(err); }
    },
    set: async (path, data, client) => {
        try {
            client.data.db.ref((path.startsWith("/") ? path : `/${path}`)).set(data);
        } catch (err) { console.error(err); }
    },
    delete: async (path, client) => {
        try {
            client.data.db.ref((path.startsWith("/") ? path : `/${path}`)).remove();
        } catch (err) { console.error(err); }
    }
}