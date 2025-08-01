import { Score } from '../entity/Score'

// The JSON response for a score
export type ScoreJSON = {username: string, score: string, dateScored: string}

// the expected format for dates that will be put in the DB
const DATE_REGEX = /20[2-9]\d:((0[1-9])|(1[0-2])):(([0-2][1-9])|(3[0-1]))Z[+|-](((0\d)|(1[0-2])):[0]{2})/

export class DateFormatError extends Error
{
    constructor()
    {
        super("Date was not in the format YYYY:MM:DDZ[+/-]##:00")
    }
}

/**
 * @name ScoreService
 * 
 * @description Communicates with database and performs create and read operations
 */
export class ScoreService
{

    private scoresRepository
    private scoresManager

    constructor(repo, manager)
    {
        this.scoresRepository = repo
        this.scoresManager = manager
    }

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
     * @name getScores
     * 
     * @description Gets a certain amount of scores on a given page of the scorebook
     * 
     * @param pageNo page number (first page = 0)
     * @param scoresPerPage number of scores to put on each page
     * 
     * @returns Promise of JSON scores
     */
    async getScores(pageNo: number, scoresPerPage: number): Promise<ScoreJSON[]>
    {
        let jsonScores: ScoreJSON[] = []
        let scores: Score[] = await this.scoresRepository.find(
        {
            order: 
            {
                score: "ASC"
            },
            skip: pageNo * scoresPerPage, 
            take: scoresPerPage,
        })

        this.entitiesToJSON(scores, jsonScores)

        return jsonScores
    }

    /**
     * @name getTopUserScores
     * 
     * @param user the username
     * @param count the number of scores to get
     * 
     * @returns Promise of JSON scores
     */
    async getTopUserScores(user: string, count: number): Promise<ScoreJSON[]>
    {
        let jsonScores: ScoreJSON[] = []
        let scores: Score[] = await this.scoresRepository.find(
        {
            where:
            {
                username: user
            },
            order: 
            {
                score: "ASC"
            },
            take: count
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
     * @param date the data the score was achvieved on. Must be in YYYY:MM:DDZ[+/-]##:00 format
     * 
     * @returns Promise void
     */
    async addScore(username: string, score: number, date: string): Promise<void>
    {
        if (DATE_REGEX.test(date)) // make sure the date is appropriately formatted
        {
            await this.scoresManager.insert(Score, {username: username, score: score, dateScored: new Date(date)})
        }
        else
        {
            throw new DateFormatError()
        }
    }
}