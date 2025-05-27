type StorageKey = "auth" | "remember";

export default {
  get(key: StorageKey) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return value;
  },

  set(key: StorageKey, value: string) {
    localStorage.setItem(key, value);
  },

  remove(key: StorageKey) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
