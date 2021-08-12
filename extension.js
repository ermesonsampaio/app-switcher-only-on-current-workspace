const GETTEXT_DOMAIN = 'appswitcher-only-current-workspace';

const { GObject, St, GLib } = imports.gi;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
  _init() {
    super._init(0.0, _('App Switcher Only Current Workspace'));

    this.add_child(
      new St.Icon({
        icon_name: 'view-grid-symbolic',
        style_class: 'icon',
      }),
    );

    const activate = new PopupMenu.PopupImageMenuItem(_('Activate'), 'emblem-ok-symbolic');
    const disable = new PopupMenu.PopupImageMenuItem(_('Disable'), 'application-exit-symbolic');
    
    this.menu.addMenuItem(activate);
    this.menu.addMenuItem(disable);

    activate.connect('activate', () => this._configureAppSwitcher(true));
    disable.connect('activate', () => this._configureAppSwitcher(false));
  }

  _configureAppSwitcher(value = false) {
    const script = `
    gsettings set org.gnome.shell.app-switcher current-workspace-only ${value}
    notify-send "${_('Changes loaded successfully!')}" "" -i "utilities-terminal-symbolic" -a "App Switcher Only Current Workspace" -t 3000
    `;
    GLib.spawn_command_line_async(`bash -c '${script}'`);
  }
}
);

class Extension {
  constructor(uuid) {
    this._uuid = uuid;

    ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
  }

  enable() {
    this._indicator = new Indicator();
    Main.panel.addToStatusArea(this._uuid, this._indicator);
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}

function init(meta) {
  return new Extension(meta.uuid);
}
