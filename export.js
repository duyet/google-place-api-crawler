const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://localhost/hcm');
var Places = mongoose.model('Places', {
  place_id: { type: String, unique: true },
  geometry: Object,
  types: Object,
  rating: Number,
  vicinity: String,
  name: String,
  id: String,
});
Places.find({"types": {$in: ["university"]}}).select("geometry.location").exec((err, docs) => {
    list_points = docs.map(d => {
        return d.geometry.location
    })
    console.log(list_points)
})
