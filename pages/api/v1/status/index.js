import database from "infra/database.js";

// método json retorna utf-8
async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const info_postgres = await database.query("SHOW server_version;");
  const databaseVersionValue = info_postgres.rows[0].server_version; // controller

  const databaseName = process.env.POSTGRES_DB;
  //console.log(`Banco de dados selecionado: ${databaseName}`);

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  //const databaseOpenedConnectionsResult = await database.query(
  //"SELECT * FROM pg_stat_activity WHERE datname = 'local_db';",
  //);

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*):: int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  console.log(databaseOpenedConnectionsValue);
  // view
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

// essa é a funcao responsável por ter que ligar com request e response desse endpoint
export default status;
