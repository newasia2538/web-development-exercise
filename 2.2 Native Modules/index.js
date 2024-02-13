const fs = require('fs'); 

const content = fs.readFile("message.txt", { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.error(err);
        return;
      }
      console.log(data);
});