import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {TransactionalRepository} from "../database/transactional.repository";
import {UserEntity} from "./user.entity";

@Injectable()
export class UserRepository extends TransactionalRepository<UserEntity, UserRepository> {
    constructor(
        @InjectRepository(UserEntity)
            repository: Repository<UserEntity>,
    ) {
        super(UserEntity, repository);
    }

    transactional(entityManager: EntityManager): UserRepository {
        return this.fromEntityManager(
            entityManager,
            (repository) => new UserRepository(repository),
        );
    }
}
