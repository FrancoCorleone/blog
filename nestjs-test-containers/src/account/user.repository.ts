import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./user.entity";

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    constructor(
        @InjectRepository(UserEntity)
            repository: Repository<UserEntity>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
