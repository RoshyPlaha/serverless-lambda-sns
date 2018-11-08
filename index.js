const serverless = require('serverless-http')
const bodyParser = require('body-parser');
const express = require('express')
const boom = require('express-boom')
const app = express()
const AWS = require('aws-sdk');

const SNS_TOPIC_ARN = process.env.SNS_TOPIC

app.use(boom())
app.use(bodyParser.json({ strict: false}))

app.post('/users', function(_, res) {

    console.log('got env variable: ' + SNS_TOPIC_ARN)

    const sns = new AWS.SNS()
    const params = {
        Message: 'some message can be put here',
        TopicArn: SNS_TOPIC_ARN
    }
    sns.publish(params, (err, data) => {
        if(err) {
            res.boom.badRequest()
        } else {
            console.log('that went alright ' + JSON.stringify(data))
            res.send('{mad}')
        }
    })
})    


app.get('/', function(req, res) {
    res.send('Hello World!')
})

module.exports.handler = serverless(app)