const express = require('express')

const app = express();
const PORT = 6969

app.get('/topTenScores', (req, res) => 
{
    res.status(501)
    res.send("top ten scores not implemented yet")
})

app.get('/userScores',  (req, res) => 
{
    let username = req.query.username
    if (username)
    {
        res.status(501)
        res.send("user scores not implemented yet")
    }
    else
    {
        res.status(400)
        
    }
})

app.post('/addScore', (req, res) => 
{
    // expected data in body

    res.status(501)
    res.send("add scores not implemented yet")
})

app.listen(PORT, (error) => 
{
    if (error)
    {
        console.log(error.message)
    }
    else
    {
        console.log(`listening on port ${PORT}`)
    }
})