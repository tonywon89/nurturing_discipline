// To ensure using test database
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../../app.js');

const Task = require('../../models/Task.js');
const TaskActivity = require('../../models/TaskActivity.js');
const Milestone = require('../../models/Milestone.js');
chai.use(chaiHttp);

var agent = chai.request.agent(server);
var csrfToken;
var userId;

describe('Task Controller', () => {
  before((done) => {
    Task.remove({}, (err) => {
      TaskActivity.remove({}, (err) => {
        Milestone.remove({}, (err) => {
          agent
            .post('/api/auth/login')
            .set('Accept','application/json')
            .set('content-type', 'application/x-www-form-urlencoded')
            .type('form')
            .send({"username": "twon89", "password": "twon89"})
            .then(function (res) {
              userId = res.body.id;
              agent.get('/api/csrf')
                .then((csrfRes) => {
                  csrfToken = csrfRes.body.csrfToken;
                  done();
                })
            });
        })
      // Logs in the user and gets the csrf token
      });
    });
  });

  describe('task_list', () => {
    it('returns an empty list of tasks', (done) => {
      agent.get('/api/tasks')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.tasks).to.be.an('array');
          expect(res.body.tasks.length).to.equal(0);
          done();
        })
    });

    it('fetches the tasks that are created', (done) => {
      var task1 = new Task({_user: userId, name: "Test Task 1", selected: true });
      var task2 = new Task({_user: userId, name: "Test Task 2" });

      task1.save((err, task1) => {
        task2.save((err, task2) => {
        agent.get('/api/tasks')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.tasks).to.be.an('array');
            expect(res.body.tasks.length).to.equal(2);
            expect(res.body.selectedTask.name).to.equal(task1.name);
            expect(res.body.tasks[0].name).to.equal(task1.name);
            expect(res.body.tasks[1].name).to.equal(task2.name);
            done();
          });
        });
      });
    })
  });

  describe('start_timer', () => {
    var milestone = new Milestone({_id: new mongoose.Types.ObjectId(), _user: userId, content: 'Test milestone 3', goalType: 'timed', tasks: [], task_activities: [] })
    var task3 = new Task ({ _user: userId, name: "Test Task 3", selected: true, _milestone: milestone._id });

    it ('creates a task activity and returns the task', (done) => {
      milestone.save((err, milestone) => {
        task3.save((err, task3) => {
          milestone
          let data = {'selectedTask[id]': task3._id}
          agent.post('/api/tasks/start_timer')
            .send(data)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.task._id).to.equal('' + task3._id);
              expect(res.body.taskActivity).to.not.equal(null);
              done();
            });
        });
      });
    });

  });

  describe('ping_task_timer', () => {
    it('Finds the timer that has not ended', (done) => {
      let taskActivity = new TaskActivity({ _user: userId, running: true, date_ended: null })
      taskActivity.save((err, taskActivity) => {
        agent.get('/api/tasks/ping_task_timer')
          .then((res) => {
            expect(res.body.taskActivity._id).to.equal('' + taskActivity._id)
            done();
          });
      });
    });
  });

  describe('stop_task_timer', () => {
    it('finds the taskActivity and sets the date ended', (done) => {
      let taskActivity = new TaskActivity({ _user: userId, running: true, date_ended: null })

      taskActivity.save((err, taskActivity) => {
        expect(taskActivity.date_ended).to.equal(null);
        agent.patch('/api/tasks/stop_task_timer')
          .then((res) => {
            // console.log(res.body)
            expect(res.body.date_ended).to.not.equal(null);
            done();
          });
      });
    });
  });

});

