import { DataSource } from 'typeorm'

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
