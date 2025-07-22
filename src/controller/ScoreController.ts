import { ScoreJSON, ScoreService } from "../service/ScoreService";

type ScoresResponse = { status:number, json: ScoreJSON[] | {}, body: string }

/**
 * @name ScoreController
 *
 * @description Communicates with the score service from HTTP requests
 */
export class ScoreController
{
    private scoreService

    constructor()
    {
        this.scoreService = new ScoreService()
    }

    /**
     * @name getTopTenScores
     * 
     * @description Gets the top 10 scores from the service, assigns HTTP response
     * 
     * @returns (Promise) Data ready to be put into the HTTP response
     */
    async getTopTenScores(): Promise<ScoresResponse>
    {
        const NUM_SCORES = 10

        let jsonScores
        let response = {status: 200, json: {}, body: ""} // init response

        try
        {
            jsonScores = await this.scoreService.getTopScores(NUM_SCORES)
            response.json = jsonScores
        } catch(error)
        {
            response.status = 500
            response.body = error   
        }

        return response
    }

    /**
     * @name getTopFiveUserScores
     * 
     * @description Gets the given user's top 5 scores from the service, assigns HTTP response
     * 
     * @param username The username to get the top 5 scores of. If undefined, returns 400
     * 
     * @returns (Promise) Data ready to be put into the HTTP response
     */
    async getTopFiveUserScores(username: string | undefined): Promise<ScoresResponse>
    {
        const NUM_SCORES = 5

        let jsonScores
        let response = {status: 200, json: {}, body: ""} // init response

        if (username)
        {
            try
            {
                jsonScores = await this.scoreService.getUserScores(username, NUM_SCORES)
                response.json = jsonScores
            } catch(error)
            {
                response.status = 500
                response.body = error  
            }
        }
        else
        {
            response.status = 400
            response.body = "No username was sent"
        }

        return response
    }

    /**
     * @name addUser
     * 
     * @description Adds a new score into the database. If one of the expected properties is missing, HTTP status 400 is sent
     * 
     * @param username the username of who achieved the score
     * @param score the score acheived
     * @param date the data the score was achvieved on
     * 
     * @returns void promise
     */
    async addUser(username: string | undefined, score: number | undefined, date: string | undefined): Promise<ScoresResponse>
    {
        let response = {status: 200, json: {}, body: ""} // init response

        if (username && score && date)
        {
            try
            {
                await this.scoreService.addScore(username, score, date)
            } catch(error)
            {
                response.status = 500
                response.body = "Server error occured"
            }

            response.status = 200
            response.body = "score added successfuly"
        }
        else
        {
            response.status = 400
            response.body = "Missing one of: username, score, or date acheived"
        }

        return response
    }

}