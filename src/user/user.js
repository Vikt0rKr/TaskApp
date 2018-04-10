const User = function (name, surname) {
  this.name = name;
  this.surname = surname;
  this.createdAt = Date.now();
  this.tasks = [];
};

module.exports = User;
