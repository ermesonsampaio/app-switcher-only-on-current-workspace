const { GLib } = imports.gi;

class Extension {
  constructor(uuid) {
    this._uuid = uuid;
  }

  enable() {
    this._configureAppSwitcher(true);
  }

  disable() {
    this._configureAppSwitcher(false);
  }

  _configureAppSwitcher(value) {
    GLib.spawn_command_line_async(`gsettings set org.gnome.shell.app-switcher current-workspace-only ${value}`);
  }
}

function init(meta) {
  return new Extension(meta.uuid);
}
