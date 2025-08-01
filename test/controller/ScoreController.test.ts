import { ScoreController } from "../../src/controller/ScoreController";
import { ScoreService } from "../../src/service/ScoreService";

jest.mock("./../src/service/ScoreService.ts")

describe("Score Controller", () => 
{
    let controller: ScoreController
    let service: jest.Mocked<ScoreService>

    beforeEach(() => 
    {
        service = new (<new () => ScoreService>ScoreService)() as jest.Mocked<ScoreService>
        controller = new ScoreController(service);
    })

    it("should say a test hello", () => 
    {
        console.log("HI!!!!!")
    })

})

