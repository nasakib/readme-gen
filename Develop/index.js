const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

const questions = [
"What is your GitHub user name?", 
"What is the name of your repository?", 
"Please input a description of your repository.",
"Which of these licenses are applicable to your reposity?",
"If there are dependencies, what command should a user input in order to install them?",
"What do you want the user know about using this repo?",
"What commmand should be used to run tests?",
"What does the user need to know about contributing to the repo?"
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
        name: "install",
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
    const {userName, title, description, license, install, usage, tests, contributions} = data;
    const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
    console.log(queryUrl);
    axios.get(queryUrl).then(function(response) {
        // const repoNames = response.data.map(function(repo) {
        const userImg = (response.data[0].owner.avatar_url);
        // return repoNames;
      });
    //   const repoNamesStr = repoNames.join("\n");
      fs.writeFile("readme1.md", `
      # ${userName} ![user_image](${userImg})

      # ${title}
      ## ${description}

      ### ${license}

      ## ${install}

      ## ${usage}

      ## ${tests}

      ## ${contributions}
     `, function(err) {
        if (err) {
          throw err;
        }

      });
    });