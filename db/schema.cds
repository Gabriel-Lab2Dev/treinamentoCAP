namespace com.lab2dev.gameshop.db;

using { cuid,managed } from '@sap/cds/common';

entity Games: cuid {
    title: String;
    price: Decimal(9, 2);
    stock: Integer;
    releaseDate: Date;
    developer: Association to Developers;
};

entity Developers: cuid {
    name: String;
    creationYear: Integer;
    games: Association to many Games
        on games.developer = $self;
};

entity TaskService: cuid,managed {
    titulo:String;
    descricao: String;
    concluida: Integer;
};

entity Users: cuid {
    name:String;
    email: String;
    password: String
};
