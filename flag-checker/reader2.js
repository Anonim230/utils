const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Function to recursively search for numbers with length 4 in files
function searchInFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error stating file:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    searchInFiles(filePath); // Recursive call for directories
                } else if (stats.isFile()) {
                    searchInFile(filePath); // Call function to search text in file
                }
            });
        });
    });
}
const output = []
// Function to search for numbers with length 4 in a file
function searchInFile(filePath) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });

    let lineNumber = 0;

    rl.on('line', line => {
        lineNumber++;
        
        let match;
        
        while ((match = regex.exec(line)) !== null) {
            for(let filter of filters)
                if(filter(line)) return
            // console.log(filter(line));
            if(output.includes(match[0]))return
            output.push(match[0])
            console.log(`Found number '${match[0]}' in file '${filePath}' at line ${lineNumber}:`);
            console.log(line);
            // console.log(match[0])
            // break
        }
    });

    rl.on('close', () => {
        // Finished reading file
    });

    rl.on('error', err => {
        console.error('Error reading file:', err);
    });
}

// Usage: Call the function with the directory path
const directoryPath = '/home/adrians4957y/Downloads/apk-2';
searchInFiles(directoryPath);
// Regex to match numbers of length 4
var regex = "flag{" // /\b\d{4}\b/g,
filters = [
    /** @param {string} line */
    line => line.includes('.line')
];

