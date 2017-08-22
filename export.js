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

"cafe, atm, hospital, store, shopping_mall, school, university, ud_supermarket, ud_market, ud_cultural_house".split(", ").map(type => {
  Places.find({"types": {$in: [type]}}).select("geometry.location").exec((err, docs) => {
      list_points = docs.map(d => {
          return d.geometry.location
      })
      fs.writeFile('assets/data/'+ type +'.js', "var " + type + " = " + JSON.stringify(list_points), 'utf8', (e, d) => {
        if (e) console.log(e)
        else console.log("Saved!")
      });
  })
})
