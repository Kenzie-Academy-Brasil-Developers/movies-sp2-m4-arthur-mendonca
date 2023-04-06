import { request } from "express";
import { Client, QueryConfig } from "pg";

const client = new Client({
  user: "Master",
  password: "1234",
  host: "localhost",
  database: "entrega_sprint2",
  port: 5432,
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Conexão estabelecida.");
};

// const queryString: string = `
// INSERT INTO movies (name, category, duration, price)
// VALUES
// ($1, $2. $3. $4)
// `;

// const queryConfig: QueryConfig = {
//   text: queryString,
//   values: Object.values(request.body),
// };

// client.query(queryString).finally(async () => {
//   await client.end();
//   console.log("Conexão encerrada.");
// });

export { client, startDatabase };
