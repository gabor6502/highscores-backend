import { ScoreController, ScoresResponse } from "../../src/controller/ScoreController";
import { DateFormatError, ScoreService } from "../../src/service/ScoreService";

jest.mock("../../src/service/ScoreService")

function expectClientError(service: jest.Mocked<ScoreService>, result: ScoresResponse)
{
        expect(result.status).toBe(400)

        expect(result.body).toBeDefined()
        expect(result.body?.length).toBeGreaterThan(0)
        expect(result.json).toStrictEqual({})
}

describe("Score Controller", () => 
{
    let controller: ScoreController
    let service: jest.Mocked<ScoreService>

    beforeEach(() => 
    {
        service = new (<new () => ScoreService>ScoreService)() as jest.Mocked<ScoreService>
        controller = new ScoreController(service);
    })

    it ("should insert a new score since all paramters are valid", async () => 
    {
        let username: string, score: number, date: string

        // given
        service.addScore.mockReturnValueOnce(Promise.resolve())

        // when
        username = "valid username"
        score = 1234567890
        date = "2025-08-01Z+5:00" // valid date string is YYYY:MM:DDZ[+/-]##:00. This is August 1st, 2025, CST

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(1);
        
        expect(result.status).toBe(201)

        expect(result.body).toBeDefined()
        expect(result.body?.length).toBeGreaterThan(0)
        expect(result.json).toStrictEqual({})
    })

    it ("should fail to insert a score due to an undefined username", async () => 
    {
        let username: undefined, score: number, date: string

        // when
        username = undefined
        score = 1234567890
        date = "2025-08-01Z+5:00" 

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(0);
        expectClientError(service, result)
    })

    it ("should fail to insert a score due an undefined score value", async () => 
    {
        let username: string, score: undefined, date: string

        // when
        username = "valid username"
        score = undefined
        date = "2025-08-01Z+5:00" 

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(0);
        expectClientError(service, result)
    })

    it ("should fail to insert a score due an undefined date value", async () => 
    {
        let username: string, score: number, date: undefined

        // when
        username = "valid username"
        score = 1234567890
        date = undefined

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(0);
        expectClientError(service, result)
    })

    it ("should be able to handle a date format error (specifically number/character ranges) sent from service", async () => 
    {
        let username: string, score: number, date: string

        // given
        service.addScore.mockImplementationOnce(() => {throw new DateFormatError()})

        // when
        username = "valid username"
        score = 1234567890
        date = "2019:13:00Z=12:34" // invalid date string

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(1);
        expectClientError(service, result)
    })

    it ("should be able to handle a date format error (specifically poor formatting) sent from service", async () => 
    {
        let username: string, score: number, date: string

        // given
        service.addScore.mockImplementationOnce(() => {throw new DateFormatError()})

        // when
        username = "valid username"
        score = 1234567890
        date = "2021-10-20" // invalid date string

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(1);
        expectClientError(service, result)
    })

})

