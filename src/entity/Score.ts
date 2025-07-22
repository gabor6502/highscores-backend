import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'score'})
export class Score {

    private MAX_USERNAME_LENGTH: number = 256

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 256, unique: true }) // figure out how to link with constant above
    username: string

    @Column({ type: 'integer' })
    score: number

    @Column({ type: 'timestamptz' })
    dateScored: Date

    get maxUsernameLength()
    {
        return this.MAX_USERNAME_LENGTH;
    }
}
