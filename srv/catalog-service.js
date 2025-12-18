const cds = require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

class CatalogService extends cds.ApplicationService {
  async init() {
    this.on("stockRemoval", async (req) => {
      const { id, amount } = req.data;
      const { Games } = cds.entities;

      const game = await SELECT.one.from(Games).where({ ID: id });

      if (!game) {
        req.reject(404, "Jogo não encontrado");
      }

      if (amount <= 0) {
        req.reject(400, "Quantidade inválida");
      }

      const newStock = game.stock - amount;

      await UPDATE(Games).set({ stock: newStock }).where({ ID: id });

      return {
        ID: game.ID,
        title: game.title,
        price: game.price,
        stock: newStock,
        releaseDate: game.releaseDate,
        developer_ID: game.developer_ID,
      };
    });

    this.on("getGamesStock", async (req) => {
      const { stock } = req.data; // vem da query
      const { Games } = cds.entities;

      if (stock == null || stock < 0) {
        req.reject(400, "Parâmetro 'stock' inválido");
      }

      const games = await SELECT.from(Games).where({ stock: { ">=": stock } });

      return games;
    });

    this.on("newTask", async (req) => {
      const { titulo, descricao, concluida, user_ID } = req.data;
      const { Tasks } = cds.entities;

      if (!titulo) {
        req.reject(400, "Título é obrigatório");
      }

      if (concluida !== 0 && concluida !== 1) {
        req.reject(400, "status de conclusão inválido");
      }

      if (!user_ID) {
        req.reject(400, "Usuário Inválido");
      }

      const newTask = await INSERT.into(Tasks).entries({
        titulo,
        descricao,
        concluida,
        user_ID,
      });

      const createdTask = await SELECT.one
        .from(Tasks)
        .where({ titulo: titulo });

      return createdTask;
    });

    this.on("modifyTask", async (req) => {
      const { Tasks } = cds.entities;

      const { ID, titulo, descricao, concluida, user_ID } = req.data;
      let fieldsUpdate = [
        ["titulo", titulo],
        ["descricao", descricao],
        ["concluida", concluida],
        ["user_ID", user_ID],
      ];

      fieldsUpdate = Object.fromEntries(
        fieldsUpdate.filter(([_, value]) => value)
      );

      await UPDATE(Tasks).set(fieldsUpdate).where({ ID });

      return { ID: ID, fieldsUpdate };
    });

    this.on("listUserTask", async (req) => {
      const { userID } = req.data;
      const { Tasks } = cds.entities;

      if (!userID) {
        req.reject(400, "Parâmetro 'user_ID' inválido");
      }

      const tasks = await SELECT.from(Tasks).where({
        user_ID: userID,
        concluida: 0,
      });

      return tasks;
    });

    // MODULO 5

    

    return super.init();
  }
}

module.exports = CatalogService;
