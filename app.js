import "reflect-metadata"
import { ScoresRepository, ScoresManager, initScoresDataSource } from './src/service/ScoreSource.js'
import { ScoreController } from "./src/controller/ScoreController.js";
import { ScoreService } from "./src/service/ScoreService.js";

const express = require('express')

const app = express();
const PORT = 6969

const controller = new ScoreController(new ScoreService(ScoresRepository, ScoresManager))

/**
 * @name responseFromController
 * 
 * @description Takes a result from the controller and sets its data in an HTTP response
 * 
 * @param result the result to convert
 * @param response the repsonse to set data of
 */
function responseFromController(result, response)
{
    response.status(result.status)
    response.body(result.body)
    response.json(result.json)
}

/**
 * @name GET-scores
 * 
 * @description Gets a page of a certain amount of scores. Uses query params
 * 
 * @param pageNo Page of scores to get
 * @param scoresPerPage Number of scores to put on that page
 */
app.get('/scores', async (request, response) => 
{
    let result = await controller.getScoresPaginated(request.query.pageNo ,request.query.scoresPerPage);

    responseFromController(result, response)
})

/**
 * @name GET-userTopScores
 * 
 * @description Gets the top n scores of a given username. Uses query params
 * 
 * @param username The username in question.
 * @param count The number of their scores to get.
 */
app.get('/userTopFiveScores',  async (request, response) => 
{
    let result = await controller.getTopUserScores(request.query.username, request.query.count)

    responseFromController(result, response)
})

/**
 * @name POST-addScore
 * 
 * @description Adds a score into the database
 * 
 * @param body Body needs to have the username, score, and date the score was earned on. Date must be in format YYYY:MM:DDZ[+/-]##:00
 */
app.post('/addScore', async (request, response) => 
{
    let result = await controller.addScore(request.body.username, request.body.score, request.body.date)

    responseFromController(result, response)
})

/**
 * @description Server starts here. Inits DB then beings listening
 */
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
