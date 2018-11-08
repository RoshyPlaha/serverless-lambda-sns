module.exports.dispatch = function(event) {
    console.log('made it')

    event.Records.forEach(record => {
        // Parse record body if it is a string
        const request_body = (typeof record.body == 'string') ? JSON.parse(record.body):record.body
    })
}
