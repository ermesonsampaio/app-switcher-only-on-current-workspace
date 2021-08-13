const { GLib, Gio } = imports.gi;

class Extension {
  constructor(uuid) {
    this._uuid = uuid;
    this._settings = new Gio.Settings({ schema: 'org.gnome.shell.app-switcher' });
  }

  enable() {
    this._configureAppSwitcher(true);
  }

  disable() {
    this._configureAppSwitcher(false);
  }

  _configureAppSwitcher(value) {
    this._settings.set_boolean('current-workspace-only', value);
  }
}

function init(meta) {
  return new Extension(meta.uuid);
}
