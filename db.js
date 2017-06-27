        var knex = require('knex')({
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'root',
                password: '1234',
                database: 'employee',
                charset  : 'utf8'
            }
        });

        var Bookshelf = require('bookshelf')(knex);

        module.exports.DB = Bookshelf;
        