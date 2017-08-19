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
var places = new Places();

const dir = "nearby_search_cache/"
fs.readdir(dir, function(err, items) {
  for (var i=0; i<items.length; i++) {
      var item = items[i];
      var json = JSON.parse(fs.readFileSync(dir + item, 'utf8'));
      json.results.map(function(place) {
        Places.update({place_id: place.place_id}, place, { upsert: true }, (err, d) => {
          console.log(err,d)
        })
      })
  }

});
