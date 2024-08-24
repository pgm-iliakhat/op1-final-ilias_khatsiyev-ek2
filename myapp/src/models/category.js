import knex from "../lib/knex.js";
import { Model } from "objection";
import Task from "./tasks.js";

Model.knex(knex);

class Category extends Model {
  static get tableName() {
    return "category";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "category.id",
          to: "tasks.category_id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["category"],
      properties: {
        id: { type: "integer" },
        category: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default Category;
