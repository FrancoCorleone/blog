import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {TeamEntity} from "./team.entity";

@Entity({
    name: "users"
})
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    confirmed: boolean

    @ManyToOne(() => TeamEntity)
    @JoinColumn({ name: "team_id" })
    teamEntity: TeamEntity;

    @Column({
        name: "team_id"
    })
    teamId: number;
}
