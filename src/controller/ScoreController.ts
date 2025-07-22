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
     * @returns Data ready to be put into the HTTP response
     */
    async getTopTenScores() : Promise<ScoresResponse>
    {
        let jsonScores
        let response = {status: 200, json: {}, body: ""}

        try
        {
            jsonScores = await this.scoreService.getTopTen()
            response.json = jsonScores
        } catch(error)
        {
            response.status = 500
            response.body = error   
        }

        return response
    }
}