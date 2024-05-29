const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Function to recursively search for text in files
function searchInFiles(directory, searchText) {
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
                    searchInFiles(filePath, searchText); // Recursive call for directories
                } else if (stats.isFile()) {
                    searchInFile(filePath, searchText); // Call function to search text in file
                }
            });
        });
    });
}

// Function to search for text in a file
function searchInFile(filePath, searchText) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });

    let lineNumber = 0;

    rl.on('line', line => {
        lineNumber++;

        if (line.includes(searchText)) {
            console.log(`Found '${searchText}' in file '${filePath}' at line ${lineNumber}:`);
            console.log(line);
        }
    });

    rl.on('close', () => {
        // Finished reading file
    });

    rl.on('error', err => {
        console.error('Error reading file:', err);
    });
}

// Usage: Call the function with directory path and text to search
if(!process.argv) return console.log("File path is required");
const directoryPath = process.argv[2];
const searchText = process.argv[3] || 'flag{';
if(fs.lstatSync(directoryPath).isDirectory()) searchInFiles(directoryPath, searchText);
else searchInFile(directoryPath, searchText);