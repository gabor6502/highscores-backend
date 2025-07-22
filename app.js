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
   let result = await controller.getTopTenScores()

   responseFromController(result, response)
})

app.get('/userTopFiveScores',  async (request, response) => 
{
    let result = await controller.getTopFiveUserScores(request.query.username)

    responseFromController(result, response)
})

app.post('/addScore', async (request, response) => 
{
    let result = await controller.addScore(request.body.username, request.body.score, request.body.date)

    responseFromController(result, response)
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
