import { Migration } from '@mikro-orm/migrations'

export class Migration20250802135213 extends Migration {
  override up(): void {
    this.addSql(
      `create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`,
    )
  }
}
