import { ScoresControllerTestingPack } from "../ScoreController.test";
import { DateFormatError, UsernameCharacterLimitError } from "../../../src/service/ScoreService";
import { MAX_USERNAME_LENGTH } from "../../../src/entity/Score";

export function addTests()
{
    var testPack: ScoresControllerTestingPack

    beforeEach(() => 
    {
        testPack = new ScoresControllerTestingPack()
    })

    it ("should insert a new score since all paramters are valid", async () => 
    {
        let username: string, score: number, date: string

        // given
        testPack.service.addScore.mockReturnValueOnce(Promise.resolve())

        // when
        username = "valid username"
        score = 1234567890
        date = "2025-08-01Z+5:00" // valid date string is YYYY:MM:DDZ[+/-]##:00. This is August 1st, 2025, CST

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(1);
        expect(result.status).toBe(201)
        expect(result.body).toBeDefined()
        expect(result.body?.length).toBeGreaterThan(0)
        expect(result.json).toStrictEqual({})
    })

    it ("should fail to insert a score due to a username that's too long", async () =>
    {
        let username: string, score: number, date: string

        // given
        testPack.service.addScore.mockImplementationOnce(() => {throw new UsernameCharacterLimitError()})

        // when
        score = 40206090
        date = "2025-08-01Z+5:00"
        username = ""

        // generate a username that's a character too long
        for (let i = 0; i <= MAX_USERNAME_LENGTH; i++)
        {
            username += 'y'
        }

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(1)
        expect(result.body === new UsernameCharacterLimitError().message) // body should be the same as the error message
        ScoresControllerTestingPack.expectClientError(result)

    })

    it ("should fail to insert a score due to an undefined username", async () => 
    {
        let username: undefined, score: number, date: string

        // when
        username = undefined
        score = 1234567890
        date = "2025-08-01Z+5:00" 

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(0)
        ScoresControllerTestingPack.expectClientError(result)
    })

    it ("should fail to insert a score due an undefined score value", async () => 
    {
        let username: string, score: undefined, date: string

        // when
        username = "valid username"
        score = undefined
        date = "2025-08-01Z+5:00" 

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(0)
        ScoresControllerTestingPack.expectClientError(result)
    })

    it ("should fail to insert a score due an undefined date value", async () => 
    {
        let username: string, score: number, date: undefined

        // when
        username = "valid username"
        score = 1234567890
        date = undefined

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(0)
        ScoresControllerTestingPack.expectClientError(result)
    })

    it ("should fail to insert a score due to everything being undefined", async () => 
    {
        // when
        const result = await testPack.controller.addScore(undefined, undefined, undefined);

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(0)
        ScoresControllerTestingPack.expectClientError(result)
    })

    it ("should be able to handle a date format error (specifically number/character ranges) sent from service", async () => 
    {
        let username: string, score: number, date: string

        // given
        testPack.service.addScore.mockImplementationOnce(() => {throw new DateFormatError()})

        // when
        username = "valid username"
        score = 1234567890
        date = "2019:13:00Z=12:34" // invalid date string (year is too low, month is too high, day is wrong, no +/-, and GMT offset is invalid)

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(1)
        expect(result.body === new DateFormatError().message) // body should be the same as the error message
        ScoresControllerTestingPack.expectClientError(result)
    })

    it ("should be able to handle a date format error (specifically poor formatting) sent from service", async () => 
    {
        let username: string, score: number, date: string

        // given
        testPack.service.addScore.mockImplementationOnce(() => {throw new DateFormatError()})

        // when
        username = "valid username"
        score = 1234567890
        date = "2021-10-20" // invalid date string (doesn't conform to date string standards)

        const result = await testPack.controller.addScore(username, score, date)

        // then
        expect(testPack.service.addScore).toHaveBeenCalledTimes(1)
        expect(result.body === new DateFormatError().message) // body should be the same as the error message
        ScoresControllerTestingPack.expectClientError(result)
    })
}