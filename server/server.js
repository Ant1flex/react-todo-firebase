const express = require('express')

const port = 8000
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})


require('./routes')(app);

app.listen(port, () => {
    console.log('Server started')
});

