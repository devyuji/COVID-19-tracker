const express = require('express');
const app = express();
const pupp = require("puppeteer");
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.route('/')
    .get((req,res) => {
        async function grabbing(url){
            const browser = await pupp.launch();
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0);

            await page.goto(url);
            const [ case1 ] = await page.$x('/html/body/div[3]/div[2]/div[1]/div/div[4]/div/span');
            const conform = await case1.getProperty("textContent");
            const confirmCase = await conform.jsonValue();
            const [ case2 ] = await page.$x('/html/body/div[3]/div[2]/div[1]/div/div[6]/div/span');
            const death = await case2.getProperty('textContent');
            const deathCase = await death.jsonValue();
            const [ case3 ] = await page.$x('/html/body/div[3]/div[2]/div[1]/div/div[7]/div/span');
            const recover = await case3.getProperty('textContent');
            const recoverCase = await recover.jsonValue();
            await page.close();
            res.render('main', {ConfirmCase : confirmCase , Death : deathCase , recovered : recoverCase});
            await browser.close();
         }
         const url = "https://www.worldometers.info/coronavirus/";
         grabbing(url);
    });

app.listen(process.env.PORT || 3000 , () => {
    console.log("sever started on 3000 port");
});