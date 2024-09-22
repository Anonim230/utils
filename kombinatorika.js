const { stdin, stdout } = require('node:process')
const readline = require('node:readline')
const rl = readline.createInterface({
    input: stdin,
    output: stdout
})
var data = ''
function factor(n){
    if(n == 1)return 1
    return n*factor(n-1)
}
console.log("Kombinator.js ishga tushdi. \nBirinchi bo'lib sonni, agar 2+ bo'lsa probel bilan string ko'rinishida yozing. \nUndan keyin payload kiriting");
rl.addListener('line', line =>{
    if(line == 'exit')return rl.close()
    if(line == 'help'){
        return console.log(`
        Javoblar 101 ko'rinishida qabul qilinadi, savollar:
        1. Takrorlanadimi?
        2. Hammasi qatnashadimi?
        3.O'rniga bog'liqmi?`)
    }
    if(!data)return data = line;
    if(line.length > 3 | line.length < 2)return console.error("Payload uzunligi 2-3 bo'lishi kerak")
    let output = ''
    let [n,k] = data.split(' ')
    n = n || 1
    k = k || 1
    switch(line){
        case '100': 
        output = factor(n+k-1)/(factor(n-1)*factor(k))
        break
        case '101': 
        output = Math.pow(n,k)
        break;
        case '111':
            let arr = data.split(' ')
            output = factor(arr.shift())/arr.reduce((acc,v) =>acc*factor(v),1)
            break
        case '110':
            output = factor(arr.shift())/arr.reduce((acc,v) =>acc*factor(v),1)
            break
        case '011':
            output = factor(n)
            break
        case '010':
            output = factor(n)
            break
        case '001':
            output = factor(n)/factor(n-k)
            break
        case '000':
            output = factor(n)/(factor(n-k)*factor(k))
            break
    }
    console.log(output);
    data = ''
})