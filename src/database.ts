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

export { client, startDatabase };
