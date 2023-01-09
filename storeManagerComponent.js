export class StoreManager {
  static getInstance() {
    if (!this.instance) {
      this.instance = new StoreManager();
    }
    return this.instance;
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}
