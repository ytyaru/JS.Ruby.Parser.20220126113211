class RubyParser {
    get RegEx() { return this._regex; }
    constructor(regex) { this._regex = regex; }
    parse(text) {
        return text.replace(this._regex, (match, rb, rt)=>{
            return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>`;
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
class NovelShortRubyParser extends ShortRubyParser { // 独自形式。メタ字を｛｝にすることで（）《》をエスケープせずに使える。
    constructor() { super({ENC_BEGIN:'｛', ENC_END:'｝'}); }
}
class NovelLongRubyParser extends LongRubyParser { // 独自形式。メタ字を｛｝にすることで（）《》をエスケープせずに使える。
    constructor() { super({ENC_BEGIN:'｛', ENC_END:'｝'}); }
}
