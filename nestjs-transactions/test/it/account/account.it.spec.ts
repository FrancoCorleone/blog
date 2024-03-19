import {AccountModule} from "../../../src/account/account.module";
import {DatabaseModule} from "../../../src/database/database.module";
import {ConflictException, Logger} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {UserRepository} from "../../../src/account/user.repository";
import {TeamRepository} from "../../../src/account/team.repository";
import {AccountService} from "../../../src/account/account.service";

describe("Should create user with team", () => {
    let userRepository: UserRepository
    let teamRepository: TeamRepository
    let accountService: AccountService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                AccountModule,
                DatabaseModule
            ],
        })
            .compile();
        moduleRef.useLogger(new Logger());
        userRepository = moduleRef.get(UserRepository);
        teamRepository = moduleRef.get(TeamRepository);
        accountService = moduleRef.get(AccountService);
    });

    it("should successfully create a team and user account", async () => {
        //given
        const accountInfo = {
            owner: {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            },
            team: {
                name: "John's Team",
            },
        };

        //when
        await accountService.createTeamAccount(accountInfo);

        //then
        const user = await userRepository.findOne({
            where: {
                email: "john.doe@example.com",
            },
        });

        const team = await teamRepository.findOne({
            where: {
                id: user.teamId,
            },
        });

        expect(user.firstName).toEqual("John");
        expect(team.name).toEqual("John's Team");
        expect(team.ownerId).toEqual(user.id);
    });

    it("should roll back transaction on unique constraint violation", async () => {
        //given
        const accountInfo1 = {
            owner: {
                firstName: "Eve",
                lastName: "Smith",
                email: "eve.smith@example.com",
            },
            team: {
                name: "Eve's Team",
            },
        };

        const accountInfo2 = {
            owner: {
                firstName: "Alice",
                lastName: "Jones",
                email: "eve.smith@example.com",
            },
            team: {
                name: "Alice's Team",
            },
        };

        //when
        await accountService.createTeamAccount(accountInfo1);

        //and
        await expect(accountService.createTeamAccount(accountInfo2)).rejects.toThrow(ConflictException);

        //then - first account should be created
        const user1 = await userRepository.findOne({
            where: { email: "eve.smith@example.com" },
        });
        expect(user1).not.toBeNull();

        //and - second account should not be created
        const team2 = await teamRepository.findOne({
            where: { name: "Alice's Team" },
        });
        expect(team2).toBeNull();
    });
});
