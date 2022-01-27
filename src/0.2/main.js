window.addEventListener('load', (event) => {

    const r = new Ruby();
    let text = '私｛わたし｝は漢字｛かんじ｝をHTML｛ハイパー テキスト マークアップ ランゲージ｝に変換｛へんかん｝します。ＨＴＭＬ｛Hyper Text Markup Language｝。字種を問わずルビを振りたいなら縦線（パイプライン）を使う。次のように。｜おとぎ話｛フェアリーストーリー｝。';
    let html = r.toHtml(text)
    let md = r.toMarkdown(text)
    let novel = r.toNovel(text)
    let aozora = r.toAozora(text)
    let kakuyomu = r.toKakuyomu(text)
    let narou = r.toNarou(text)
    let denden = r.toDenden(text)
    console.log(text)
    console.log(html)
    console.log(md)
    console.log(novel)
    console.log(aozora)
    console.log(kakuyomu)
    console.log(narou)
    console.log(denden)
    document.body.innerHTML += `${text}<br>${html}<br>${md}<br>${novel}<br>${aozora}<br>${kakuyomu}<br>${narou}<br>${denden}<br><br>`
    /*
    const s = new ShortRubyParser();
    console.log(s)
    console.log(s.RegEx)
    text = '私（わたし）は漢字（かんじ）をHTML（ハイパー テキスト マークアップ ランゲージ）に変換（へんかん）します。ＨＴＭＬ（Hyper Text Markup Language）。連続した漢字・英数字の前にカッコを置くとルビだと判断される。';
    html = s.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '私(わたし)は漢字(かんじ)をHTML(ハイパー テキスト マークアップ ランゲージ)に変換(へんかん)します。ＨＴＭＬ(Hyper Text Markup Language)。';
    html = s.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '私《わたし》は漢字《かんじ》をHTML《ハイパー テキスト マークアップ ランゲージ》に変換《へんかん》します。ＨＴＭＬ《Hyper Text Markup Language》。';
    html = s.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = 'ひらがな（よみ）やカタカナ（よみ）の前にカッコを置いてもルビにならない。';
    html = s.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '漢字＼（心の中の叫び）のようにカッコの前にバックスラッシュを入力するとエスケープできる。';
    html = s.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`



    let p = new LongRubyParser();
    text = '｜私（わたし）は｜漢字（かんじ）を｜HTML（ハイパー テキスト マークアップ ランゲージ）に｜変換（へんかん）します。｜ＨＴＭＬ（Hyper Text Markup Language）。連続した漢字・英数字の前にカッコを置くとルビだと判断される。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '|私(わたし)は|漢字(かんじ)を|HTML(ハイパー テキスト マークアップ ランゲージ)に|変換(へんかん)します。|ＨＴＭＬ(Hyper Text Markup Language)。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '｜私《わたし》は｜漢字《かんじ》を｜HTML《ハイパー テキスト マークアップ ランゲージ》に｜変換《へんかん》します。ＨＴＭＬ《Hyper Text Markup Language》。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '｜ひらがな（よみ）や｜カタカナ（よみ）の前に｜とカッコを置けばルビをつけることができる。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '|ひらがな(よみ)や|カタカナ(よみ)の前に｜とカッコを置けばルビをつけることができる。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = '｜ひらがな《よみ》や｜カタカナ《よみ》の前に｜とカッコを置けばルビをつけることができる。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    text = 'メタ文字のエスケープはできない。小説投稿サイトだとカッコの直前で｜を入力すればメタ文字自体を出力できる。けれどその処理を実装するのが面倒だったし、ユーザにとってもムダに複雑化してしまう。実行処理速度もさがる。なのでメタ文字は出力できない仕様にしてしまうことにした。その代わりメタ文字は選べる。独自形式として｛｝を採用することにした。さらにこの独自形式から各投稿サイトの形式に変換できるようにすれば実質何の問題もない。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`

    const ns = new NovelShortRubyParser() 
    text = '私｛わたし｝は漢字｛かんじ｝をHTML｛ハイパー テキスト マークアップ ランゲージ｝に変換｛へんかん｝します。ＨＴＭＬ｛Hyper Text Markup Language｝。';
    html = ns.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`
    */

});
