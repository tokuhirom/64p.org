#!/bin/sh
# デモ用の WebAssembly 版 mutsu を npm から取ってきて vendor/mutsu-wasm/ に展開する。
# 会場のネットワークに依存しないよう、発表前に一度実行しておくこと。
# 使い方: sh fetch-mutsu-wasm.sh [VERSION]   (デフォルトは demo.html の VERSION)
set -eu
cd "$(dirname "$0")"
VERSION="${1:-$(sed -n "s/^const VERSION = '\([^']*\)'.*/\1/p" demo.html)}"
DEST=vendor/mutsu-wasm
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

META="$TMP/meta.json"
curl -fsSL "https://registry.npmjs.org/@tokuhirom%2fmutsu/$VERSION" -o "$META"
URL=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["dist"]["tarball"])' "$META")
SRI=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["dist"]["integrity"])' "$META")

curl -fsSL "$URL" -o "$TMP/pkg.tgz"
GOT="sha512-$(openssl dgst -sha512 -binary "$TMP/pkg.tgz" | base64 | tr -d '\n')"
if [ "$GOT" != "$SRI" ]; then
  echo "integrity mismatch: expected $SRI, got $GOT" >&2
  exit 1
fi

rm -rf "$DEST"
mkdir -p "$DEST"
tar xzf "$TMP/pkg.tgz" -C "$DEST" --strip-components=1
echo "$VERSION" > "$DEST/VERSION"
echo "mutsu $VERSION -> $DEST"
ls -la "$DEST"
