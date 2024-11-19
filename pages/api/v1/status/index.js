// método json retorna utf-8
function status(request, response) {
  response.status(200).json({ chave: "alunos do curso.de são pessoas" });
}

// essa é a funcao responsável por ter que ligar com request e response desse endpoint
export default status;
