import knex from "../lib/knex.js";
import { Model } from "objection";

Model.knex(knex);

class user extends Model {
  static get tableName() {
    return "user";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["firstname", "lastname", "email", "password"],
      properties: {
        id: { type: "integer" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }
}

export default user;
