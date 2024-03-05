import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {TeamEntity} from "./team.entity";
import {UserRepository} from "./user.repository";
import {TeamRepository} from "./team.repository";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                UserEntity,
                TeamEntity
            ]
        )
    ],
    providers: [
        UserRepository,
        TeamRepository,
    ]
})
export class AccountModule {

}
