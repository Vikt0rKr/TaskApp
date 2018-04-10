const Task = function (from, title, description, deadline, responsible) {
  this.from = from;

  if (title.length > 20) {
    this.title = title.substring(0, 20);
  } else {
    this.title = title;
  }

  if (description.length > 200) {
    this.description = description.substring(0, 200);
  } else {
    this.description = description;
  }

  const splat = deadline.split('-').reverse().join('-');
  this.deadline = Date.parse(splat);
  if (responsible === undefined) {
    this.responsible = from;
  } else {
    this.responsible = responsible;
  }

  this.status = 'Wait';
};

module.exports = Task;
