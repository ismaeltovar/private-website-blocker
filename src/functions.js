const fs = require('fs');
const { default: consoleHelper } = require('./consoleHelper');

let isWin = process.platform === "win32";

const filePath = isWin ? "C:\Windows\System32\drivers\etc\hosts" : "/etc/hosts";

const redirectPath = "127.0.0.1";

let websites = ['www.sample-website.com', 'www.instagram.com', 'www.youtube.com'];

let delay = 10000;

function websiteBlock() {

  website.forEach(url => {
    let urlEl = document.createElement("li");
    let h2 = document.createElement("h2");
    h2.className = 'li-txt';
    btn.appendChild(document.createTextNode(url));
    let btn = document.createElement("button");
    btn.className = "li-remove";
    btn.appendChild(document.createTextNode("Remove"));
    urlEl.appendChild(h2);
    urlEl.appendChild(btn);
    document.getElementById('web-list').appendChild(urlEl);
    updateHosts(url);
  });
}

function updateHosts(url) {
  fs.readFile(filePath, (err, data) => {
    if (err) console.err(err);
    let contents = data.toString();
  
    let websiteLine = redirectPath + ' ' + url;
    let webLinePresent = contents.indexOf(websiteLine);
    if (webLinePresent < 0) {
      fs.appendFile(filePath, websiteLine, (err) => {
        if (err) return console.error(err);
        consoleHelper(url + ' added to hosts file.');
      })
    } else if (webLinePresent >= 0 && websites.find(elUrl => elUrl === url) === undefined) {
      let updatedContent = '';
      fs.readFileSync(filePath).toString().split().forEach((line) => {
        if (line.indexOf(websiteLine) >= 0)
          updatedContent += line;
      })
      fs.writeFile(filePath, updatedContent, (err) => {
        if (err) return console.error(err);
        consoleHelper(url + ' removed from hosts file.');
      })
    } else {
      consoleHelper(url + " present in hosts file.");
    }
  })
}

function initialAddBtnClick() {
  location.assign('./add-site.html');
}

function blockWebsite() {
  location.assign('./index.html');
}

module.exports = {
  websiteBlock,
}