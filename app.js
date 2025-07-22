import "reflect-metadata"
import { ScoresDataSource } from './src/service/ScoreSource.js'

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
        res.send("No username wwas sent.")
    }
})

app.post('/addScore', (req, res) => 
{
    // expected data in body

    res.status(501)
    res.send("add scores not implemented yet")
})

app.listen(PORT, async (error) => 
{
    if (error)
    {
        console.log(error.message)
    }
    else
    {
        try
        {
            await ScoresDataSource.initialize()

            console.log("Data source init!")
        } catch (error)
        {
            console.log("FAILED to init data source")
            console.log(error)
        }
    
        console.log(`Listening on port ${PORT}`)
    }
})