const { readFileSync } = require('node:fs')
const utils = require('./decypher.js')
const readline = require('node:readline')
const { log } = require('node:console')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let input = [], inputEnded = false, output, funcList = {
    "-s": utils.autoSezar,
    "--sezar": utils.autoSezar,
    "-c": utils.autoShift,
    "--caeser": utils.autoShift,
    "-sh": utils.autoShift,
    "--shifter": utils.autoShift,
    "-v": utils.vigenere,
    "--vigenere": utils.vigenere,
    "-f": (_path, encoding = 'utf-8') => readFileSync(_path,encoding)
}, temp
for(let i of process.argv.filter((_,i) => i > 1)){
    if(!inputEnded && !i.startsWith('-'))input.push(i)
    else {
        inputEnded = true 
        if(typeof funcList[i] != 'function')continue
        for(let j = 0; j < input.length; j += funcList[i].length){
            temp = funcList[i](...input.splice(0, funcList[i].length))
            // log(input.splice(j, j+funcList[i].length))
        }
        // log(temp, input,funcList[i], i)
        if(temp instanceof Array)input = temp
        else if(temp instanceof Object)input = Object.values(temp)
        else input = [temp]
    }
    /*
        inputEnded = true
        if(funcList[i])temp = funcList[i](...input)
        log(temp)
        if(temp instanceof Array)input = temp
        else if(temp instanceof Object)input = Object.values(temp)
        else input = [temp]
    */
}
console.log(input, output, typeof utils.autoSezar)
console.log(`Hello, welcome to decypher.js\nWhat do you want to use?`)
rl.close()
// rl.question(`Good morning`, name =>{
//     console.log("Hello",name);
// })
// while(true){

// }
/*
let globalSettings = {
    commands: [],
    inputs: []
}
process.argv.forEach(arg => {
    console.log(arg);
    if(arg[0] != '-') return globalSettings.inputs.push(arg)
    if(arg[1] == '-')
        switch(arg){
            case '--sezar': globalSettings.commands.push('sezar'); return;
            case '-caesar': globalSettings.commands.push('shifter'); return;
            case '--shifter': globalSettings.commands.push('shifter'); return;
            case '--vigenere': globalSettings.commands.push('vigenere'); return;
        }
    switch(arg){
        case '-s': globalSettings.commands.push('sezar'); return;
        case '-c': globalSettings.commands.push('shifter'); return;
        case '-sh': globalSettings.commands.push('shifter'); return;
        case '-vig': globalSettings.commands.push('vigenere'); return;
    }
    switch(arg){
        case '-As': globalSettings.commands.push('autoSezar'); return;   
        case '-Ac': globalSettings.commands.push('autoShifter'); return;       
    }
})
let output = globalSettings.commands.reduce((inputs, command) => {
    console.log(command, inputs);
    return utils[command](inputs)
}, globalSettings.inputs.slice(2))
*/
