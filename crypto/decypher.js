const utils = {
    /**
     * При передаче строки и номера для шифра цезаря передвигает все символы по этому номеру
     * Не вернеться на начало алфавита при достижении конца
     * Для этого используйте caeser/shifter
     * @param {number} number 
     * @param {string} string 
     * @returns {string}
     */
    sezar: (string, number=0) => {
        let output = ''
        for(let i of string){
            output += String.fromCharCode(i.charCodeAt(0)+parseInt(number))
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
    autoSezar: (string, from=-20, to=20, checker = null) => {
        const output = {}
        for(let i = from; i <= to; i++){
            try{
                if(typeof checker == 'function'){
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
    shifter: (string, number=0) => {
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
    autoShift: (string, from=0, to=16, checker = null) => {
        const output = {}
        for(let i = from; i <= to; i++){
            try{
                if(typeof checker == 'function'){
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
module.exports = utils
