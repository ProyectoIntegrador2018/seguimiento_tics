ADMIN_EMAIL = process.env.ADMIN_EMAIL;
ADMIN_PASS = process.env.ADMIN_PASSWORD;

var User = require('../models/User');

User.findByEmail(ADMIN_EMAIL)
 .then(function(record) {
     if(!record) {
         var admin = new User();
         admin.email = ADMIN_EMAIL;
         admin.password = User.hashPassword(ADMIN_PASS);
         admin.admin = true;
         admin.verified = true;
         
         admin.save()
          .then(function(record) {
              console.log(record);
          })
          .catch(function(error) {
              console.log(error);
          });
     }
 });