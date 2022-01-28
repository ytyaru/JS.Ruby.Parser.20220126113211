window.addEventListener('load', (event) => {
    /*
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
    */

    // ｛｝→<ruby>
    let rh = new Parser([RubyParseSetFactory.RootHtml]);
    text = 'ルート書式。ここから小説共通書式に変換し、HTMLに変換できる。私｛わたし｝は漢字｛かんじ｝をHTML｛ハイパー テキスト マークアップ ランゲージ｝に変換｛へんかん｝します。ＨＴＭＬ｛Hyper Text Markup Language｝。字種を問わずルビを振りたいなら縦線（パイプライン）を使う。次のように。｜おとぎ話｛フェアリーストーリー｝。';
    let html = rh.parse(text);
    console.log(text)
    console.log(html)
    document.body.innerHTML += `<p>${text}</p><p>${html}</p>`

    // ｛｝→｜《》
    const rn = new Parser([RubyParseSetFactory.RootNovel]);
    let novel = rn.parse(text);
    console.log(novel)
    document.body.innerHTML += `<p>${novel}</p>`

    // ｜《》→<ruby>
    const nh = new Parser([RubyParseSetFactory.NovelHtml]);
    html = nh.parse(novel);
    console.log(html)
    document.body.innerHTML += `<p>${html}</p><hr>`

    // 青空文庫→｜《》
    //parser = new Parser([RubyParseSetFactory.AozoraNovel]);
    parser = new Parser(RubyParseSetFactory.AozoraNovel);
    text = '青空文庫《あおぞらぶんこ》の書式。｜AOZORA《あおぞら》。'
    novel = parser.parse(text)
    html = nh.parse(novel)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><p>${html}</p><hr>`
    // 青空文庫→HTML
    let aoh = new Parser(RubyParseSetFactory.AozoraHtml);
    html = aoh.parse(text);
    document.body.innerHTML += `<p>${text}</p><p>${html}</p><hr>`

    // カクヨム→｜《》
    parser = new Parser(RubyParseSetFactory.KakuyomuNovel);
    text = 'カクヨム《かくよむ》の書式。青空文庫と同じ。｜KAKU-YOMU《カクヨム》。書読《かくよむ》。｜カクヨム《かくよむ》。'
    novel = parser.parse(text)
    html = nh.parse(novel)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><p>${html}</p><hr>`
    // カクヨム→HTML
    let kh = new Parser(RubyParseSetFactory.KakuyomuHtml);
    html = kh.parse(text);
    document.body.innerHTML += `<p>${text}</p><p>${html}</p><hr>`

    // 小説家になろう→｜《》
    parser = new Parser([RubyParseSetFactory.NarouNovel]);
    text = '小説家になろうの書式。山田（やまだ）。｜おとぎ話《フェアリーストーリー》。'
    novel = parser.parse(text)
    html = nh.parse(novel)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><p>${html}</p><hr>`
    // 小説家になろう→HTML
    console.log(RubyParseSetFactory.NarouHtml)
    let nah = new Parser([RubyParseSetFactory.NarouHtml]);
    html = nah.parse(text);
    document.body.innerHTML += `<p>${text}</p><p>${html}</p><hr>`

    // ハーメルン→｜《》
    parser = new Parser([RubyParseSetFactory.HamelnNovel]);
    text = 'ハーメルンの書式。|山田《やまだ》。|おとぎ話《フェアリーストーリー》。'
    novel = parser.parse(text)
    html = nh.parse(novel)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><p>${html}</p><hr>`
    // ハーメルン→HTML
    let hh = new Parser([RubyParseSetFactory.HamelnHtml]);
    html = nh.parse(text);
    document.body.innerHTML += `<p>${text}</p><p>${html}</p><hr>`

    // アルファポリス→｜《》
    parser = new Parser([RubyParseSetFactory.AlphaPoliceNovel]);
    text = 'アルファポリスの書式。#宇宙__そら__#が光って。'
    novel = parser.parse(text)
    html = nh.parse(novel)
    document.body.innerHTML += `<p>${text}</p><p>${novel}</p><p>${html}</p><hr>`
    // ｜《》→アルファポリス→HTML
    parser = new Parser([RubyParseSetFactory.NovelAlphaPolice]);
    text = parser.parse(novel)
    const ah = new Parser([RubyParseSetFactory.AlphaPoliceHtml]);
    html = ah.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${html}</p><hr>`

    // でんでんマークダウン→｜《》
    let dn = new Parser(RubyParseSetFactory.DendenNovel);
    let denden = 'でんでんマークダウン→小説形式→HTMLに変換する。{漢字|かんじ}。{漢字|かん|じ}。'
    novel = dn.parse(denden)
    html = nh.parse(novel)
    document.body.innerHTML += `<p>${denden}</p><p>${novel}</p><p>${html}</p><hr>`
    // ｜《》→でんでんマークダウン→HTML
    parser = new Parser([RubyParseSetFactory.NovelDenden]);
    novel = '小説形式→でんでんマークダウン形式→HTMLに変換する。｜山田《やまだ》。｜山《やま》｜田《だ》。｜おとぎ話《フェアリーストーリー》。'
    denden = parser.parse(novel)
    let dh = new Parser(RubyParseSetFactory.DendenHtml);
    html = dh.parse(denden)
    document.body.innerHTML += `<p>${novel}</p><p>${denden}</p><p>${html}</p><hr>`

    // でんでん→HTML
    text = 'でんでん→HTML。{漢字|かん|じ}。{漢字|かんじ}。'
    html = dh.parse(text)
    document.body.innerHTML += `<p>${text}</p><p>${html}</p><hr>`

});
