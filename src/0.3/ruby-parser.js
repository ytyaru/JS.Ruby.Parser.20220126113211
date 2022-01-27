class Parser {
    constructor(parseSets) {
        this._parseSets = parseSets;
    }
    parse(text) {
        let parsed = text;
        for (const parseSets of this._parseSets) {
            console.log(parseSets)
            parsed = parseSets.parse(parsed);
        }
        return parsed;
    }
}
class ParseSet {
    constructor(input, output) { // RegExpセット, 出力メソッド
        console.log('=============')
        this._input = input;   // ParseInput型
        this._output = output; // ParseOutput型
//        console.log(this._input, this._output)
//        console.log(this._input.RegExps)
    }
    parse(text) {
        let parsed = text;
        console.log(this._input.RegExps)
        for (const regexp of this._input.RegExps) {
            parsed = this._output.parse(parsed, regexp)
        }
        return parsed;
    }
}
class ParseOutput {
    constructor(func) { this._func = func; console.log(func, this._func); }
    parse(text, regexp) { return text.replace(regexp, (match, p1)=>{return this._func(match, p1);}) }
}
class RubyOutput extends ParseOutput {
    constructor(func) { console.log(func); super(func); }
    parse(text, regexp) {
        return text.replace(regexp, (match, rb, rt)=>{
            return this._func(rb, rt);
        });
    }
}
class RubyHtmlOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `<ruby>${rb}<rp>（</rp><rt>${rt}</rt><rp>）</rp></ruby>`});  }
}
class RubyLongNovelOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `｜${rb}《${rt}》`}); }
}
class RubyShortNovelOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `${rb}《${rt}》`}); }
}
class RubyDendenOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `{${rb}|${rt}}`}); }
}



class ParseInput {
    constructor() {
        this._regexps = [];
    }
    get RegExps() { return this._regexps; }
}

class RubyNovelInput extends ParseInput {
    constructor(short={}, long={}) {
        super();
        this._long = (long) ? new RubyLongNovelInput(long) : null;
        this._short = (short) ? new RubyShortNovelInput(short) : null;
        //this._regexps = [];
        if (this._long) { super.RegExps.push(this._long.RegExp); }
        if (this._short) { super.RegExps.push(this._short.RegExp); }
//        if (this._short) { console.log('XXXXXXX'); this.RegExps.push(this._short.RegExp); }
//        if (this._long) { console.log('YYYYYYY'); this.RegExps.push(this._long.RegExp); }
        console.log(short, long)
        console.log(this.RegExps)
        console.log(super.RegExps)
    }
    //get RegExps() { return [this._long.RegExp, this._short.RegExp]; }
    get RegExps() { return super.RegExps; }
}
class RubyRootInput extends RubyNovelInput {
    constructor() { super({encBegin:'｛', encEnd:'｝'}, { begin:'｜', encBegin:'｛', encEnd:'｝'})}
    get RegExps() { return super.RegExps; }
}
class RubyAozoraInput extends RubyNovelInput {
    constructor() {super({rbLen:10, rtLen:20, encBegin:'《', encEnd:'》'}, {rbLen:10, rtLen:20, encBegin:'《', encEnd:'》'})}
    get RegExps() { return super.RegExps; }
}
class RubyNarouInput extends RubyNovelInput {
    constructor() {super({rbLen:10, rtLen:20, encBegin:'(（', encEnd:')）'}, {rbLen:10, rtLen:20, encBegin:'《', encEnd:'》'})}
    get RegExps() { return super.RegExps; }
}
class RubyKakuyomuInput extends RubyNovelInput {
    constructor() {super({encBegin:'《', encEnd:'》'}, {encBegin:'《', encEnd:'》'})}
    get RegExps() { return super.RegExps; }
}
class RubyHamelnInput extends RubyNovelInput {
    constructor() {super(null, {begin:'|', encBegin:'《', encEnd:'》'})}
    get RegExps() { return super.RegExps; }
}
class RubyOptionalInput {
    static #DEFAULT_OPTIONS = {
        begin: '|｜',
        rb: '^\n',
        rt: '^\n',
        rbLen: 20,
        rtLen: 50,
        encBegin: '(（《{｛',
        encEnd: ')）》}｝',
    };
    constructor(regexp, options={}) {
        this._regexp = regexp;
        this._options = { ...RubyOptionalInput.#DEFAULT_OPTIONS, ...options };
    }
    static get DefaultOptions() { return RubyOptionalInput.#DEFAULT_OPTIONS; }
    get Options() { return this._options; }
    get RegExp() { return this._regexp; }
}
class RubyLongNovelInput extends RubyOptionalInput { // 字種、字数、囲み文字を制限したもの
    constructor(options={}) {
        let opt = { ...RubyOptionalInput.DefaultOptions, ...options };
        console.log(options);
        console.log(opt);
        super(new RegExp(`[${opt.begin}]([${opt.rb}]{1,${opt.rbLen}}?)[${opt.encBegin}]([${opt.rt}]{1,${opt.rtLen}}?)[${opt.encEnd}]`, 'g'), opt);
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
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
class RubyShortNovelInput extends RubyOptionalInput { // 
    constructor(options={}) {
        const def = {rb: `${Chars.KANJI}${Chars.ALPHABET}${Chars.NUMBER}` };
        let opt = { ...RubyOptionalInput.DefaultOptions, ...def, ...options };
        delete opt['begin'];
        console.log(opt, def, options, opt);
        super(new RegExp(`([${opt.rb}]{1,${opt.rbLen}}?)[${opt.encBegin}]([${opt.rt}]{1,${opt.rtLen}}?)[${opt.encEnd}]`, 'g'), opt);
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
}
class RubyDendenMarkdownInput extends ParseInput { 
    constructor(options={}) {
        super(new RegExp(`\{([^\\n]{1,}?)[\|][^\\n]{1,}\}`, 'g'));
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
}
