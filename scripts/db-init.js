require("dotenv").config();

const { Pool } = require("pg");

const dropTableRooms = "DROP TABLE IF EXISTS rooms";
const dropTableSongs = "DROP TABLE IF EXISTS songs";

const createTableRooms =
  "CREATE TABLE rooms (id_room INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, name_room VARCHAR(64) NOT NULL, url_room TEXT UNIQUE NOT NULL, isclosed BOOLEAN DEFAULT false)";
const createTableSongs =
  "CREATE TABLE songs (id_song INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, id_room INT NOT NULL REFERENCES rooms ON DELETE CASCADE ON UPDATE CASCADE, name_song TEXT NOT NULL, url_song TEXT NOT NULL, img TEXT, audio TEXT, votos INT DEFAULT 0)";

async function main() {
  try {
    const pool = new Pool();
    await pool.query(dropTableSongs);
    await pool.query(dropTableRooms);
    await pool.query(createTableRooms);
    await pool.query(createTableSongs);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
}
main();
