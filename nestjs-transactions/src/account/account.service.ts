import {ConflictException, Injectable, Logger} from "@nestjs/common";
import {TeamRepository} from "./team.repository";
import {UserRepository} from "./user.repository";
import {EntityManager} from "typeorm";
import {INewTeam} from "./vto";

@Injectable()
export class AccountService {
    private readonly logger = new Logger(AccountService.name)

    constructor(private readonly teamRepository: TeamRepository,
                private readonly userRepository: UserRepository,
                private readonly entityManager: EntityManager) {}

    async createTeamAccount(accountInfo: INewTeam) {
        await this.entityManager.transaction(async em => {
            await this.internalCreateTeamAccount(accountInfo, em)
        }).catch(err => {
            this.logger.error(`Transaction failed {err=${err}}`)
            if(err.code == "ER_DUP_ENTRY") {
                throw new ConflictException()
            }
            throw err
        })
    }

    private async internalCreateTeamAccount(accountInfo: INewTeam, em: EntityManager) {
        const {userRepository, teamRepository} =
            this.transactionalRepositories(em);

        const team = await teamRepository.save({
            name: accountInfo.team.name ?? `${accountInfo.owner.firstName} ${accountInfo.owner.lastName} Team`,
        });

        const user = await userRepository.save({
            firstName: accountInfo.owner.firstName,
            lastName: accountInfo.owner.lastName,
            email: accountInfo.owner.email,
            confirmed: false,
            teamId: team.id,
        });

        await teamRepository.update({
                id: team.id,
            }, {
                ownerId: user.id,
            },
        );
    }


    private transactionalRepositories(entityManager: EntityManager) {
        return {
            userRepository: this.userRepository.transactional(entityManager),
            teamRepository:
                this.teamRepository.transactional(entityManager),
        };
    }
}
