const tableName = "category";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("category").notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
