using {com.lab2dev.gameshop.db as db} from '../db/schema';


@path: '/catalog'

service CatalogService {

    entity Developers as projection on db.Developers;

    entity Games      as projection on db.Games;

    entity GamesName  as
        select
            ID,
            title,
            developer.name as developer_name
        from Games


    entity Tasks      as projection on db.Tasks;


    entity Users      as projection on db.Users;

    action   stockRemoval(id : UUID, amount : Integer)  returns Games;
    function getGamesStock(stock : Integer @mandatory ) returns array of Games;

    action newTask(
        titulo : String,
        descricao : String,
        concluida : Integer,
        user_ID : UUID)                    
        returns Tasks;

    action modifyTask(
        ID : UUID,
        titulo : String,
        descricao : String,
        concluida : Integer,
        user_ID : UUID
        ) returns Tasks

    function listUserTask(userID: UUID) returns array of Tasks
}
