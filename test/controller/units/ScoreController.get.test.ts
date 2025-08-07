import { ScoresControllerTestingPack } from "../ScoreController.test";
import { ScoreJSON } from "../../../src/service/ScoreService";

export function getTests()
{
    const fakeScores: ScoreJSON[] = 
    [ 
        {username: "BigRig2117", score: 132342, dateScored: "2022/01/07"},
        {username: "LionelMessi#1", score: 22314, dateScored: "2024/04/30"},
        {username: "JRazz", score: 9859348, dateScored: "2020/11/23"},
        {username: "ColloqiuallyKnown", score: 202123, dateScored: "2005/03/12"},
        {username: "g a choo", score: 777777777, dateScored: "2018/09/25"},
        {username: "womp", score: 5345435, dateScored: "2018/09/05"},
        {username: "klung", score: 32423, dateScored: "2012/09/22"},
        {username: "terry!", score: 867756, dateScored: "2017/09/23"},
        {username: "wilford", score: 23123, dateScored: "2011/01/15"},
        {username: "brumley", score: 86546357, dateScored: "2013/08/20"},
        {username: "klakkin", score: 123312, dateScored: "2019/05/07"},
        {username: "the clapper", score: 432132, dateScored: "2000/03/04"},
        {username: "CAPSLAWK", score: 7562, dateScored: "2041/11/25"},
        {username: "KdotLame-arr", score: 423132, dateScored: "2013/12/09"},
        {username: "Dranke", score: 6787654, dateScored: "2015/10/29"},
        {username: "iliak2gamble", score: 1322132, dateScored: "2014/06/18"},
        {username: "theusername", score: 12212, dateScored: "2017/06/06"},
        {username: "thecoolerusername", score: 88453234, dateScored: "2022/07/25"}
    ]

    var testPack: ScoresControllerTestingPack

    beforeEach(() => 
    {
        testPack = new ScoresControllerTestingPack()
    })   

    it ("should do something", ()=> {console.log("i'm something")})
}