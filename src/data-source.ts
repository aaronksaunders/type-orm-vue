import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
export const sqliteConnection: SQLiteConnection = new SQLiteConnection(
  CapacitorSQLite
);
// const sqlitePlugin = CapacitorSQLite;
// const sqliteParams = {
//   connection: sqliteConnection,
//   plugin: sqlitePlugin,
//   platform: platform,
// };

const dataSource = new DataSource({
  type: "capacitor",
  database: "sqlite-test.db",
  driver: sqliteConnection,
  mode: "no-encryption",
  synchronize: true,
  logging: true,
  entities: [User],
  migrationsRun: false,
});

const appDataSource = {
  dataSource,
  dbName: "sqlite-test.db",
};

export default appDataSource;
