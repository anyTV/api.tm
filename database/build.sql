/**
    @rules
        all caps on mysql keywords
        use plural form on table names
        snake case everywhere
        use DATETIME type for dates
        start the column name with `date_` if type is DATETIME, e.g. `date_created`, `date_updated`
        use VARCHAR(32) or INT(11) auto_increment for primary keys
        all tables should have an id (PRIMARY KEY), date_created and date_updated
            *table id will follow the this format :
                `<singular form of table_name>_id` PRIMARY KEY VARCHAR(32) or INT(11) auto_increment

            example:
                CREATE TABLE users (
                    user_id PRIMARY KEY VARCHAR(32),
                    date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP
                );
        use the proper mysql engine
        mind the column charset and table collation
*/


DROP DATABASE IF EXISTS <database_name>;
CREATE DATABASE <database_name>;

USE <database_name>;

CREATE TABLE IF NOT EXISTS <tables> (
    <table>_id VARCHAR(32) PRIMARY KEY ,
    ...
    date_created DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_updated DATETIME ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM or Innodb;
