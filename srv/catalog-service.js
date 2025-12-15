const cds = require("@sap/cds");

class CatalogService extends cds.ApplicationService {
  async init() {
    this.on("stockRemoval", async (req) => {
      const { id, amount } = req.data;
      const { Games } = cds.entities;

      // 1️⃣ Buscar o jogo
      const game = await SELECT.one.from(Games).where({ ID: id });

      // 2️⃣ Validar existência
      if (!game) {
        req.reject(404, "Jogo não encontrado");
      }

      // 3️⃣ Validar quantidade
      if (amount <= 0) {
        req.reject(400, "Quantidade inválida");
      }

      // 4️⃣ Atualizar estoque
      const newStock = game.stock - amount;

      await UPDATE(Games).set({ stock: newStock }).where({ ID: id });

      // 5️⃣ Retornar jogo atualizado
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

      // Validação básica
      if (stock == null || stock < 0) {
        req.reject(400, "Parâmetro 'stock' inválido");
      }

      // Buscar jogos com estoque >= valor informado
      const games = await SELECT.from(Games).where({ stock: { ">=": stock } });

      return games;
    });
    return super.init();
  }
}

module.exports = CatalogService;
