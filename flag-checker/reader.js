'use strict'
const fs = require('fs');
const path = require('path');
const readline = require('readline');


/**
 * @type {{[key: string]: [{
 *      [key: string]: string
 * }]}}
 */
var output = {},
    /**
     * Filters list. If filter return true line will not be counted as output
     *```
     line => line.includes('.line')```
     * @type function[]
     */
    filters = []
// Usage: Call the function with directory path and text to search
if(!process.argv) return console.log("File path is required");
const directoryPath = process.argv[2];
const searchText = process.argv[3] || 'flag{';
searchInFiles(directoryPath, searchText)//.then(output => console.log(output))
// searchInFiles(directoryPath, searchText);
// if(fs.lstatSync(directoryPath).isDirectory()) searchInFiles(directoryPath, searchText);
// else searchInFile(directoryPath, searchText);
// (async () => {
//     if(fs.lstatSync(directoryPath).isDirectory()) new Promise(async resolve => { await searchInFiles(directoryPath, searchText); resolve()}).then(() => readOutput());
//     else new Promise(async resolve => { await searchInFile(directoryPath, searchText); resolve()}).then(() => readOutput());
// })()

/**
 * Function to recursively search for text in files
 * 
 * @param {string} directory Directory path
 * @param {string} searchText 
 */
async function searchInFiles(directory, searchText) {
    // console.log(fs.lstatSync(directory).isDirectory());
    if(fs.lstatSync(directory).isDirectory())
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            try{
                const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                searchInFiles(filePath, searchText); // Recursive call for directories
            } else if (stats.isFile()) {
                searchInFile(filePath, searchText); // Call function to search text in file
            }
        }catch(e){
            if (e) {
                console.error('Error stating file:', e);
                return;
            }
        }
        })
    });
    else 
        searchInFile(directory, searchText);
    return output
}

/** 
 * Function to search for text in a file
 * @param {string} directory File path 
 * @param {string} searchText 
*/ 
async function searchInFile(filePath, searchText) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    let regex = new RegExp(searchText)
    let lineNumber = 0;

    await rl.on('line', line => {
        lineNumber++;
        
        let match = regex.exec(line);
        if(!match)return
        
        // while ((match = regex.exec(line)) !== null) {
            if(filters.length)
                for(let filter of filters)
                    if(filter(line)) return
            // console.log(filter(line));
            // console.log(out);
            // if(output?.includes(match[0]))return
            if(output[match[0]]) output[match[0]].push({path: filePath, lineNumber})
            else {
            output[match[0]] = [{path: filePath, lineNumber}]
            }
            console.log(`Found '${searchText}' in file '${filePath}' at line ${lineNumber}: ${line}`);   
            // console.log(output);
            // console.log(match[0])
            // break
        // }
    });
    // rl.on('line', line => {
    //     lineNumber++;

    //     if (line.includes(searchText)) {
            
    //         console.log(`Found '${searchText}' in file '${filePath}' at line ${lineNumber}:`);
    //         console.log(line);
    //     }
    // });

    await rl.on('close', () => {
        // Finished reading file
    });

    await rl.on('error', err => {
        console.error('Error reading file:', err);
    });
}
function readOutput(output){
    if(!output || !output.length)return
    console.log(output);
    for(let out of Object.keys(output)){
        for(let line of Object.keys(output[out])){
            console.log(`Found pattern '${line}' in file '${output[out][path]}' at line ${output[out][lineNumber]}:`);
            // console.log(line);
        }
    }
}