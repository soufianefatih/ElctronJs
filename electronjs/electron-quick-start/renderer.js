const fs = require('fs');
const clearButton = document.getElementById('clearButton')

if (clearButton) {
    clearButton.addEventListener("click", function () {
        console.log('clearButton')

        startRemoveing('C:\\Users\\Youcode\\AppData\\Local\\Temp');
        dirSize('C:\\Users\\Youcode\\AppData\\Local\\Temp')
    })
}

function dirSize(path) {
    var dirSizePath = path;
    fs.readdir(path, function (err, files) {
        let size = 0
        files.forEach(function (file) {
            size += fileSize(dirSizePath + '\\' + file);
        });

        document.getElementById('analitic_size').innerText = (size / 1024 / 1024) + 'Mo';
        console.log('size: ', size / 1024 / 1024, 'Mo')
    })
}

function fileSize(file) {
    if (fs.existsSync(file)) {
        return fs.statSync(file).size
    } else {
        console.error("This file doesn't exist : ", file);
        return 0;
    }
}

function startRemoveing(filePath) {
    console.warn('Start Removeing in ' + filePath);
    var filePath = filePath
    fs.readdir(filePath, function (err, files) {

        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }

        files.forEach(function (file) {
            removeFile(filePath + '\\' + file);
        });

        console.warn("File Removed successfully : " + files.length + ' in ' + filePath);
    });
}

function removeFile(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                startRemoveing(filePath);
                // console.error(err);
            } else {
                console.log("File succesfully deleted");
            }
        });
    } else {
        console.error("This file doesn't exist, cannot delete : ", filePath);
    }
}