EXTENSION_PATH="$HOME/.local/share/gnome-shell/extensions/appswitcheronlyoncurrentworkspace@ermesonsampaio.com"

rm -rf "$EXTENSION_PATH"
./build.sh

mkdir -p "$EXTENSION_PATH"
unzip extension.zip -d "$EXTENSION_PATH"

rm extension.zip
