const Student = require("../models/Student");

let GraphController = {};

GraphController.fetchGenderITGraph = function(callback) {
    Student.find({ gender: 'Femenino' })
     .then(function(female) {
         Student.find({ gender: 'Masculino' })
          .then(function(male) {
              callback({
                  female: female.length,
                  male: male.length
              });
          })
          .catch(function(error) {
              console.log(error);
          })
     })
     .catch(function(error) {
         console.log(error);
     });
}

module.exports = GraphController;