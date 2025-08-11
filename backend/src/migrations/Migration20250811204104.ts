import { Migration } from '@mikro-orm/migrations'

export class Migration20250811204104 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table \`drinktype\` add \`default_percentage\` numeric(5,2) not null, add \`created_at\` datetime not null, add \`updated_at\` datetime not null;`,
    )
    this.addSql(
      `alter table \`drinktype\` modify \`name\` varchar(100) not null, modify \`default_price\` numeric(10,2) not null, modify \`default_size\` numeric(8,2) not null;`,
    )

    this.addSql(`alter table \`user\` add unique \`user_email_unique\`(\`email\`);`)
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table \`drinktype\` drop column \`default_percentage\`, drop column \`created_at\`, drop column \`updated_at\`;`,
    )

    this.addSql(
      `alter table \`drinktype\` modify \`name\` varchar(255) not null, modify \`default_price\` int not null, modify \`default_size\` int not null;`,
    )

    this.addSql(`alter table \`user\` drop index \`user_email_unique\`;`)
  }
}
