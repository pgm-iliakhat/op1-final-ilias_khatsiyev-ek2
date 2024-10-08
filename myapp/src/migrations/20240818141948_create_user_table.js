const tableName = "user";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("lastname").notNullable();
    table.string("firstname").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
