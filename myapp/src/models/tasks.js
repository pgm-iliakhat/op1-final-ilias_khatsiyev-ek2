import knex from "../lib/knex.js";
import { Model } from "objection";
import Category from "./category.js";

Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "tasks.category_id",
          to: "category.id",
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["task"],
      properties: {
        id: { type: "integer" },
        task: { type: "string", minLength: 2, maxLength: 255 },
        checked: { type: "boolean" },
      },
    };
  }
}

export default Task;
