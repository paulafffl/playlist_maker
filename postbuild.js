const fs = require('fs');

// Copy CNAME file to build directory after build
fs.copyFile('CNAME', 'build/CNAME', (err) => {
    if (err) throw err;
    console.log('CNAME file copied to build directory');
});
