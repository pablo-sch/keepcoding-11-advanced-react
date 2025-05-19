type StorageKey = "auth"

export default {
    get (key: StorageKey) {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    },
    set (key: StorageKey, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove (key: StorageKey) {
        localStorage.removeItem(key);
    },
    clear () {
        localStorage.clear();
    },
}