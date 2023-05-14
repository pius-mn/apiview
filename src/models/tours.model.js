'use strict';
var dbConn = require('./../../config/db.config');
const sqlstring = require("sqlstring");
//product object create
var product = function(product){
  this.first_name     = product.first_name;
  this.last_name      = product.last_name;
  this.email          = product.email;
  this.phone          = product.phone;
  this.organization   = product.organization;
  this.designation    = product.designation;
  this.salary         = product.salary;
  this.status         = product.status ? product.status : 1;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};
product.create = function (newEmp, result) {
dbConn.query("INSERT INTO products set ?", newEmp, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};


product.findById = function (id, result) {
  dbConn.query(
    "SELECT t.id, t.package_name,t.thumbnail, i.title, i.Activities FROM tour_packages t INNER JOIN itinerary i ON t.id = i.package_name_id WHERE t.id = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.length === 0) {
        result({ message: "Package not found" }, null);
      } else {
        const { id, package_name,thumbnail } = res[0];
        const itinerary = res.map(({ title, Activities }) => ({ title, activities: Activities.split(", ") }));
        const packageData = { id, package_name,thumbnail, itinerary };
        result(null, packageData);
      }
    }
  );
};





product.findAll = function (result) {
dbConn.query("Select * from tour_packages", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  // console.log('products : ', res);
  result(null, res);
}
});
};
product.update = function(id, product, result){
dbConn.query("UPDATE products SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [product.first_name,product.last_name,product.email,product.phone,product.organization,product.designation,product.salary, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
product.delete = function(id, result){
dbConn.query("DELETE FROM products WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= product;