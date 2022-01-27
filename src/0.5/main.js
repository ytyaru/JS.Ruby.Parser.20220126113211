window.addEventListener('load', (event) => {
    let input = '|青空《あおぞら》ですなぁ。';
    let output = input.replace(/\|([^\\n]{1,}?)《([^\\n]{1,}?)》/g, (match, rb, rt)=>{ // Long
        return `|${rb}《${rt}》`;
    });
    console.log(input);
    console.log(output);
    output = output.replace(/([^\\n]{1,}?)《([^\\n]{1,}?)》/g, (match, rb, rt)=>{ // Short
        return `|${rb}《${rt}》`;
    });
    console.log(output);


    // ｛｝→<ruby>
    let parser = new Parser([RubyParseSetFactory.RootHtml]);
    text = '私｛わたし｝は漢字｛かんじ｝をHTML｛ハイパー テキスト マークアップ ランゲージ｝に変換｛へんかん｝します。ＨＴＭＬ｛Hyper Text Markup Language｝。字種を問わずルビを振りたいなら縦線（パイプライン）を使う。次のように。｜おとぎ話｛フェアリーストーリー｝。';
    let html = parser.parse(text);
    console.log(text)
    console.log(html)
    document.body.innerHTML += `<p>${text}</p><p>${html}</p>`

    // ｛｝→｜《》
    const rn = new Parser([RubyParseSetFactory.RootNovel]);
    let novel = rn.parse(text);
    console.log(novel)
    document.body.innerHTML += `<p>${novel}</p>`

    // ｜《》→<ruby>
    parser = new Parser([RubyParseSetFactory.NovelHtml]);
    html = parser.parse(novel);
    console.log(html)
    document.body.innerHTML += `<p>${html}</p><hr>`

    // 青空文庫→｜《》
    //parser = new Parser([RubyParseSetFactory.AozoraNovel]);
    parser = new Parser(RubyParseSetFactory.AozoraNovel);
    text = '青空文庫《あおぞらぶんこ》の書式。｜AOZORA《あおぞら》。'
    novel = parser.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><hr>`

    // カクヨム→｜《》
    parser = new Parser([RubyParseSetFactory.KakuyomuNovel]);
    text = 'カクヨム《かくよむ》の書式。｜KAKU-YOMU《カクヨム》。'
    novel = parser.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><hr>`

    // 小説家になろう→｜《》
    parser = new Parser([RubyParseSetFactory.NarouNovel]);
    text = '小説家になろうの書式。山田（やまだ）｜おとぎ話《フェアリーストーリー》。'
    novel = parser.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><hr>`

    // ハーメルン→｜《》
    parser = new Parser([RubyParseSetFactory.HamelnNovel]);
    text = 'ハーメルンの書式。|山田《やまだ》。|おとぎ話《フェアリーストーリー》。'
    novel = parser.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><hr>`

    // アルファポリス→｜《》
    parser = new Parser([RubyParseSetFactory.AlphaPoliceNovel]);
    text = 'アルファポリスの書式。#宇宙__そら__#が光って。'
    novel = parser.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p>`
    // ｜《》→アルファポリス
    parser = new Parser([RubyParseSetFactory.NovelAlphaPolice]);
    text = parser.parse(novel)
    document.body.innerHTML += `<p>${text}</p><hr>`

    // でんでんマークダウン→｜《》
    parser = new Parser([RubyParseSetFactory.DendenNovel]);
    let denden = 'でんでんマークダウン書式から小説形式に変換する。{漢字|かんじ}。'
    novel = parser.parse(denden)
    document.body.innerHTML += `<p>${denden}</p><p>${novel}</p><hr>`

    // ｜《》→でんでんマークダウン
    parser = new Parser([RubyParseSetFactory.NovelDenden]);
    novel = '小説形式からでんでんマークダウン形式に変換する。｜山田《やまだ》。｜おとぎ話《フェアリーストーリー》。'
    denden = parser.parse(novel)
    document.body.innerHTML += `<p>${novel}</p><p>${denden}</p><hr>`


});
