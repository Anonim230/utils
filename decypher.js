const utils = {
    /**
     * При передаче строки и номера для шифра цезаря передвигает все символы по этому номеру
     * @param {number} number 
     * @param {string} string 
     * @returns {string}
     */
    sezar: (string, number) => {
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
    autoSezar: (string, from, to, checker = null) => {
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
    }
}
console.table(utils.autoSezar('aksdalksfjhaiuc',-63,40, v => v.match(/ct/g)))
module.exports = utils