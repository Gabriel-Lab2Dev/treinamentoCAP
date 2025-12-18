using {com.lab2dev.gameshop.db as db} from '../db/schema';


@path: '/catalog'

service CatalogService {

    @readonly
    entity Developers as projection on db.Developers;

    @readonly
    entity Games as projection on db.Games;

    @readonly
    entity Tasks      as projection on db.Tasks;

    @readonly
    entity Users      as projection on db.Users;



    
}
