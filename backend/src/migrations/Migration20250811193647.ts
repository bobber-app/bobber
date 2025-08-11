import { Migration } from '@mikro-orm/migrations'

export class Migration20250811193647 extends Migration {
  override up(): void {
    this.addSql(`create table \`drinktype\`
                 (
                   \`id\`            int unsigned not null auto_increment primary key,
                   \`name\`          varchar(255) not null,
                   \`default_price\` int          not null,
                   \`default_size\`  int          not null
                 ) default character set utf8mb4 engine = InnoDB;`)
  }

  override down(): void {
    this.addSql(`drop table if exists \`drinktype\`;`)
  }
}
