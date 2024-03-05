import {AccountModule} from "../../../src/account/account.module";
import {DatabaseModule} from "../../../src/database/database.module";
import {Logger} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {UserRepository} from "../../../src/account/user.repository";
import {TeamRepository} from "../../../src/account/team.repository";
import {v4 as uuid} from "uuid"
describe("Should create user with team", () => {
    let userRepository: UserRepository
    let teamRepository: TeamRepository

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
    });

    it("Should create simple team", async () => {
        // given - team name
        const teamName = uuid()

        //when
        const team = await teamRepository.save(
            {
                name: teamName,
            }
        );

        //then
        const teams = await teamRepository.find({
            where: {
                name: teamName
            }
        })
        expect(teams).toHaveLength(1);
    });
});
