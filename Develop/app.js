const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const Employee = require("./lib/Employee");
const { createInflate
} = require("zlib");

// Code to use inquirer to gather information about the development team members,
// and to create objects for each team member.
const teamMembers = [];

function start() {
    managerT();
}

function managerT() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the team manager?"
        },
        {
            type: "input",
            name: "id",
            message: "Team Manager's ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Team Manager's email address:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Team Manager's office number:"
        }
    ]).then(data => {
        const newPerson = new Manager(data.name, data.id, data.email, data.officeNumber);
        teamMembers.push(newPerson);
        addTeamMember();
    })
};

function addTeamMember() {
    inquirer.prompt([{
        type: "list",
        name: "what_type",
        message: "Add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "Not at this time"]
    }]).then(data => {

        if (data.what_type === "Engineer") {
            engineerT();
        } else if (data.what_type === "Intern") {
            internT();
        } else {
            createFile();
        }
    })
}


function engineerT() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "Engineer's ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Engineer's email address:"
        },
        {
            type: "input",
            name: "github",
            message: "What is the URL of the Engineer's GitHub profile?"
        }
    ]).then(data => {
        const newPerson = new Engineer(data.name, data.id, data.email, data.github);
        console.log(engineer);
        teamMembers.push(newPerson);
        addTeamMember();
    })


};

function internT() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "Intern's ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Intern's email address:"
        },
        {
            type: "input",
            name: "school",
            message: "What is the school name he /she attended?"
        }
    ]).then(data => {
        const newPerson = new Intern(data.name, data.id, data.email, data.school);
        teamMembers.push(newPerson);
        addTeamMember();
    })


};

function createFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "UTF-8");
}
start();


