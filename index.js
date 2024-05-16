const utils = require('./decypher.js')
const readline = require('node:readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
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
console.table(output)
console.log(`Hello, welcome to decypher.js\nWhat do you want to use?`)
rl.close()
// rl.question(`Good morning`, name =>{
//     console.log("Hello",name);
// })
// while(true){

// }
