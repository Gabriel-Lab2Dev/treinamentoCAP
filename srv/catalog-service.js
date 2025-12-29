const cds = require("@sap/cds");
const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

class CatalogService extends cds.ApplicationService {
  async init() {
    const { Games: GamesEntity } = cds.entities("com.lab2dev.gameshop.db");
    const { Developers: DevsEntity } = cds.entities("com.lab2dev.gameshop.db");

    this.before("CREATE", "Games", (req) => {
      const { title } = req.data;
      if (title?.length < 5) {
        return req.error(400, "Game title should be bigger than 5 characters");
      }
    });

    this.after("CREATE", "Games", (results, req) => {
      console.log("Foram criados os games");
      console.log(results);
    });

    this.on("CREATE", "Games", async (req) => {
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

    // ATV1
    // this.before("READ", "Games", (event) => {
    //   console.log(event.req.query.ID)
    // });

    // this.after("READ", "Games", (results, req) => {
    //   console.log(results);
    // });

    this.before("UPDATE", "Games", (req) => {
      console.log("BANANA")
    });

    this.after("UPDATE", "Games", (results, req) => {
      console.log(results);
    });

    this.before("UPSERT", "Games", (req) => {
      console.log(req.data)
    });

    this.after("UPSERT", "Games", (results, req) => {
      console.log(req.data);
      console.log(results);
    });

    this.before("DELETE", "Games", (event) => {
      console.log(event.data)
    });

    this.after("DELETE", "Games", (results, req) => {
      console.log(req.data);
      console.log(results);
    });

    this.before("DELETE", "Developers", async (event) => {
      const existingDev = await SELECT.one
        .from(GamesEntity)
        .where({ developer_ID: event.data.ID });
        if(existingDev){
          return event.error(400, "Desenvolvedor está atrelado a um Game");
        }
    });

    //ATV2
    // ATV1
    // this.before("READ", "Tasks", (event) => {
    //   console.log(event.req.query.ID)
    // });

    // this.after("READ", "Tasks", (results, req) => {
    //   console.log(results);
    // });

    this.before("UPDATE", "Tasks", (req) => {
      console.log("BANANA")
    });

    this.after("UPDATE", "Tasks", (results, req) => {
      console.log(results);
    });

    this.before("UPSERT", "Tasks", (req) => {
      console.log(req.data)
    });

    this.after("UPSERT", "Tasks", (results, req) => {
      console.log(req.data);
      console.log(results);
    });

    this.before("DELETE", "Tasks", (event) => {
      console.log(event.data)
    });

    this.after("DELETE", "Tasks", (results, req) => {
      console.log(req.data);
      console.log(results);
    });

    return super.init();
  }
}

module.exports = CatalogService;
