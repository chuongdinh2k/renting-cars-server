import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCarThumbnailField21700983395482
  implements MigrationInterface
{
  name = 'UpdateCarThumbnailField21700983395482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`car\` ADD \`thumbnail\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`car\` DROP COLUMN \`thumbnail\``);
  }
}
