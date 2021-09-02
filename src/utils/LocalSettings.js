const LocalSettingsName = 'settings';

export default class LocalSettings {
  static setOne (item) {
    let settings = this.getAll();
    settings = {...settings, item};
    localStorage.setItem(LocalSettingsName, JSON.stringify(settings));
  }

  static getOne (itemName) {
    let settings = this.getAll();
    return settings[itemName]
  }

  static setAll (settings) {
    localStorage.setItem(LocalSettingsName, JSON.stringify(settings));
  }

  static getAll () {
    let settings = localStorage.getItem(LocalSettingsName);
    return settings ? JSON.parse(settings) : {};
  }
}