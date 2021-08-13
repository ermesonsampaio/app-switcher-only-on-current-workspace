const { GLib, Gio } = imports.gi;

class Extension {
  constructor(uuid) {
    this._uuid = uuid;
  }

  enable() {
		this._settings = new Gio.Settings({ schema: 'org.gnome.shell.app-switcher' });
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
