#!/bin/bash
# SessionStart hook: Claude Code on the web のコンテナに、このリポジトリの
# ビルド (perl regen-index.pl) に必要なものを揃える。
#
# - Text::Xslate / Text::Markdown::Discount: regen-index.pl の依存 (cpanfile)
# - lefthook: pre-commit で notes の created/updated frontmatter を付与する
#
# ローカル環境では何もしない ($CLAUDE_CODE_REMOTE が true のときだけ動く)。
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

log() { echo "[session-start] $*"; }

apt_install() {
  # apt のインデックスが古いコンテナでも通るように、失敗したら update して再試行する。
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "$@" \
    || { apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends "$@"; }
}

# --- Perl の依存 ---------------------------------------------------------
# Text::Xslate は XS モジュールでソースからのビルドが重いので、Debian/Ubuntu の
# パッケージがあればそれを使う。Text::Markdown::Discount は apt 版 (0.16) だと
# regen-index.pl が使う MKD_FENCEDCODE 定数を持たないため、CPAN から入れる。
if ! perl -MText::Xslate -MText::Markdown::Discount -e 'Text::Markdown::Discount::MKD_FENCEDCODE()' >/dev/null 2>&1; then
  log "installing perl build deps via apt"
  apt_install cpanminus build-essential libtext-xslate-perl

  log "installing cpanfile deps via cpanm"
  cpanm --installdeps --notest .
else
  log "perl deps already present"
fi

perl -MText::Xslate -MText::Markdown::Discount \
  -e 'Text::Markdown::Discount::MKD_FENCEDCODE(); print "[session-start] perl deps OK\n"'

# --- lefthook ------------------------------------------------------------
# notes/src/*.md の created/updated frontmatter は pre-commit フックで付く。
# 入らなくてもビルドや閲覧には影響しないので、ここは best-effort に留める。
if ! command -v mise >/dev/null 2>&1; then
  log "installing mise"
  curl -fsSL https://mise.run | sh >/dev/null 2>&1 || log "WARN: mise install failed"
fi

MISE_BIN="$(command -v mise || echo "$HOME/.local/bin/mise")"
if [ -x "$MISE_BIN" ]; then
  echo "export PATH=\"\$HOME/.local/bin:\$PATH\"" >> "${CLAUDE_ENV_FILE:-/dev/null}"
  if "$MISE_BIN" install >/dev/null 2>&1 && "$MISE_BIN" exec -- lefthook install >/dev/null 2>&1; then
    log "lefthook installed"
  else
    log "WARN: lefthook setup failed; commit hooks (note dates) will not run"
  fi
else
  log "WARN: mise unavailable; commit hooks (note dates) will not run"
fi

log "done"
