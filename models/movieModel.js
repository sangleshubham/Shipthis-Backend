import mongoose from "mongoose";

let movie = mongoose.Schema({
  show_id: {
    type: "String",
    required: "Enter show id",
  },
  type: "String",
  title: "String",
  director: "String",
  cast: "String",
  country: "String",
  date_added: "String",
  release_year: "String",
  rating: "String",
  duration: "String",
  listed_in: "String",
  description: "String",
});

export default mongoose.model("movies", movie);
