const express = require('express')

const app = express()
const port = 3000;


app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})