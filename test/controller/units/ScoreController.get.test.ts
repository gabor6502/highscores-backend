import { ScoresControllerTestingPack } from "../ScoreController.test";

export function getTests()
{
    var testPack: ScoresControllerTestingPack

    beforeEach(() => 
    {
        testPack = new ScoresControllerTestingPack()
    })   

    it ("should do something", ()=> {console.log("i'm something")})
}