require('dotenv').config()
const postgreSQL = require('cypress-postgresql')
const pg = require('pg')
const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE
}
let fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const outputDir = "output";
const cenariosErro = path.resolve("./output", "errorReport.json");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

let cenariosComErro = {
    cenarios: {
        funcionalidade: [],
    }
};

function createReportError(data) {
    const obj = JSON.stringify(data);
    return fs.writeFileSync(cenariosErro, prettier.format(obj, { semi: true, parser: "json" }), err => {
        if (err) return err;
    });
}

function deleteReportError() {
    if (fs.existsSync(cenariosErro)) {
        fs.unlink(cenariosErro, function (err) {
            if (err) return console.log(err);
        });
    }
}

function readReportError() {
    const buffer = fs.readFileSync(cenariosErro, "utf-8");
    let contentJson = JSON.parse(buffer);
    return contentJson;
}

function scenariosWithError(featureName) {
    if (!fs.existsSync(cenariosErro)) {
        createReportError(cenariosComErro);
    }
    let contentJson = readReportError();
    if(!contentJson.cenarios.funcionalidade.includes(featureName.feature)) 
    contentJson.cenarios.funcionalidade.push(featureName.feature);
    createReportError(contentJson);
}

module.exports = async (on, config) => {
    on("before:run", () => {
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        deleteReportError()
        const obj = JSON.stringify(cenariosComErro);
        return fs.writeFileSync(cenariosErro, prettier.format(obj, { semi: true, parser: "json" }), err => {
            if (err) return err;
        });
        return null;
    });
    on("task", {
        errorCenarios: (data) => {
            scenariosWithError(data)
            return null;
        },
    })
    const pool = new pg.Pool(dbConfig)
    tasks = postgreSQL.loadDBPlugin(pool)
    allureWriter(on, config)
    on('task', tasks)
    return config
}
