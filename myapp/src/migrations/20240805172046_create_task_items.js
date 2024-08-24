const tableName = "tasks";

export function up(knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("task").notNullable();
    table.boolean("checked").notNullable().defaultTo(false);
    table.integer("category_id").unsigned().notNullable().defaultTo(1);
    table.foreign("category_id").references("categories.id");
  });
}

export function down(knex) {
  return knex.schema.dropTable(tableName);
}
