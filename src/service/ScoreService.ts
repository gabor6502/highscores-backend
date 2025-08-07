import { MAX_USERNAME_LENGTH, Score } from '../entity/Score'

// The JSON response for a score
export type ScoreJSON = {username: string, score: number, dateScored: string}

// the expected format for dates that will be put in the DB
const DATE_REGEX = /20[2-9]\d:((0[1-9])|(1[0-2])):(([0-2][1-9])|(3[0-1]))Z[+|-](((0\d)|(1[0-2])):[0]{2})/

/**
 * @name UsernameCharacterLimitError
 * 
 * @description Thrown when a username provided is too long
 */
export class UsernameCharacterLimitError extends Error
{
    constructor()
    {
        super(`Username exceeds character limit of ${MAX_USERNAME_LENGTH}`)
    }
}

/**
 * @name DateFormatError
 * 
 * @description Thrown when a date is formatted improperly
 */
export class DateFormatError extends Error
{
    constructor()
    {
        super("Date was not in the format 'YYYY:MM:DDZ[+/-]##:00'")
    }
}

/**
 * @name ScoreService
 * 
 * @description Communicates with database and performs create and read operations
 */
export class ScoreService
{

    #_scoresRepository
    #_scoresManager

    constructor(repo, manager)
    {
        this.#_scoresRepository = repo
        this.#_scoresManager = manager
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
                                score: entity.score,
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
        let scores: Score[] = await this.#_scoresRepository.find(
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
        let scores: Score[]

        if (user.length > MAX_USERNAME_LENGTH)
        {
            throw new UsernameCharacterLimitError()
        }
        
        scores = await this.#_scoresRepository.find(
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
        if (username.length > MAX_USERNAME_LENGTH)
        {
            throw new UsernameCharacterLimitError()
        }
        else if (DATE_REGEX.test(date)) // make sure the date is appropriately formatted
        {
            throw new DateFormatError()
        }
        else
        {
            await this.#_scoresManager.insert(Score, {username: username, score: score, dateScored: new Date(date)})
        }
    }
}