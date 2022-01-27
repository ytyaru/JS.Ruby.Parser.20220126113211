window.addEventListener('load', (event) => {
    const parse = new Parser([new ParseSet(new RubyRootInput(), new RubyHtmlOutput())]); // ParseSetはFactoryで生成したい
    let root_text = '私｛わたし｝は漢字｛かんじ｝をHTML｛ハイパー テキスト マークアップ ランゲージ｝に変換｛へんかん｝します。ＨＴＭＬ｛Hyper Text Markup Language｝。字種を問わずルビを振りたいなら縦線（パイプライン）を使う。次のように。｜おとぎ話｛フェアリーストーリー｝。';
    const html = parse.parse(root_text); // 引数：指定した入力形式。出力：指定した出力形式。
    console.log(root_text)
    console.log(html)
    document.body.innerHTML += `${root_text}<br>${html}<br><br>`
});
