import "reflect-metadata"
import { initScoresDataSource } from './src/service/ScoreSource.js'
import { ScoreController } from "./src/controller/ScoreController.js";

const express = require('express')

const app = express();
const PORT = 6969

const controller = new ScoreController()

function responseFromController(result, response)
{
    response.status(result.status)
    response.body(result.body)
    response.json(result.json)
}

app.get('/topTenScores', async (request, response) => 
{
   let result = await controller.getTopTen()

   responseFromController(result, response)
})

app.get('/userTopFiveScores',  async (req, res) => 
{
    /*
    let username = req.query.username
    let jsonUserScores

    if (username)
    {
        try
        {
            jsonUserScores = await scoreService.getTopFiveUserScores(username)
        } catch(error)
        {
            res.status(500)
            res.send("Server error occured")
            console.log(error)
        }

        res.status(200)
        res.json(jsonUserScores)
    }
    else
    {
        res.status(400)
        res.send("No username was sent.")
    }
    */
})

app.post('/addScore', async (req, res) => 
{
    /*
    if (!req.body.username)
    {
        res.status(400)
        res.send("Missing 'username' in body.")
    }

    if (!req.body.score)
    {
        res.status(400)
        res.send("Missing 'score' in body.")
    }
    if (!req.body.date)
    {
        res.status(400)
        res.send("Missing 'date' in body.")
    }
    else
    {
        try
        {
            await scoreService.addScore()
        } catch(error)
        {
            res.status(500)
            res.send("Server error occured")
            console.log(error)
        }

        res.status(200)
        res.send("score added successfuly")
    }
        */
})

app.listen(PORT, async (error) => 
{
    if (error)
    {
        console.log(error.message)
    }
    else
    {
        await initScoresDataSource()

        console.log(`Listening on port ${PORT}`)
    }
})
