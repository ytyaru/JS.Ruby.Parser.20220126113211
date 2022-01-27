class Ruby {
    constructor(options={short:{}, long:{}}) {
        const defS = {ENC_BEGIN:'｛', ENC_END:'｝'}
        const defL = {BEGIN:'｜', ENC_BEGIN:'｛', ENC_END:'｝'}
        this._short = (options.short) ? new ShortRubyParser({ ...defS, ...options.short }) : null;
        this._long = (options.long) ? new LongRubyParser({ ...defL, ...options.long }) : null;
        console.log(this._short);
        console.log(this._long);
        console.log(this._long.parse);
        console.log(this._short.parse);
//        const optS = (options.short) ? { ...defS, ...options.short } : defS;
//        const optL = (options.long) ? { ...defL, ...options.long } : defL;
//        this._short = new ShortRubyParser(optS);
//        this._long = new LongRubyParser(optL);
//        this._short = (options.short) ? new ShortRubyParser(options.short) : null;
//        this._long = (options.long) ? new LongRubyParser(options.long) : null;
//        this._short = new ShortRubyParser(options.short);
//        this._long = new LongRubyParser(options.long);
    }
    toHtml(text) {
        let html = (this._long) ? this._long.toHtml(text) : text;
        return (this._short) ? this._short.toHtml(html) : html;
    }
    toMarkdown(text) { // 存在しないためHtmlと同じ
        return this.toHtml(text);
    }
    toNovel(text) { // ｜《》形にする（｜を省いた短縮形もすべて完全形にする）
        const l = new LongRubyParser({BEGIN:'｜', ENC_BEGIN:'｛', ENC_END:'｝'});
        const s = new ShortRubyParser({ENC_BEGIN:'｛', ENC_END:'｝'});
        return s.toLongNovel(l.toLongNovel(text));
    }
    toAozora(text) { // 《》、｜《》形にする
        const l = new LongRubyParser({BEGIN:'｜', ENC_BEGIN:'｛', ENC_END:'｝'});
        const s = new ShortRubyParser({ENC_BEGIN:'｛', ENC_END:'｝'});
        return s.toShortNovel(l.toLongNovel(text));
    }
    toKakuyomu(text) { // Aozoraと同じ
        return this.toAozora(text);
    }
    toNarou(text) { // Commonと同じ（（）を使うと誤変換しうるため）
        return this.toNovel(text)
    }
    toDenden(text) { // {漢字|かんじ}形にする
        const l = new LongRubyParser({BEGIN:'｜', ENC_BEGIN:'｛', ENC_END:'｝'});
        const s = new ShortRubyParser({ENC_BEGIN:'｛', ENC_END:'｝'});
        return s.toDenden(l.toDenden(text));
    }
}

