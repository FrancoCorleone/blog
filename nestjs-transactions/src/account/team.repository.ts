import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {TeamEntity} from "./team.entity";
import {TransactionalRepository} from "../database/transactional.repository";

@Injectable()
export class TeamRepository extends TransactionalRepository<TeamEntity, TeamRepository> {
    constructor(
        @InjectRepository(TeamEntity)
            repository: Repository<TeamEntity>,
    ) {
        super(TeamEntity, repository);
    }

    transactional(entityManager: EntityManager): TeamRepository {
        return this.fromEntityManager(
            entityManager,
            (repository) => new TeamRepository(repository),
        );
    }

}
