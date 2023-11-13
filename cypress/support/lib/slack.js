require("dotenv").config()
let fs = require("fs")
const axios = require("axios")
const path = require("path")
const cenariosErro = path.resolve("output", "errorReport.json")
const buffer = fs.readFileSync(cenariosErro, "utf-8")

//error output messages vars
let contentJson = JSON.parse(buffer)
let message = ""

//these vars are for the flake response logic
let messageCounter = 0
let flakeCounter = 0

contentJson.cenarios.funcionalidade.forEach(element => {
    //this logic below appends to message each test title that failed
    message+=`${element}\n`

    //this logic below checks if in a test title it ends with *flake*, if so, it will be counted to define it all the tests which failed were flake or not
    messageCounter+=1
    let str = element.split(" ");
    str[str.length - 1] === '*flake*' ? flakeCounter+=1 : flakeCounter
})
let flakeCheck = messageCounter === 0 ? false : (messageCounter === flakeCounter ? true : false)

//report result & color definition
let reportResult = flakeCheck ? "Build has flake errors... :|" : (messageCounter != 0 ? "Build has errors! :(" : "Build has no errors! :)")
let reportColor = flakeCheck ? "#FFFF00" : (messageCounter != 0 ? "#d60207" : "#52a447")
let reportMessage = flakeCheck ? "*Aside from flake errors, all others tests have passed!!!*\n\nGood work devs!" : (
    messageCounter === 0 ? "*All tests have passed!!!*\n\nGood work devs!" : (
        messageCounter >= 10 ? "*Multiple tests have errors. Please verify allure to see all the test cases which have failed.*" : message
    )
)

//links and env variables definition
let GCS_URL = "https://storage.googleapis.com"
let GCB_URL = "https://console.cloud.google.com"

//defining the env variables
const allureReportPath = process.env.HTML_PATH
const bucketName = process.env.GCS_BUCKET
const bucketReportFolder = process.env.REPORT_FOLDER
const projectId = process.env.PROJECT_ID
const buildId = process.env.BUILD_ID
const repoName = process.env.REPO_NAME
const branchName = process.env.BRANCH_NAME
const commit = process.env.COMMIT_SHA
const slackWebhook = process.env.WEBHOOK
const currentDate = process.env.DATE_TIME

//defining the urls for the report
const cloudbuildUrl = `${GCB_URL}/cloud-build/builds/${buildId}?project=${projectId}`
const bucketUrl = `${GCS_URL}/${bucketName}/${bucketReportFolder}/${repoName}/${currentDate}/${allureReportPath}/index.html`

//defining axios config and slack data
const config = {
    method: "post",
    url: slackWebhook,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    data: {
        type: "mrkdwn",
        text: `*${reportResult}*\n\n\n  *Repo:* ${repoName}\n\n  *Branch Name:* ${branchName}\n\n  *Allure Report Url:* ${bucketUrl}\n\n  *Commit:* ${commit}\n\n  *Cloudbuild Run Url:* ${cloudbuildUrl}\n\n\n*Results:*\n\n`,
        attachments: [
            {
                "color": `${reportColor}`,
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${reportMessage}`
                        },
                    }
                ]
            }
        ]
    }
}

//send axios request and logs response & error
axios(config)
.then(function (response) {
    console.log(JSON.stringify(response.data));
})
.catch(function (error) {
    console.log(error);
})