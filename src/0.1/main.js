window.addEventListener('load', (event) => {
    /*
    class ShortRubyParserTest {
        #KANJI = '\\u2e80-\\u2fdf\\u3005\\3007\\303b\\u4e00-\\u9faf\\u3400-\\u4dbf\\uf900-\\ufaff';
        #ALPHABET = 'A-Za-z0-9Ａ-Ｚａ-ｚ０-９';
        #RB_LEN = 20;
        #RT_LEN = 50;
        #REGEX = new RegExp(`([${this.#KANJI}${this.#ALPHABET}]{1,${this.#RB_LEN}}?)[(（《]([^\\n]{1,${this.#RT_LEN}}?)[)）》]`, 'g');
        parse(text) {
            return text.replace(this.#REGEX, (match, rb, rt)=>{
                return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>`;
            });
        }
        //  /([\u2e80-\u2fdf\u3005\3007\303b\u4e00-\u9faf\u3400-\u4dbf\uf900-\ufaffA-Za-z0-9Ａ-Ｚａ-ｚ０-９]{1,20}?)[(（《]([^\n]{1,50}?)[)）》]/g
        //   /([^\n]{1,10}?)[\(（《\{｛]([^\n]{1,20}?)[\)）》\}｝]/g
    }
    const T = new ShortRubyParserTest();
    console.log(T);
    */

    const s = new ShortRubyParser();
    console.log(s)
    console.log(s.RegEx)
    let text = '私（わたし）は漢字（かんじ）をHTML（ハイパー テキスト マークアップ ランゲージ）に変換（へんかん）します。ＨＴＭＬ（Hyper Text Markup Language）。連続した漢字・英数字の前にカッコを置くとルビだと判断される。';
    let html = s.parse(text)
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






    /*
    class LongRubyParser {
        #RB_LEN = 20;
        #RT_LEN = 50;
        #REGEX = new RegExp(`[^\\\\＼][\|｜]([^\\n]{1,${this.#RB_LEN}}?)[(（《]([^\\n]{1,${this.#RT_LEN}}?)[)）》]`, 'g');
        parse(text) {
            return text.replace(this.#REGEX, (match, rb, rt)=>{
                return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>`;
            });
        }
    }
    */

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

    text = 'ルビにせずカッコを使いたいときもあるよね。たとえば心の中で考えていることをカッコ内で表現するとか。｜漢字（こんなふうに）。';
    html = p.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}<br><br>`







});
