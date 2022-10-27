const schedule = [
  { scheduleId: '6343e5ab58b2dc10144e8f45', scheduleName: '10.00', isChecked: true },
  { scheduleId: '634e5eadi4ce7454071b0d96', scheduleName: '10.56', isChecked: false },
  { scheduleId: '634e5eadf4ce7454071b0d96', scheduleName: '10.16', isChecked: true },
];
const test = schedule.some(e => e.isChecked);
console.log(test);
