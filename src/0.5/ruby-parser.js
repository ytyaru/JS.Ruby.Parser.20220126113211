class Parser {
    constructor(parseSets) {
        this._parseSets = parseSets;
    }
    parse(text) {
        let parsed = text;
        for (const parseSets of this._parseSets) {
            parsed = parseSets.parse(parsed);
        }
        return parsed;
    }
}
class ParseSet {
    constructor(input, output) { // RegExpセット, 出力メソッド
        this._input = input;   // ParseInput型
        this._output = output; // ParseOutput型
    }
    parse(text) {
        let parsed = text;
        console.log(this._input.RegExps)
        for (const regexp of this._input.RegExps) {
            parsed = this._output.parse(parsed, regexp)
        }
        /*
        if (this._input.RegExps) {
            for (const regexp of this._input.RegExps) {
                parsed = this._output.parse(parsed, regexp)
            }
        }
        else if ('RegExp' in this._input) { // RubyOptionalInput 
            parsed = this._output.parse(parsed, this._input.RegExp)
        }
        */
        return parsed;
    }
}
class ParseOutput {
    constructor(func) { this._func = func; }
    parse(text, regexp) { return text.replace(regexp, (match, p1)=>{return this._func(match, p1);}) }
}
class RubyOutput extends ParseOutput {
    constructor(func) { super(func); }
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
    constructor() { super((rb, rt)=>{return `|${rb}《${rt}》`}); } // ハーメルンは全角｜だとダメなので半角|にした
}
class RubyShortNovelOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `${rb}《${rt}》`}); } // (,（は、なろうのみ対応なので《》にした
}
class RubyAlphaPoliceOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `#${rb}__${rt}__#`}); }
}
class RubyDendenOutput extends RubyOutput {
    constructor() { super((rb, rt)=>{return `{${rb}|${rt}}`}); } // |が複数あり1字ずつにセットできる形式は複雑なため対象外
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
        /*
        if (this._long) { super.RegExps.concat(this._long.RegExps); }
        if (this._short) { super.RegExps.concat(this._short.RegExps); }
        if (this._long) { this.RegExps.concat(this._long.RegExps); }
        if (this._short) { this.RegExps.concat(this._short.RegExps); }
        */
        for (const input of [this._long, this._short]) {
            if (input) { for (const regexp of input.RegExps) { this.RegExps.push(regexp); } }
        }
        /*
        console.log(this._long.RegExps)
//        console.log(this._short.RegExps)
        console.log(super.RegExps)
        console.log(this.RegExps)
//        if (this._long) { super.RegExps.push(this._long.RegExp); }
//        if (this._short) { super.RegExps.push(this._short.RegExp); }
        */
    }
    get RegExps() { return super.RegExps; }
}
class RubyRootInput extends RubyNovelInput {
    constructor() { super({encBegin:'｛', encEnd:'｝'}, { begin:'｜', encBegin:'｛', encEnd:'｝'})}
    get RegExps() { return super.RegExps; }
}
class RubyAozoraInput extends RubyNovelInput {
    constructor() {super({encBegin:'《', encEnd:'》'}, {encBegin:'《', encEnd:'》'})}
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
/*
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
        this._regexps = [regexp];
        this._options = { ...RubyOptionalInput.#DEFAULT_OPTIONS, ...options };
    }
    static get DefaultOptions() { return RubyOptionalInput.#DEFAULT_OPTIONS; }
    get Options() { return this._options; }
    get RegExps() { return this._regexps; }
}
*/
class RubyOptionalInput extends ParseInput {
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
        super();
        super.RegExps.push(regexp);
        this._options = { ...RubyOptionalInput.#DEFAULT_OPTIONS, ...options };
    }
    static get DefaultOptions() { return RubyOptionalInput.#DEFAULT_OPTIONS; }
    get Options() { return this._options; }
    get RegExps() { return super.RegExps; }
}
/*
*/
/*
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
*/
class RubyLongNovelInput extends RubyOptionalInput { // 字種、字数、囲み文字を制限したもの
    constructor(options={}) {
        let opt = { ...RubyOptionalInput.DefaultOptions, ...options };
        super(new RegExp(`[${opt.begin}]([${opt.rb}]{1,${opt.rbLen}}?)[${opt.encBegin}]([${opt.rt}]{1,${opt.rtLen}}?)[${opt.encEnd}]`, 'g'), opt);
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
}
class Chars {
    static #KANJI = '\\u2e80-\\u2fdf\\u3005\\u3007\\u303b\\u4e00-\\u9faf\\u3400-\\u4dbf\\uf900-\\ufaff';
    static #ALPHABET = 'A-Za-zＡ-Ｚａ-ｚ';
    static #NUMBER = '0-9０-９'
    static #WIDE_SYMBOL = '\\u3000-\\u3040\\u3097-\\u30A0\\u30FB-\\u30FF'
    static #HIRAGANA = '\\u3041-\\u3096'
    static #KATAKANA = '\\u30A1-\\u30FA'
    static #HALF_SYMBOL = '!-/:-@¥[-`{-~';
    static get KANJI() { return Chars.#KANJI; }
    static get ALPHABET () { return Chars.#ALPHABET ; }
    static get NUMBER () { return Chars.#NUMBER ; }
    static get WIDE_SYMBOL () { return Chars.#WIDE_SYMBOL ; }
    static get HALF_SYMBOL () { return Chars.#HALF_SYMBOL ; }
    static get HIRAGANA () { return Chars.#HIRAGANA ; }
    static get KATAKANA () { return Chars.#KATAKANA ; }
}
class RubyShortNovelInput extends RubyOptionalInput { // 
    constructor(options={}) {
        const def = {rb: `${Chars.KANJI}${Chars.ALPHABET}${Chars.NUMBER}` };
        let opt = { ...RubyOptionalInput.DefaultOptions, ...def, ...options };
        delete opt['begin'];
        super(new RegExp(`([${opt.rb}]{1,${opt.rbLen}}?)[${opt.encBegin}]([${opt.rt}]{1,${opt.rtLen}}?)[${opt.encEnd}]`, 'g'), opt);
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
}
class RubyDendenInput extends ParseInput { 
    constructor(options={}) {
        super();
        super.RegExps.push(new RegExp(`\{([^\\n]{1,}?)[\|]([^\\n]{1,}?)\}`, 'g'));
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
}
class RubyAlphaPoliceInput extends ParseInput {
    constructor(options={}) {
        super();
        super.RegExps.push(new RegExp(`#([^\\n]{1,}?)__([^\\n]{1,}?)__#`, 'g'));
    }
    get Options() { return super.Options; }
    get RegExps() { return super.RegExps; }
}

class RubyParseSetFactory {
    static #RootHtml = new ParseSet(new RubyRootInput(), new RubyHtmlOutput());               // ｛｝→<ruby>
    static #RootNovel = new ParseSet(new RubyRootInput(), new RubyLongNovelOutput());         // ｛｝→｜《》
    static #NovelHtml = new ParseSet(new RubyNovelInput(), new RubyHtmlOutput());             // ｜《》→<ruby>

    // 青空文庫→｜｛｝
    //static #AozoraNovel = new ParseSet(new RubyAozoraInput(), new RubyLongNovelOutput());     // 青空文庫→｜｛｝
    static #AozoraNovel = [new ParseSet(new RubyLongNovelInput({encBegin:'《', encEnd:'》'}), new RubyLongNovelOutput()),
                           new ParseSet(new RubyShortNovelInput({encBegin:'《', encEnd:'》'}), new RubyShortNovelOutput())];
    // カクヨム→｜《》
    static #KakuyomuNovel = [new ParseSet(new RubyLongNovelInput({encBegin:'《', encEnd:'》'}), new RubyLongNovelOutput()),
                             new ParseSet(new RubyShortNovelInput({encBegin:'《', encEnd:'》'}), new RubyShortNovelOutput())];
    static #NarouNovel = new ParseSet(new RubyNarouInput(), new RubyLongNovelOutput());       // なろう→｜《》
    static #HamelnNovel = new ParseSet(new RubyHamelnInput(), new RubyLongNovelOutput());     // ハーメルン→｜《》
    static #AlphaPoliceNovel = new ParseSet(new RubyAlphaPoliceInput(), new RubyLongNovelOutput()); // アルファポリス→｜《》
    static #NovelAlphaPolice = new ParseSet(new RubyNovelInput(), new RubyAlphaPoliceOutput()); // ｜《》→アルファポリス
    static #DendenNovel = new ParseSet(new RubyDendenInput(), new RubyLongNovelOutput());     // でんでん→｜《》
    static #NovelDenden = new ParseSet(new RubyNovelInput(), new RubyDendenOutput());         // ｜《》→でんでん

    static get RootHtml() { return RubyParseSetFactory.#RootHtml; } 
    static get RootNovel() { return RubyParseSetFactory.#RootNovel; } 
    static get NovelHtml() { return RubyParseSetFactory.#NovelHtml; } 

    static get AozoraNovel() { return RubyParseSetFactory.#AozoraNovel; } 
    static get KakuyomuNovel () { return RubyParseSetFactory.#KakuyomuNovel ; } 
    static get NarouNovel () { return RubyParseSetFactory.#NarouNovel ; } 
    static get HamelnNovel () { return RubyParseSetFactory.#HamelnNovel ; } 
    static get AlphaPoliceNovel () { return RubyParseSetFactory.#AlphaPoliceNovel ; } 
    static get NovelAlphaPolice () { return RubyParseSetFactory.#NovelAlphaPolice; } 
    static get DendenNovel () { return RubyParseSetFactory.#DendenNovel ; } 
    static get NovelDenden () { return RubyParseSetFactory.#NovelDenden ; } 
}

