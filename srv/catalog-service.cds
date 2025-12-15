using {com.lab2dev.gameshop.db as db} from '../db/schema';


@path: '/catalog'

service CatalogService {

    @readonly
    entity Developers as projection on db.Developers;

    @readonly
    entity Games      as projection on db.Games;

    @readonly
    entity GamesName  as
        select
            ID,
            title,
            developer.name as developer_name
        from Games

    @readonly
    entity Tasks      as projection on db.Tasks;

    @readonly
    entity Users      as projection on db.Users;

    action   stockRemoval(id : UUID, amount : Integer)  returns Games;
    function getGamesStock(stock : Integer @mandatory ) returns array of Games;

    action   newTask(titulo : String,
                     descricao : String,
                     concluida : Integer,
                     user : UUID) returns Tasks;
}
