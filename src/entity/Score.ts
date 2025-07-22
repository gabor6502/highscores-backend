import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

export const MAX_USERNAME_LENGTH = 256

/**
 * @name Score
 * 
 * @description Stores a username (max 256 chars), the score acheived, and the date the score was achieved
 */
@Entity({name: 'score'})
export class Score {

    // composite key of username and their score

    @PrimaryColumn({ type: 'varchar', length: MAX_USERNAME_LENGTH, unique: true })
    username: string

    @PrimaryColumn()
    score: number

    @Column({ type: 'timestamptz' })
    dateScored: Date
}
