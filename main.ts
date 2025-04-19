// deno-lint-ignore-file no-unused-vars no-explicit-any ban-types prefer-const no-empty require-await
import users from './users.json' with { type: "json" };
import forestDB from "./db.ts";

const forest = forestDB.init({
  mainKey: 'id',
  dateFormat: ['YYYY_MM_DD', 'MM_DD_YYYY']
});