class RubyParser {
    get RegEx() { return this._regex; }
    constructor(regex) { this._regex = regex; }
    toHtml(text) {
        return text.replace(this._regex, (match, rb, rt)=>{
            return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>`;
        });
    }
    toMarkdown(text) { return this.toHtml(text); }
    toLongNovel(text) {
        return text.replace(this._regex, (match, rb, rt)=>{
            return `｜${rb}《${rt}》`;
        });
    }
    toShortNovel(text) {
        return text.replace(this._regex, (match, rb, rt)=>{
            return `${rb}《${rt}》`;
        });
    }
    toDenden(text) {
        return text.replace(this._regex, (match, rb, rt)=>{
            return `{${rb}|${rt}}`;
        });
    }
}
class OptionalRubyParser extends RubyParser { // 字種、字数、囲み文字を制限したもの
    static #DEFAULT_OPTIONS = {
        BEGIN: '|｜',
        RB: '^\n',
        RT: '^\n',
        RB_LEN: 20,
        RT_LEN: 50,
        ENC_BEGIN: '(（《{｛',//
        ENC_END: ')）》}｝',//
    };
    #options;
    constructor(regexp, options={}) {
        super(regexp);
        this.#options = { ...OptionalRubyParser.#DEFAULT_OPTIONS, ...options };
    }
    static get DefaultOptions() { return OptionalRubyParser.#DEFAULT_OPTIONS; }
    get Options() { return this.#options; }
    get RegEx() { return super.RegEx; }
}
class LongRubyParser extends OptionalRubyParser { // 字種、字数、囲み文字を制限したもの
    constructor(options={}) {
        let opt = { ...OptionalRubyParser.DefaultOptions, ...options };
        console.log(options);
        console.log(opt);
        super(new RegExp(`[${opt.BEGIN}]([${opt.RB}]{1,${opt.RB_LEN}}?)[${opt.ENC_BEGIN}]([${opt.RT}]{1,${opt.RT_LEN}}?)[${opt.ENC_END}]`, 'g'), opt);
    }
    get RegEx() { return super.RegEx; }
}
class Chars {
    static #KANJI = '\\u2e80-\\u2fdf\\u3005\\u3007\\u303b\\u4e00-\\u9faf\\u3400-\\u4dbf\\uf900-\\ufaff';
    static #ALPHABET = 'A-Za-zＡ-Ｚａ-ｚ';
    static #NUMBER = '0-9０-９'
    static #WIDE_SIMBOL = '\\u3000-\\u3040\\u3097-\\u30A0\\u30FB-\\u30FF'
    static #HIRAGANA = '\\u3041-\\u3096'
    static #KATAKANA = '\\u30A1-\\u30FA'
    static get KANJI() { return Chars.#KANJI; }
    static get ALPHABET () { return Chars.#ALPHABET ; }
    static get NUMBER () { return Chars.#NUMBER ; }
    static get WIDE_SIMBOL () { return Chars.#WIDE_SIMBOL ; }
    static get HIRAGANA () { return Chars.#HIRAGANA ; }
    static get KATAKANA () { return Chars.#KATAKANA ; }
}
class ShortRubyParser extends OptionalRubyParser { // 
    #KANJI = '\\u2e80-\\u2fdf\\u3005\\u3007\\u303b\\u4e00-\\u9faf\\u3400-\\u4dbf\\uf900-\\ufaff';
    #ALPHABET = 'A-Za-zＡ-Ｚａ-ｚ';
    #NUMBER = '0-9０-９'
    #WIDE_SIMBOL = '\\u3000-\\u3040\\u3097-\\u30A0\\u30FB-\\u30FF'
    #HIRAGANA = '\\u3041-\\u3096'
    #KATAKANA = '\\u30A1-\\u30FA'
    constructor(options={}) {
        const def = {RB: `${Chars.KANJI}${Chars.ALPHABET}${Chars.NUMBER}` };
        let opt = { ...OptionalRubyParser.DefaultOptions, ...def, ...options };
        delete opt['BEGIN'];
        console.log(opt, def, options);
        super(new RegExp(`([${opt.RB}]{1,${opt.RB_LEN}}?)[${opt.ENC_BEGIN}]([${opt.RT}]{1,${opt.RT_LEN}}?)[${opt.ENC_END}]`, 'g'), opt);
    }
    get RegEx() { return super.RegEx; }
}
class CommonRubyParser extends LongRubyParser { // 漢字｛よみ｝
    constructor() { super({ENC_BEGIN:'《', ENC_END:'》'}); }
}
class NarouShortRubyParser extends ShortRubyParser { // なろう形式。字数が少ない。字種限定。
    constructor() { super({RT:`${Chars.HIRAGANA}${Chars.KATAKANA}`, RB_LEN:10, RT_LEN:20, ENC_BEGIN:'(（《', ENC_END:')）》'}); }
}
class NarouLongRubyParser extends LongRubyParser { // なろう形式。字数が少ない。
    constructor() { super({RB_LEN:10, RT_LEN:20, ENC_BEGIN:'(（《', ENC_END:')）》'}); }
}
class RootShortRubyParser extends ShortRubyParser { // 独自形式。メタ字を｛｝にすることで（）《》をエスケープせずに使える。
    constructor() { super({ENC_BEGIN:'｛', ENC_END:'｝'}); }
}
class RootLongRubyParser extends LongRubyParser { // 独自形式。メタ字を｛｝にすることで（）《》をエスケープせずに使える。
    constructor() { super({BEGIN:'｜', ENC_BEGIN:'｛', ENC_END:'｝'}); }
}
