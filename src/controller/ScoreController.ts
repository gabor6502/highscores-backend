import { ScoreJSON, ScoreService, DateFormatError, UsernameCharacterLimitError } from "../service/ScoreService";

export type ScoresResponse = { status:number, json: ScoreJSON[] | {}, body: string }

/**
 * @name ScoreController
 *
 * @description Communicates with the score service from HTTP requests
 */
export class ScoreController
{
    #_scoreService: ScoreService = null

    constructor(service: ScoreService)
    {
        this.#_scoreService = service
    }

    /**
     * @name getScoresPaginated
     * 
     * @description Gets a certain number of scores per a given page
     * 
     * @param pageNo page number (first page = 0). If undefined returns 400
     * @param scoresPerPage number of scores to put on each page. If undfined returns 400
     * 
     * @returns (Promise) Data ready to be put into the HTTP response
     */
    async getScoresPaginated(pageNo: number | undefined, scoresPerPage: number | undefined): Promise<ScoresResponse>
    {
        let jsonScores
        let response = {status: 200, json: {}, body: ""} // init response


        if (pageNo && scoresPerPage)
        {
            try
            {
                jsonScores = await this.#_scoreService.getScores(pageNo, scoresPerPage)
                response.json = jsonScores
            } catch(error)
            {
                response.status = 500
                response.body = error   
            }
        }
        else
        {
            if (pageNo == undefined)
            {
                response.status = 400
                response.body = "No page number supplied"
            }
            if (scoresPerPage == undefined)
            {
                if (response.status == 400)
                {
                    response.body += " and no scores count per page supplied"
                }
                else
                {
                    response.status = 400
                    response.body = "No scores count per page"
                }
            }
        }
        
        return response
    }
    
    /**
     * @name getTopUserScores
     * 
     * @description Gets the given user's top scores from the service, assigns HTTP response
     * 
     * @param username The username to get the top scores of. If undefined, returns 400
     * @param count The number of their scores to get. If undefined, returns 400
     * 
     * @returns (Promise) Data ready to be put into the HTTP response
     */
    async getTopUserScores(username: string | undefined, count: number | undefined): Promise<ScoresResponse>
    {

        let jsonScores
        let response = {status: 200, json: {}, body: ""} // init response

        if (username && count)
        {
            try
            {
                jsonScores = await this.#_scoreService.getTopUserScores(username, count)
                response.json = jsonScores
            } catch(error)
            {
                if (error instanceof UsernameCharacterLimitError)
                {
                    response.status = 400
                    response.body = error.message
                }
                else
                {
                    response.status = 500
                    response.body = "A server error occured"
                }
                
            }
        }
        else
        {
            if (username == undefined)
            {
                response.status = 400
                response.body = "No username was sent"
            }
            if (count == undefined)
            {
                if (response.status == 400)
                {
                    response.body += " and no score count was sent"
                }
                else
                {
                    response.status = 400
                    response.body = "No score count was sent"
                }
            }
        }

        return response
    }

    /**
     * @name addScore
     * 
     * @description Adds a new score into the database. If one of the expected properties is missing, HTTP status 400 is sent
     * 
     * @param username the username of who achieved the score
     * @param score the score acheived
     * @param date the data the score was achvieved on. Must be in YYYY:MM:DDZ[+/-]##:00 format
     * 
     * @returns void promise
     */
    async addScore(username: string | undefined, score: number | undefined, date: string | undefined): Promise<ScoresResponse>
    {
        let response = {status: 201, json: {}, body: ""} // init response (201 for resource created)

        if (username && score && date)
        {
            try
            {
                await this.#_scoreService.addScore(username, score, date)
            } catch(error)
            {
                if (error instanceof DateFormatError || error instanceof UsernameCharacterLimitError)
                {
                    response.status = 400
                    response.body = error.message;
                }
                else
                {
                    response.status = 500
                    response.body = "Server error occured"
                }
            }

            response.body = "score added successfuly"
        }
        else
        {
            if (username == undefined)
            {
                response.status = 400
                response.body = "Missing username"
            }
            if (score == undefined)
            {
                if (response.status == 400)
                {
                    response.body += " + score"
                }
                else
                {
                    response.status = 400
                    response.body = "Missing username"
                }
            }
            if (date == undefined)
            {
                if (response.status == 400)
                {
                    response.body += " + date acheived"
                }
                else
                {
                    response.status = 400
                    response.body = "Missing date acheived"
                }
            }
        }

        return response
    }
    
}
