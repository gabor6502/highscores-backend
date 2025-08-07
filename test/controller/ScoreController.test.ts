import { ScoreController, ScoresResponse } from "../../src/controller/ScoreController";
import { ScoreService } from "../../src/service/ScoreService";
import { addTests } from "./units/ScoreController.add.test";
import { getTests } from "./units/ScoreController.get.test";

jest.mock("../../src/service/ScoreService")

/**
 * @name ScoresControllerTestingPack
 * 
 * @description A class to contain instances and functions relevant to unit testing the ScoresController
 */
export class ScoresControllerTestingPack
{
    #_controller: ScoreController // will be testing instances of these
    #_service: jest.Mocked<ScoreService> // will be mocked for unit testing

    constructor()
    {
        this.#_service = new (<new () => ScoreService>ScoreService)() as jest.Mocked<ScoreService>
        this.#_controller = new ScoreController(this.#_service);
    }

    /**
     * @name expectClientError
     * 
     * @description Expects a client error (400) response
     * 
     * @param result Resulting response from the controller to check properties of
     */
    static expectClientError(result: ScoresResponse)
    {
        expect(result.status).toBe(400)
        expect(result.body).toBeDefined()
        expect(result.body?.length).toBeGreaterThan(0)
        expect(result.json).toStrictEqual({})
    }
    
    get controller()
    {
        return this.#_controller;
    }

    get service()
    {
        return this.#_service
    }
}

describe("Score Controller Tests", () => 
{
    describe("Inserting Scores Tests", addTests)
    describe("Getting Scores Tests", getTests)
})
