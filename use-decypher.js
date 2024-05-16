const utils = require('./decypher');
let str = "q{vpln'bH_varHuebcrqxetrHOXEj";
let str2="a0_obql_s0etrg_de_pbqr";
let out = [];
// console.log(utils.autoSezar("q{vpln'bH_varHuebcrqxetrHOXEj", -30, 30))
for(let i = 0; i < str.length-str.length%2; i += 2){
    // console.log(str[i].charCodeAt(),str[i+1].charCodeAt(),str[i].charCodeAt()^str[i+1].charCodeAt(),str[i].charCodeAt().toString(2),Number.parseInt(str[i+1].charCodeAt().toString(2)),str[i].charCodeAt().toString(2)^str[i+1].charCodeAt().toString(2));
    console.log(Number.parseInt(str[i+1].charCodeAt().toString(2),2), parseInt(str[i].charCodeAt().toString(2))^parseInt(str[i+1].charCodeAt().toString(2)));
    out.push(str[i].charCodeAt()^str[i+1].charCodeAt());
}
console.log(out);
console.log(utils.shifter(str2,13))
