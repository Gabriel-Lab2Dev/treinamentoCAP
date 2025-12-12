
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
    entity Tasks as projection on db.Tasks;

    @readonly
    entity Users as projection on db.Users;

    @readonly
    entity TasksConcluida as select ID,createdAt,createdBy,modifiedAt,modifiedBy,titulo,descricao,concluida from Tasks where concluida = 1;

    @readonly
    entity TasksNaoConcluida as select ID,createdAt,createdBy,modifiedAt,modifiedBy,titulo,descricao,concluida from Tasks where concluida = 0;

    @readonly
    entity userWithoutTask as select ID,name as tasks_ID from Users where tasks.ID is NULL ;

}
