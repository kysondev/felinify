import { Insertable, Selectable, Updateable } from "kysely";
import { Database } from "./schema.types";

export type User = Selectable<Database["user"]>;
export type NewUser = Insertable<Database["user"]>;
export type UpdateUser = Updateable<Database["user"]>;
