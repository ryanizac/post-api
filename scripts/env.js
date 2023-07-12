class Env {
  /**
   * @param {string} key
   * @returns {string | undefined}
   */
  static load(key) {
    const value = process.env[key];
    return value?.trim();
  }

  /**
   * @param {string} key
   * @param {string} compare
   * @returns {boolean}
   */
  static compare(key, compare) {
    const value = this.load(key);
    return value === compare;
  }
}

module.exports = Env;
