// To ensure using test database
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../../app.js');

const Task = require('../../models/Task.js');
const TaskActivity = require('../../models/TaskActivity.js');

chai.use(chaiHttp);

var agent = chai.request.agent(server);
var csrfToken;
var userId;

describe('Task Controller', () => {
  before((done) => {
    Task.remove({}, (err) => {
      TaskActivity.remove({}, (err) => {
      // Logs in the user and gets the csrf token
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

    it('fetches the tasks that are created', () => {
      var task1 = new Task({_user: userId, name: "Test Task 1", selected: true });
      var task2 = new Task({_user: userId, name: "Test Task 2" });

      task1.save((err, task1) => {
        task2.save((err, task2) => {

        agent.get('/api/tasks')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.tasks).to.be.an('array');
            expect(res.body.tasks.length).to.equal(2);
            done();
          });
        });
      });
    })
  })

});

