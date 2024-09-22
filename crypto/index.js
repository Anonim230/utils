const { readFileSync } = require('node:fs')
const utils = require('./decypher.js')
const readline = require('node:readline')
const { log } = require('node:console')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let input = [], output = [], funcList = {
    "-s": utils.autoSezar,
    "--sezar": utils.autoSezar,
    "-c": utils.autoShift,
    "--caeser": utils.autoShift,
    "-sh": utils.autoShift,
    "--shifter": utils.autoShift,
    "-v": utils.vigenere,
    "--vigenere": utils.vigenere,
    "-f": (_path, encoding = 'utf-8') => readFileSync(_path,encoding)
}, lastCommand = '', args = []
const argc = process.argv.splice(2)
// log(process.arch, process.argv,process.argv0, argc)
for(let arg of argc) parseArg(arg)
if(lastCommand)input = executeCommand(funcList[lastCommand], input, args)
log(input)
function parseArg(arg){
    log(arg, input, lastCommand)
    if(lastCommand == '-f' || lastCommand == '--file'){ lastCommand = ''; return input.push(readFileSync(arg, 'utf-8')) }
    if(arg[0] != '-') {
        if(lastCommand == "")return input.push(arg);
        return args.push(arg);
    }
    if(lastCommand in funcList)input = executeCommand(funcList[lastCommand], input, args)
        lastCommand = arg
}
/**
 * 
 * @param {function} command 
 * @param {string[]} inputList 
 * @param {string[]} args 
 */
function executeCommand(command, inputList, args){
    let output = []
    log(inputList,args,command(inputList[0], ...args))
    for(let input of inputList) {
        temp = command(input, ...args)
        if(temp.join) output.push(...temp)
        else output.push(temp)
    }
    return output
}
rl.close()