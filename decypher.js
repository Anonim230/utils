const utils = {
    /**
     * При передаче строки и номера для шифра цезаря передвигает все символы по этому номеру
     * @param {number} number 
     * @param {string} string 
     * @returns {string}
     */
    sezar: (string='', number=0) => {
        let output = ''
        for(let i of string){
            output += String.fromCharCode(i.charCodeAt(0)+number)
        }
        return output
    },
    /**
     * @callback checkerFunction
     * @param {string} toCheck
     * @param {number} index
     * @param {string} input
     * @param {{[number]:[string]}} output
     * @returns {boolean}
     */
    /**
    * @interface checkerFunction(toCheck:string,index:number,input:string,output:{[number]:[string]}):boolean}
     * @param {string} string 
     * @param {number} from 
     * @param {number} to
     * @param {checkerFunction} checker
     * @returns {string[]} 
     */
    autoSezar: (string='', from=0, to=0, checker = null) => {
        const output = {}
        for(let i = from; i <= to; i++){
            try{
                if(checker){
                    let toCheck = utils.sezar(string, i);
                    if(checker(toCheck, i-from, string, output)) output[i] = toCheck
                }else output[i] = utils.sezar(string, i);
            }catch(e){
                console.error(`Sezar code with number ${i} is out of range`, e)
            }
        }
        return output
    },
    /**
     * Caeser/Shift cypher/decypher
     * @param {string} string 
     * @param {number} number 
     */
    shifter: (string='', number=0) => {
        let out = ""
        for(let i of string.split('')){
            let charCode = i.charCodeAt(0);
            if(charCode >= 97 && charCode <= 122){
                if(charCode+number < 97) charCode += 26
                else if(charCode+number > 122) charCode -= 26
                out += String.fromCharCode(charCode+number)
            }else if(charCode >= 65 && charCode <= 90){
                if(charCode+number < 65) charCode += 26
                else if(charCode+number > 90) charCode -= 26
                out += String.fromCharCode(charCode+number)
            }else out += i
        }
        return out
    },
    /**
     * Automated Caesar/Shift cypher/decypher
     * @callback checkerFunction
     * @param {string} toCheck
     * @param {number} index
     * @param {string} input
     * @param {{[number]:[string]}} output
     * @returns {object}
     */
    autoShift: (string='', from=0, to=0, checker = null) => {
        const output = {}
        for(let i = from; i <= to; i++){
            try{
                if(checker){
                    let toCheck = utils.shifter(string, i);
                    if(checker(toCheck, i-from, string, output)) output[i] = toCheck
                }else output[i] = utils.shifter(string, i);
            }catch(e){
                console.error(`Caesar code with number ${i} is out of range`, e)
            }
        }
        return output
    },
    /**
     * 
     * @param {string} string 
     * @param {string} key
     * @param {boolean} reverse
     * @returns {string}
     */
    vigenere(string, key, reverse = false){
        key = key.toUpperCase()
        let out = '', index = 0;
        for(let i of string.split('')){
            if(index >= key.length) index = 0;
            number = (key[index].charCodeAt() - 65)*(reverse ? -1 : 1)
            let charCode = i.charCodeAt(0);
            if(charCode >= 97 && charCode <= 122){
                if(charCode+number < 97) charCode += 26
                else if(charCode+number > 122) charCode -= 26
                out += String.fromCharCode(charCode+number)
                index++
            }else if(charCode >= 65 && charCode <= 90){
                if(charCode+number < 65) charCode += 26
                else if(charCode+number > 90) charCode -= 26
                out += String.fromCharCode(charCode+number)
                index++
            }else out += i
            // console.log(key[index], number, i, charCode, out[out.length-1]);
        }
        return out
    },
    /**
     * Caeser/Shift cypher/decypher
     * Works like Sezar cypher but if 
     * @param {string} string 
     * @param {number} number 
     */
    caeser: (string='', number=0) => {
        this.shifter(string,number)
    }
}
// console.log(utils.vigenere('gwox{RgqssihYspOntqpxs}','blorpy', true));
// console.log(utils.vigenere('attacking tonight', 'OCULORHINOLARINGOLOGY'));
// console.log(utils.autoSezar('Tzg1REU0ck9SeFFkZkJiTXpnOGkxdg==',-30,25))
// console.table(utils.autoShift(`tm bcsv qolfp
// f'dmvd xuhm exl tgak
// hlrkiv sydg hxm
// qiswzzwf qrf oqdueqe
// dpae resd wndo
// liva bu vgtokx sjzk
// hmb rqch fqwbg
// fmmft seront sntsdr pmsecq
// `,-25,0))
// console.log(Object.values(utils.autoShift('Yaloih', -24, 24)).join(' '));
// console.log(utils.autoShift('Bra￳o! T pe￳ ￳alider a￳ec le pass Yolaih', -30,30))
// console.table(utils.autoSezar('L|k�y+*^*zo�*�kvsno|*k�om*vo*zk}}*cyvksr', -30,30));
// console.table(utils.autoSezar(`1��qő������1�1�!%!AA�!đ�aAAqAq1�1!!đ!qA!qa!A�A!!1!!��!A!�!!�!�11!�1!A�A1ġ�1�1q�A!!A!���AQ1!�!1��!!qAA��1�1��1!Ł�ā1��aAq!1A�1�1�!�1Q!!��!�Qa1!�ȁ��A1!1q1�!1QqA!!�1a!1!�a11A�A11Q!����1!�!�!!�A�!11QA�aA�!a�A1A!Aaa1Q�!1A�A!AQ!11!�!1!�Aq`, -30,30));
// console.table(utils.autoSezar('aksdalksfjhaiuc',-63,40, v => v.match(/ct/g)))
module.exports = utils
