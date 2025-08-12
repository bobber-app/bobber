import { Migration } from '@mikro-orm/migrations'

export class Migration20250811212446 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table \`drinktype\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(100) not null, \`default_price\` numeric(10,2) not null, \`default_size\` numeric(8,2) not null, \`default_percentage\` numeric(5,2) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )

    this.addSql(
      `create table \`user\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`)

    this.addSql(
      `create table \`drink\` (\`id\` int unsigned not null auto_increment primary key, \`drinktype_id\` int unsigned not null, \`user_id\` int unsigned not null, \`amount\` numeric(10,2) not null, \`size\` numeric(8,2) not null, \`price\` numeric(5,2) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(`alter table \`drink\` add index \`drink_drinktype_id_index\`(\`drinktype_id\`);`)
    this.addSql(`alter table \`drink\` add index \`drink_user_id_index\`(\`user_id\`);`)

    this.addSql(
      `alter table \`drink\` add constraint \`drink_drinktype_id_foreign\` foreign key (\`drinktype_id\`) references \`drinktype\` (\`id\`) on update cascade;`,
    )
    this.addSql(
      `alter table \`drink\` add constraint \`drink_user_id_foreign\` foreign key (\`user_id\`) references \`user\` (\`id\`) on update cascade;`,
    )

    this.addSql(`drop table if exists \`drinktypes\`;`)

    this.addSql(`drop table if exists \`users\`;`)
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`drink\` drop foreign key \`drink_drinktype_id_foreign\`;`)

    this.addSql(`alter table \`drink\` drop foreign key \`drink_user_id_foreign\`;`)

    this.addSql(
      `create table \`drinktypes\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(100) not null, \`default_price\` numeric(10,2) not null, \`default_size\` numeric(8,2) not null, \`default_percentage\` numeric(5,2) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null) default character set utf8mb4 engine = InnoDB;`,
    )

    this.addSql(
      `create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null) default character set utf8mb4 engine = InnoDB;`,
    )
    this.addSql(`alter table \`users\` add unique \`users_email_unique\`(\`email\`);`)

    this.addSql(`drop table if exists \`drinktype\`;`)

    this.addSql(`drop table if exists \`user\`;`)

    this.addSql(`drop table if exists \`drink\`;`)
  }
}
