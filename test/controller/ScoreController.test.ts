import { ScoreController } from "../../src/controller/ScoreController";
import { ScoreService } from "../../src/service/ScoreService";

jest.mock("../../src/service/ScoreService")

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
        let username:string, score:number, date: string

        // given
        service.addScore.mockReturnValueOnce(Promise.resolve())

        // when
        username = "valid username"
        score = 1234567890
        date = "2025-08-01Z+5:00" // valid date string is YYYY-MM-DDTHH:mm:ss.sssZ. This is August 1st, 2025, CST

        const result = await controller.addScore(username, score, date)

        // then
        expect(service.addScore).toHaveBeenCalledTimes(1);
        
        expect(result.status).toBe(201)

        expect(result.body).toBeDefined()
        expect(result.body?.length).toBeGreaterThan(0)
        expect(result.json).toStrictEqual({})
    })

    it ("should fail to inserta score due to a bad username", async () => 
    {
        
    })

    it ("should fail to insert a score due a bad score value", async () => 
    {
        
    })

    it ("should fail to insert a score due a bad date value", async () => 
    {
        
    })

    it ("should fail to insert a score due improper date formatting", async () => 
    {
        
    })

})

