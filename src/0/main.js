window.addEventListener('load', (event) => {
    class ShortRubyParser {
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
    }
    const s = new ShortRubyParser();
    const text = '私（わたし）は漢字（かんじ）をHTML（ハイパー テキスト マークアップ ランゲージ）に変換（変換）します。';
    const html = s.parse(text)
    console.log(text);
    console.log(html);
    document.body.innerHTML += `${text}<br>${html}`
});
