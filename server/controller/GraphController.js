const Student = require("../models/Student");

let GraphController = {};

GraphController.fetchGenderITGraph = function(callback) {
    Student.find({ 'gender': 'Femenino' })
     .then(function(female) {
         Student.find({ gender: 'Masculino'})
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
};

GraphController.fetchAgeITGraph = function(callback) {
    Student.findByAgeGender('Femenino')
     .then(function(females) {
         let femaleDict = dictAgeFromArray(females);
         Student.findByAgeGender('Masculino')
          .then(function(males) {
              let maleDict = dictAgeFromArray(males);
              callback({
                  Mujeres: femaleDict,
                  Hombres: maleDict
              });
          })
          .catch(function(error) {
              console.log(error);
          });
     })
     .catch(function(error) {
         console.log(error);
     });
};

GraphController.fetchAgeGraph = function(callback) {
    Student.findByAge()
     .then(function(documents) {
         let ageDict = dictAgeFromArray(documents);
         callback(ageDict);
     })
     .catch(function(error) {
         console.log(error);
     });
};

/******************************************************************
 *                    AUXILIAR    FUNCTIONS
 *******************************************************************/
dictAgeFromArray = function(documents) {
    let dict = {};
    for(let i = 0; i < documents.length; i++) {
        let age = ageFromBirthDate(documents[i].birth_date);
        if(dict.hasOwnProperty(age)) dict[age] = dict[age] + 1;
        else dict[age] = 1;
    }
    return dict;
};

ageFromBirthDate = function(age) {
    let splittedAge = age.split("/");
    let current = new Date();
    let year = current.getFullYear();
    return (year - splittedAge[2]) % 100;
}

module.exports = GraphController;