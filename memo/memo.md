# 中間書式テキストからHTMLのrubyタグ文字列を生成する

* `｜任意《任意》`
* `漢字（ひらがな／カタカナ）`
* `アルファベット（ひらがな／カタカナ／アルファベット）`
* `（）`,`《》`,`｛｝`

　目的は以下。

* 入力が楽であること（HTMLは苦痛すぎ。Markdownの不足を補う）

```
漢字｛かんじ｝
｜漢字｛かんじ｝
```
```
＊強調（傍点、圏点）＊
```
```
＿下線＿
＝二重下線＝
〜波線〜
```
```
![[IMG-ID][]][URL-ID]
![ID][]
![テキスト]([URL-ID][])
![テキスト](https://...)

[ID][]
[テキスト][ID]
[テキスト](https://...)

[ID]:https://
```

　独自形式から他の各種形式に変換できるようにしたい。各サイトに投稿するとき、一発で変換できるように。

1. 独自形式
2. 小説投稿サイト形式
3. HTML
3. Markdown
4. PlainText

　各サイトが対応しているHTML要素は以下。

* ルビ`<ruby>`
* 傍点（カクヨムのみ。`text-emphasis-style:`）
* 挿絵（なろう。`<img>`）

　さらに私が欲しい機能。

* 下線（`text-decoration:`）
* リンク`<a>`

```html
<ruby>漢字<rp>（</rp><rt>よみ</rt><rp>）</rp></ruby>
```

　ルビの分割について。

中間書式|HTML|innerText|区切り単位
--------|----|---------|----------
`山田太郎（やまだたろう）`|`<ruby>山田太郎<rp>（</rp><rt>やまだたろう</rt><rp>）</rp></ruby>`|`山田太郎（やまだたろう）`|人名
`山田太郎（やまだ|たろう）`|`<ruby>山田<rp>（</rp><rt>やまだ</rt><rp>）</rp>太郎<rp>（</rp><rt>たろう</rt><rp>）</rp></ruby>`|`山田太郎（やまだ）太郎（たろう）`|名字、名前
`山田太郎（やま|だ|た|ろう）`|`<ruby>山<rp>（</rp><rt>やま</rt><rp>）</rp>田<rp>（</rp><rt>だ</rt><rp>）</rp>太<rp>（</rp><rt>た</rt><rp>）</rp>郎<rp>（</rp><rt>ろう</rt><rp>）</rp></ruby>`|`山（やま）田（だ）太（た）郎（ろう）`|漢字

　漢字の学習が大切ならば漢字単位で区切ればいいが、物語なら人名単位で区切るべき。細かすぎるとinnerTextのとき読みづらいから。

　名字と名前の分割をするか否か。するならどうするか。

中間書式|HTML|innerText|区切り単位
--------|----|---------|----------
`山田　太郎（やまだ　たろう）`|`<ruby>山田　太郎<rp>（</rp><rt>やまだ　たろう</rt><rp>）</rp></ruby>`|`山田　太郎（やまだ　たろう）`|人名
`山田太郎（やまだ たろう）`|`<ruby>山田太郎<rp>（</rp><rt>やまだ たろう</rt><rp>）</rp></ruby>`|`山田太郎（やまだ たろう）`|人名

　なくても日本人ならわかるだろう。それでもわかりにくいなら、読みのほうだけに半角スペースを入れてやればいい。できるだけ最小スペースになるようにするのがよい。

　アルファベットとなると事情がかわる。それが略字かどうかでも。

* `HTML（Hyper,Text,Markup,Language）`
* `HTML（エイチ・ティー・エム・エル）`
* `HTML（ハイパー・テキスト・マークアップ・ランゲージ）`

　Wikipediaでは以下のようになっている。ルビは使っておらず`（）`で表現している。

* `正式名（読み：、略：）`

　中二病だと以下のような。

* `極大消滅呪文（メドローア）`

```javascript
const parser = Parser.Narou
const parser = Parser.Kakuyomu
const parser = Parser.Aozora
const parser = Parser.Denden
const parser = Parser.Common
const parser = Parser.Free
const text = 'パースしたいテキスト。';
parser.parse(text)
```
```javascript
const builder = new ParseBuilder()

builder.Ruby = ParseBuilder.Ruby.Narou
builder.Ruby = ParseBuilder.Ruby.Kakuyomu
builder.Ruby = ParseBuilder.Ruby.Short  // 漢字（よみ）
builder.Ruby = ParseBuilder.Ruby.Long   // ｜漢字《読み》

builder.Paragraph = ParseBuilder.Paragraph.MultipleBr
builder.Paragraph = ParseBuilder.Paragraph.OnceBr
builder.Paragraph = ParseBuilder.Paragraph.MarginBr
builder.Paragraph = ParseBuilder.Paragraph.PaddingBr
```
```javascript
builder.Ruby = ParseBuilder.Ruby.Short  // 漢字（よみ）
builder.Ruby = ParseBuilder.Ruby.Long   // ｜漢字《読み》
```


