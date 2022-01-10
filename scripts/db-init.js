const mysqlx = require("@mysql/xdevapi");

async function main() {
  try {
    const session = await mysqlx.getSession(
      "root:root@localhost:33060/the_music_chooser"
    );
    await session
      .sql("CREATE TABLE IF NOT EXISTS the_music_chooser.rooms (idRooms INT)")
      .execute();
    const table = await session
      .getSchema("the_music_chooser")
      .getTable("rooms");
    const result = await table.select().execute();
    console.log(result.getObjects());
  } catch (error) {
    console.log(error);
  }
}
main();
