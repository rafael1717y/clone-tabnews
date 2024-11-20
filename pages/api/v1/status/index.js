import database from "infra/database.js";

// método json retorna utf-8
async function status(request, response) {
  const result = await database.query("select 1 + 1;");
  console.log(result.rows);
  response.status(200).json({ chave: "alunos do curso.de são pessoas" });
}

// essa é a funcao responsável por ter que ligar com request e response desse endpoint
export default status;
