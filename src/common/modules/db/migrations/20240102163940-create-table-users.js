'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.runSql(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `)

  return db.runSql(`
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4(),
      password VARCHAR ( 250 ) NOT NULL,
      email VARCHAR ( 255 ) UNIQUE NOT NULL,
      activation_link VARCHAR ( 36 ) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (id)
    );
  `)
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
