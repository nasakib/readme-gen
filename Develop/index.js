const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

const questions = [
"What is your GitHub user name?", 
"What is the name of your repository?", 
"Please input a description of your repository.",
"Which of these licenses are applicable to your reposity?",
"If there are dependencies, what command should a user input in order to install them?",
"Is there anything that should be said about using the repository?",
"How should the repository be tested??",
"What should be said about contributions to the repository??"
];
inquirer.prompt([
    {
        type: "input",
        message: questions[0],
        name: "userName",
    },
    {
        type: "input",
        message: questions[1],
        name: "title",
    },
    {
        type: "input",
        message: questions[2],
        name: "description",
    },
    {
        type: "list",
        message: questions[3],
        choices: [
            "MIT",
            "APACHE 2.0", 
            "GPL 3.0", 
            "BSD 3",
            "None"
          ],
          name: "license"
    },
    {
        type: "input",
        message: questions[4],
        name: "installDir",
    },
    {
        type: "input",
        message: questions[5],
        name: "usage",
    },
    {
        type: "input",
        message: questions[6],
        name: "tests",
    },
    {
        type: "input",
        message: questions[7],
        name: "contributions",
    },
]).then(function(data) {
    const {userName, title, description, license, installDir, usage, tests, contributions} = data;
    const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
    console.log(queryUrl);
    axios.get(queryUrl).then(function(response) {
        // const repoNames = response.data.map(function(repo) {
        const userImg = (response.data[0].owner.avatar_url);
        // return repoNames;
     // }); 
    //   const repoNamesStr = repoNames.join("\n");
      fs.writeFile("readme1.md", `
      # ${userName} 
      <img src="${userImg}" alt="avatar" style="border-radios: 5px" width="40" />

      # Title
      ${title}

      ## Description:
      ${description}

      ### License
      ${license} [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
      
      # Table of Contents:

      ## Install Directions:
      ${installDir}

      ## Use specifications:
      ${usage}

      ## Test Specifications:
      ${tests}

      ## Contributions:
      ${contributions}

     `, function(err) {
        if (err) {
          throw err;
        }

      });
    });
  });//.catch(function(){
      //console.log("Sorry, your input was not valid.")