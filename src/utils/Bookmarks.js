let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome: browser;

export default class Bookmarks {
  static async add (title, url) {
    return new Promise(async (resolve) => {

      let result = await this.search();

      if (result && result.length > 0) {
        let res = await this.newBk(result[0].id, title, url)
        resolve(res);
      }
      else {
        let folderId = await this.createFolder();
        let res = await this.newBk(folderId, title, url)
        resolve(res)
      }
    });
  }

  static async search (query = 'JSONPlay') {
    return new Promise(resolve => {
      chrome.bookmarks.search(query, async (result) => {
        resolve(result)
      })
    })
  }

  static async newBk (parentId, title, url) {
    return new Promise(async (resolve) => {
      let children = await this.getChildren(parentId)

      if (children && children.length > 0 && !children.some(obj => obj.url === url)) {
        chrome.bookmarks.create({ parentId, title, url }, () => { resolve(true); });
      }

      if (children && children.length < 1) {
        chrome.bookmarks.create({ parentId, title, url }, () => { resolve(true); });
      }

    });
  }

  static async createFolder () {
    return new Promise(resolve => {
      chrome.bookmarks.create({ 'parentId': "1", 'title': 'JSONPlay' }, ({ id }) => {
        resolve(id);
      });
    });
  }

  static async getChildren (parentId) {
    return new Promise(resolve => {
      chrome.bookmarks.getChildren(parentId, (children) => { resolve(children); })
    });
  }
}