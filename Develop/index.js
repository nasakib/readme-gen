// Import the package(s)
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("inquirer")

const questions = [{
    type: "input",
    message: "what is your GitHub username?",
    name: "userName"
},{
    type: "input",
    message: "Which repository would you like to generate a readme.md for?",
    name: "userRepo"
}];

inquirer.prompt.questions.forEach(element).then(function({ userName }){
        const queryURL = `https://api.github.com/users/${userName}/repos?per_page=100`;

        axios.get(queryURL).then(function(res){
            const repoNames = res.data.map(function(repo){
                return repo.name;
            })
        })
    })

function writeToFile(fileName, data) {
}

function init() {

}

init();