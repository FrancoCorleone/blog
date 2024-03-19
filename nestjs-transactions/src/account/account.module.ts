import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {TeamEntity} from "./team.entity";
import {UserRepository} from "./user.repository";
import {TeamRepository} from "./team.repository";
import {AccountService} from "./account.service";

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
        AccountService
    ]
})
export class AccountModule {

}
