import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "./user.entity";

@Entity({
    name: "teams"
})
export class TeamEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: "owner_id" })
    owner: UserEntity;

    @Column({
        name: "owner_id"
    })
    ownerId: number
}
