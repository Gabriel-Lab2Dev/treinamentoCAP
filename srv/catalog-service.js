const cds = require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");
const { Games: GamesEntity } = cds.entities("com.lab2dev.gameshop.db");

class CatalogService extends cds.ApplicationService {
  async init() {

    this.before("CREATE", Games, (req) => {
      const { title } = req.data;
      if (title?.length < 5) {
        return req.error(400, "Game title should be bigger than 5 characters");
      }
    });

    this.after("CREATE", Games, (results, req) => {
      console.log("Foram criados os games");
      console.log(results);
    });

    this.on("CREATE", Games, async (req) => {
      const game = req.data;
      const existingGame = await SELECT.one
        .from(GamesEntity)
        .where({ title: game.title });

      if (existingGame) {
        return req.error(400, "Já tem um jogo com o mesmo nome");
      }

      await INSERT.into(GamesEntity, game);
      game.title = "Outro Titulo";
      return game;
    });

    //ATVS MODULO 5

    //ATV1

    // this.before("READ", Games, (req) => {
    //   const { title } = req.data;
    //   if (title?.length < 5) {
    //     return req.error(400, "Game title should be bigger than 5 characters");
    //   }
    // });

    // this.after("CREATE", Games, (results, req) => {
    //   console.log("Foram criados os games");
    //   console.log(results);
    // });

    return super.init();
  }
}

module.exports = CatalogService;
