import { Router } from "express"
import { vinhoCreate, vinhoIndex, vinhoUpdate, vinhoDelete, vinhoAlteraPreco, vinhoPorTipo, vinhoPorMarca, quantiaVinhosTipo, quantiaVinhosMarca } from "./controllers/vinhoController.js"
import { marcaCreate, marcaIndex, marcaUpdate, marcaDelete } from "./controllers/marcaController.js"
import { usuarioIndex, usuarioCreate, usuarioTrocaSenha } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { enviaEmail } from "./controllers/emailController.js"

const router = Router()

// --------------------------------------------------------- ROTAS DE VINHOS
router.get("/vinhos", vinhoIndex) //rota pra listagem
      .post("/vinhos", vinhoCreate) //rota pra criação de registro
      .put("/vinhos/:id", vinhoUpdate) //rota pra alteração do registro
      .patch("/vinhos/:taxa", vinhoAlteraPreco) //rota p alterar o preço dos vinhos com porcentagem, o ":taxa" é a varíavel em controller
      .delete("/vinhos/:id", vinhoDelete) //rota pra deletar registros da vinicola
      .get("/vinhos/:tipo", vinhoPorTipo) //metodo pra filtrar vinho por tipo
      .get("/vinhos/por-marca/:marca_id", vinhoPorMarca) //traz vinhos pela marca - o id da marca 
      .get("/vinhos/quantidade/tipo/:tipo", quantiaVinhosTipo) //mostra a quantidade de vinhos por tipo
      .get("/vinhos/quantidade/marca/:marca_id", quantiaVinhosMarca) //mostra a quantidade de vinhos por marca

// --------------------------------------------------------- ROTAS DE VINHOS
router.get("/marcas", verificaLogin, marcaIndex) //rota pra listagem de marcas, AQUI ESTÁ O MIDDLEWARE DO LOGIN
      .post("/marcas", marcaCreate) //rota pra criação de registro
      .put("/marcas/:id", marcaUpdate) //rota pra alteração do registro
      .delete("/marcas/:id", marcaDelete) //rota pra deletar registros da vinicola

// --------------------------------------------------------- ROTAS DE USUARIOS
router.get("/usuarios", usuarioIndex) //rota pra listagem de usuarios
      .post("/usuarios", usuarioCreate) //rota pra criação de registro
      .get("/usuarios/solicitatroca", enviaEmail)           //faz a solicitação de mudança de senha
      .patch("/usuarios/trocasenha/:hash", usuarioTrocaSenha)                   //realiza a troca de senha

// --------------------------------------------------------- ROTAS DE LOGIN
router.get("/login", loginUsuario) //rota pra login

export default router
