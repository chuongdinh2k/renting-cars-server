import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveFKFieldCarTables1700983840416 implements MigrationInterface {
  name = 'RemoveFKFieldCarTables1700983840416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`car\` DROP FOREIGN KEY \`FK_eadf0057ffb22a0c03a577f4150\``,
    );
    await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`bookingsId\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`car\` ADD \`bookingsId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`car\` ADD CONSTRAINT \`FK_eadf0057ffb22a0c03a577f4150\` FOREIGN KEY (\`bookingsId\`) REFERENCES \`booking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
