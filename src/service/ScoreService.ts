import { ScoresRepository, ScoresManager } from './ScoreSource'
import { Score } from '../entity/Score'

export type ScoreJSON = {username: string, score: string, dateScored: string}

/**
 * @name ScoreService
 * 
 * @description Communicates with database and performs create and read operations
 */
export class ScoreService
{

    /**
     * @name entitiesToJSON
     * 
     * @description helper func that converts Score entities to JSON score types
     * 
     * @param entities The score entities to convert
     * @param jsonEnts The initialized empty ScoreJSON list to populate
     */
    private entitiesToJSON(entities: Score[], jsonEnts: ScoreJSON[])
    {
        entities.forEach((entity, index) => 
        {
            jsonEnts[index] = { username: entity.username,
                                score: entity.score+'',
                                dateScored: entity.dateScored.toDateString()
                              }
        })
    }

    /** 
     * @name getTopTen
     * 
     * @description Gets the top 10 scores out of all in the database
     * 
     * @returns Promise of JSON scores
     */
    async getTopTen(): Promise<ScoreJSON[]>
    {
        let jsonScores: ScoreJSON[] = []
        let scores: Score[] = await ScoresRepository.find(
        {
            order: 
            {
                score: "ASC"
            },
            take: 10
        })

        this.entitiesToJSON(scores, jsonScores)

        return jsonScores
    }

    /**
     * @name getTopFiveUserScores
     * 
     * @param user the username
     * 
     * @returns Promise of JSON scores
     */
    async getTopFiveUserScores(user: string): Promise<ScoreJSON[]>
    {
        let jsonScores: ScoreJSON[] = []
        let scores: Score[] = await ScoresRepository.find(
        {
            where:
            {
                username: user
            },
            order: 
            {
                score: "ASC"
            },
            take: 5
        })

        this.entitiesToJSON(scores, jsonScores)

        return jsonScores
    }

    /**
     * @name addScore
     * 
     * @description Adds a score into the database
     * 
     * @param username the username of who achieved the score
     * @param score the score acheived
     * @param date the data the score was achvieved on
     */
    async addScore(username: string, score: number, date: string)
    {
        await ScoresManager.insert(Score, {username: username, score: score, dateScored: new Date(score)}) 
    }
}