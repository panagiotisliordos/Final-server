const { Schema, model } = require("mongoose");

const SongSchema = new Schema(
    {
        title: String,
        artist: String,
        imageUrl: String,
        youtubeLink: String,
    },
    {
        timestamps: true,
    }
);

const SongModel = model("Song", SongSchema);

module.exports = SongModel;
