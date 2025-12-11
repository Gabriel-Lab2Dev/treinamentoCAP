
using { com.lab2dev.gameshop.db as db } from '../db/schema';

service CatalogService {
    
    entity Developers as projection on db.Developers;

    entity Games as projection on db.Games;

    entity TaskService as projection on db.TaskService;
}
