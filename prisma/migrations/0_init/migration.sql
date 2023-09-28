-- CreateTable
CREATE TABLE "rooms" (
    "id_room" SERIAL NOT NULL,
    "name_room" VARCHAR(64) NOT NULL,
    "url_room" TEXT NOT NULL,
    "is_closed" BOOLEAN DEFAULT false,
    "current_song" INTEGER,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id_room")
);

-- CreateTable
CREATE TABLE "songs" (
    "id_song" SERIAL NOT NULL,
    "id_room" INTEGER NOT NULL,
    "name_song" TEXT NOT NULL,
    "url_song" TEXT NOT NULL,
    "img" TEXT,
    "audio" TEXT,
    "expire" INTEGER NOT NULL,
    "votos" INTEGER DEFAULT 0,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id_song")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_url_room_key" ON "rooms"("url_room");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "fk_current_song" FOREIGN KEY ("current_song") REFERENCES "songs"("id_song") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "fk_idroom" FOREIGN KEY ("id_room") REFERENCES "rooms"("id_room") ON DELETE CASCADE ON UPDATE NO ACTION;

