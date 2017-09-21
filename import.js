const mongoose = require('mongoose');
const fs = require('fs');

var option = {
  keepAlive:300000,
  connectTimeoutMS:300000,
  useMongoClient: true,
};

mongoose.connect('mongodb://localhost/hcm', option);
var Places = mongoose.model('Places', {
  place_id: { type: String, unique: true },
  geometry: Object,
  types: Object,
  rating: Number,
  vicinity: String,
  name: String,
  id: String,
  FullAddress: String,
  City: String,
  Ward: String,
  District: String,
});
var places = new Places();

const dir = "nearby_search_cache/"
var file = 0;

fs.readdir(dir, function(err, items) {
  for (var i=0; i<items.length; i++) {
      var item = items[i];
      var json = JSON.parse(fs.readFileSync(dir + item, 'utf8'));

      console.log(file++, "Reading file", item)

      json.results.map(function(place) {
        place.FullAddress = json.FullAddress;
        place.City = json.City;
        place.District = json.District;
        place.Ward = json.Ward;

        Places.update({place_id: place.place_id}, place, { upsert: true }, (err, d) => {
          console.log(err,d)
        })
      })
  }

});