/* tslint:disable no-console */

import { Migration } from './index';
import { getFromLocalStorage, saveToLocalStorage } from './utils';

export default class implements Migration {
  public name = 'v0-to-v1';

  public shouldRun(): boolean {
    const settings = getFromLocalStorage('settingsStore');

    if (settings && settings.schemaVersion === undefined) {
      return true;
    }

    return false;
  }

  public run() {
    const settings = getFromLocalStorage('settingsStore');
    settings.schemaVersion = 1;
    console.log('[migration] Upgrading schema version to 1');
    saveToLocalStorage('settingsStore', settings);
  }
}
