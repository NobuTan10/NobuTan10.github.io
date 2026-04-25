# Nobuhiro Tanno — Personal Homepage

NYAS（New York Academy of Sciences）に提出した resume をベースにした、英語／日本語切替対応の個人ホームページ（静的サイト）です。GitHub Pages で公開する想定で構成しています。

---

## 1. ファイル構成

```
personal-homepage/
├── index.html      # ページ本体（英日両方のテキストを data 属性で保持）
├── styles.css      # デザイン（Hybrid: Academic + Modern）
├── script.js       # 言語切替（EN/JA）、スクロール演出、年号など
├── .nojekyll       # GitHub Pages で Jekyll 処理を無効化（_ で始まるファイル対策）
├── .gitignore      # macOS / VS Code 用の除外設定
└── README.md       # このファイル
```

---

## 2. ローカルでプレビュー（VS Code）

### 方法 A: ダブルクリック
`index.html` をダブルクリックするだけでブラウザで開けます。

### 方法 B: VS Code + Live Server（おすすめ）
1. VS Code を開く
2. このフォルダ（`personal-homepage`）をドラッグ＆ドロップして開く
3. 拡張機能パネルで **「Live Server」** （作者: Ritwick Dey）を検索してインストール
4. `index.html` を開いた状態で右下の **「Go Live」** をクリック
5. ブラウザが自動で開き、保存するたびに自動でリロードされます

---

## 3. GitHub に公開（はじめての場合）

### Step 1. GitHub にリポジトリを作成

GitHub の自分のアカウントで **新しいリポジトリ** を作ります。リポジトリ名には 2 つの選択肢があります：

| リポジトリ名 | 公開URL | 用途 |
|---|---|---|
| `nobutan10.github.io` | `https://nobutan10.github.io/` | **ユーザーサイト**（おすすめ。トップドメインに公開できる） |
| `personal-homepage` など任意 | `https://nobutan10.github.io/personal-homepage/` | プロジェクトサイト |

> SSH（Science to Society Hub）と同じパターンで `https://nobutan10.github.io/personal-homepage/` にしたい場合は後者でも OK です。ご自身のホームページをトップドメインに置きたい場合は `nobutan10.github.io` を推奨します。

リポジトリ作成時の設定：
- **Public** にする（GitHub Pages の無料枠で公開するため）
- README, .gitignore, license は **追加しない**（このフォルダにすでにあるため）

### Step 2. VS Code でこのフォルダを Git リポジトリ化 → push

VS Code の左サイドバーの **Source Control（ブランチアイコン）** から GUI で操作できますが、ターミナル（VS Code 内の「ターミナル」→「新しいターミナル」）で以下のコマンドを順に実行するのが確実です。

```bash
# このフォルダに移動（VS Code でフォルダを開いていれば cd 不要）
cd "/Users/tannonobuhiro/Dropbox/Job Hunting New/personal-homepage"

# Git 初期化
git init
git branch -M main

# 全ファイルをコミット
git add .
git commit -m "Initial commit: personal homepage"

# 自分のリポジトリと紐付け（URL は Step 1 で作ったリポジトリのものに置き換え）
git remote add origin https://github.com/nobutan10/nobutan10.github.io.git

# push
git push -u origin main
```

> 初回 push 時に GitHub のユーザー名／パスワード（または Personal Access Token）を求められます。VS Code 経由で Git 認証している場合はブラウザでサインインを求められます。

### Step 3. GitHub Pages を有効化

1. GitHub の該当リポジトリのページを開く
2. **Settings** → サイドバーの **Pages**
3. **Source** を **Deploy from a branch** に設定
4. **Branch** を **`main` / `(root)`** に設定 → **Save**
5. 数十秒〜数分待つと、上部に公開URLが表示されます

公開URLの例：
- `https://nobutan10.github.io/`（リポジトリ名が `nobutan10.github.io` の場合）
- `https://nobutan10.github.io/personal-homepage/`（リポジトリ名が `personal-homepage` の場合）

---

## 4. 内容の更新方法

1. VS Code で `index.html` を編集（テキストの内容、職歴、リンクなど）
2. ブラウザで Live Server を使ってプレビューを確認
3. ターミナルで以下を実行して反映：

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Pages は数十秒〜数分で自動で更新されます。

---

## 5. カスタマイズ・ヒント

### テキスト編集
英語と日本語の両方を、HTML の `data-en="..."` と `data-ja="..."` 属性に入れています。両方を更新してください。

```html
<p data-en="Hello" data-ja="こんにちは">Hello</p>
```

タグの中身（`>Hello<`）は初期表示用です。`script.js` が読み込まれた時点で、ブラウザの言語または保存された言語設定に応じて自動で書き換えられます。

### 色やフォントの変更
`styles.css` の冒頭に CSS カスタムプロパティを集約しています。

```css
:root {
  --color-accent: #1f3a5f;   /* 強調色を変えたい場合はここ */
  --font-serif: "Cormorant Garamond", ...;
  --font-sans: "Inter", ...;
}
```

### セクションの追加
`<section id="..." class="section">` ブロックを既存のものに合わせてコピーし、ナビゲーション（`.nav-links`）にもリンクを足してください。

### 印刷／PDF出力
ブラウザで `Cmd + P`（Mac）→ PDFとして保存。CSS に印刷用スタイルを入れているため、ナビ・ボタン等は自動で非表示になります。

---

## 6. よくある詰まりどころ

- **GitHub Pages にしてもページが表示されない** → Settings → Pages の Branch が `main` / `(root)` になっているか確認。リポジトリは Public か確認。
- **`git push` でエラー** → リモートURLが間違っている可能性。`git remote -v` で確認、`git remote set-url origin <正しいURL>` で修正。
- **Pages の URL に飛んだら README の内容が出る** → リポジトリ直下に `index.html` があるか確認。
- **言語切替ボタンが効かない** → ブラウザのコンソールでエラーを確認。`script.js` が正しく読み込まれているか確認。

---

## 7. 連絡先

Nobuhiro Tanno, M.D., Ph.D.
gift.of.magi.2007@gmail.com
