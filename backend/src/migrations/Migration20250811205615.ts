import { Migration } from '@mikro-orm/migrations'

export class Migration20250811205615 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`drinktypes\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(100) not null, \`default_price\` numeric(10,2) not null, \`default_size\` numeric(8,2) not null, \`default_percentage\` numeric(5,2) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )

    this.addSql(
      `create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(`alter table \`users\` add unique \`users_email_unique\`(\`email\`);`)

    this.addSql(`drop table if exists \`drinktype\`;`)

    this.addSql(`drop table if exists \`user\`;`)
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table \`drinktype\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(100) not null, \`default_price\` numeric(10,2) not null, \`default_size\` numeric(8,2) not null, \`default_percentage\` numeric(5,2) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )

    this.addSql(
      `create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`)

    this.addSql(`drop table if exists \`drinktypes\`;`)

    this.addSql(`drop table if exists \`users\`;`)
  }
}
