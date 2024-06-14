module.exports = {
  type: "capacitor",
  database: "__your_database_name__",
  driver: require("typeorm-capacitor-sqlite-driver").CapacitorSQLiteDriver,
  location: "default",
  logging: ["error", "query", "schema"],
  synchronize: true,
  entities: ["src/entity/**/*.ts"],
};
