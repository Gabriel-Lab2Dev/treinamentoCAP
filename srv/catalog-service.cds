
using { com.lab2dev.gameshop.db as db } from '../db/schema';



@path: '/catalog'
@rest
service CatalogService {
    
    @readonly
    entity Developers as projection on db.Developers;

    @readonly
    entity Games as projection on db.Games;

    @readonly
    entity GamesName as select ID, title, developer.name as developer_name from Games

    @readonly
    entity TaskService as projection on db.TaskService;
}
