import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserTeams1709499839546 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                confirmed BOOLEAN NOT NULL,
                team_id INT,
                INDEX IDX_team_id (team_id)
            ) ENGINE=InnoDB;
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS teams (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            ) ENGINE=InnoDB;
        `);

        await queryRunner.query(`
            ALTER TABLE teams
            ADD COLUMN owner_id INT,
            ADD CONSTRAINT FK_teams_owner_id_users FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
            ADD UNIQUE INDEX IDX_owner_id (owner_id);
        `);

        await queryRunner.query(`
            ALTER TABLE users
            ADD CONSTRAINT FK_users_team_id_teams FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE users DROP FOREIGN KEY FK_users_team_id_teams;");
        await queryRunner.query("DROP TABLE IF EXISTS users;");
        await queryRunner.query("DROP TABLE IF EXISTS teams;");
    }
}
