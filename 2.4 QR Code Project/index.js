import qr from "qr-image";
import inquirer from "inquirer";
import fs from "fs";

var name = {

};

// 1. Use the inquirer npm package to get user input.
inquirer
  .prompt({
    type: 'input',
    name: 'url',
    message: 'Enter URL'
})
  .then((answers) => {
    if(answers.url != ''){

        // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
        console.log(answers.url);
        var url = answers.url;
        var image = qr.image(url, {type : `png`});
        image.pipe(fs.createWriteStream(`./images/${url}.png`));
        
        // 3. Create a txt file to save the user input using the native fs node module.
        if(fs.existsSync('url_list.txt')){
            fs.appendFileSync(`url_list.txt`, `\n${url}`, 'utf8');
        }else {
            fs.writeFileSync(`url_list.txt`, url, (err) => {
                console.log(err);
            });
        }
    }
  })
  .catch((error) => {
    console.log(error);
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });