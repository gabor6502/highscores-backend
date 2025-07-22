import { DataSource } from 'typeorm'
import { Score } from '../entity/Score'

/**
 * @name ScoresDataSource
 *
 * @description Properties of the Data Source for the scores.
 */
export const ScoresDataSource = new DataSource(
{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'DogHighscore',
    password: 'dogs',
    database: 'DogSpinnerXScores',
    entities: ['/../**/**.entity{.ts,.js}'],
    synchronize: true
})

/**
 * @name ScoresManager
 * 
 * @description Entity Manager for Scores 
 */
export const ScoresManager = ScoresDataSource.manager


/**
 * @name ScoresRepository
 * 
 * @description Repository for Scores 
 */
export const ScoresRepository = ScoresDataSource.getRepository(Score)

/**
 * @name initScoresDataSource
 * 
 * @description Initializes the data source
 * 
 * @returns Promise<void>
 */
export async function initScoresDataSource(): Promise<void>
{
    try
    {
        await ScoresDataSource.initialize()

        console.log("Data source init!")
    } catch (error)
    {
        console.log("FAILED to init data source")
        console.log(error)
    }
}