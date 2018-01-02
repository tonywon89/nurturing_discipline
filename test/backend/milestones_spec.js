// To ensure using test database
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../../app.js');
const Milestone = require('../../models/Milestone.js');
const Task = require('../../models/Task.js');

chai.use(chaiHttp);

var agent = chai.request.agent(server);
var csrfToken;
var userId;

describe('Milestone (Tasks) controller', () => {
  before((done) => {
    Milestone.remove({}, (err) => {
      Task.remove({}, (err) => {
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

  describe('milestone_list', () => {
    it('returns an empty list of milestones', (done) => {
      agent.get('/api/milestones')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.milestones).to.be.an('array');
          expect(res.body.milestones.length).to.be.equal(0);
          done();
        });
    });
  });

  describe('milestone_create', () => {
    it('creates a new milestone', (done) => {
      let data = {
        content: 'Test milestone 1',
        selectedOption: "timed",
        hours: 1,
        minutes: 1,
      }
      agent.post('/api/milestones')
        .set("X-CSRF-Token", csrfToken)
        .send(data)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.milestones).to.be.an('array');
          expect(res.body.milestones.length).to.be.equal(1);
          expect(res.body.milestones[0].content).to.be.equal(data.content);
          expect(res.body.milestones[0].goalType).to.be.equal(data.selectedOption);
          expect(res.body.milestones[0].goalRemaining).to.be.equal(data.hours * 60 * 60 + data.minutes * 60);
          done();
        });
    });
  });

  describe('milestone_delete', () => {
    it ('sets date deleted for the milestone that is deleted', (done) => {
      let data = {
        content: 'Test milestone 2',
        goalType: "timed",
        goalRemaing: 3660,
        _user: userId
      };

      let milestone = new Milestone(data)

      milestone.save((err, milestone) => {
        agent.get('/api/milestones')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.milestones).to.be.an('array');
            expect(res.body.milestones.length).to.be.equal(2);

            agent.delete('/api/milestones')
              .set("X-CSRF-Token", csrfToken)
              .send({id: milestone._id})
              .then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body.milestones).to.be.an('array');
                expect(res.body.milestones.length).to.be.equal(1)
                done();
              })
          })
      })
    })

    it('sets date_deleted for the associated task', (done) => {
      let milestoneData = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test milestone 3',
        goalType: "timed",
        goalRemaing: 3660,
        _user: userId,
        tasks: [],
      };

      let taskData = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test task 3',
      }

      milestoneData.tasks.push(taskData._id);
      taskData._milestone = milestoneData._id;

      let milestone = new Milestone(milestoneData);
      let task = new Task(taskData);

      task.save((err, task) => {
        milestone.save((err, milestone) => {
          agent.get('/api/milestones')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.milestones).to.be.an('array');
            expect(res.body.milestones.length).to.be.equal(2);

          agent.delete('/api/milestones')
            .set("X-CSRF-Token", csrfToken)
            .send({id: milestone._id})
            .then((res) => {
              Task.findById(task._id).exec(function (err, task) {
                expect(task.date_deleted).to.not.be.equal(null);
                done();
              })
            });
          });
        });
      });
    });

    it('removes the sub milestone from the parent when a sub milestone is deleted', (done) => {
      let milestoneData = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test milestone 4',
        goalType: "timed",
        goalRemaing: 3660,
        _user: userId,
        sub_milestones: [],
      };

      let subMilestoneData1 = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test Submilestone 1',
        goalType: "timed",
        goalReaming: 3660,
        _user: userId,
        _parent: milestoneData._id,
        sub_milestones: [],
        tasks: [],
      }

      let taskData1 = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test task 1',
        _milestone: subMilestoneData1._id,
      }

      subMilestoneData1.tasks.push(taskData1._id);

      let subMilestoneData2 = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test Submilestone 1',
        goalType: "timed",
        goalReaming: 3660,
        _user: userId,
        _parent: subMilestoneData1._id,
        sub_milestones: [],
        tasks: [],
      }

      let taskData2 = {
        _id: new mongoose.Types.ObjectId(),
        _milestone: subMilestoneData2._id,
        name: 'Test task 2',
      }

      subMilestoneData2.tasks.push(taskData2._id);

      milestoneData.sub_milestones.push(subMilestoneData1._id);
      subMilestoneData1.sub_milestones.push(subMilestoneData2._id);

      let milestone = new Milestone(milestoneData);
      let subMilestone1 = new Milestone(subMilestoneData1);
      let subMilestone2 = new Milestone(subMilestoneData2);

      let task1 = new Task(taskData1);
      let task2 = new Task(taskData2);

      milestone.save((err, milestone) => {
        subMilestone1.save((err, subMilestone1) => {
          subMilestone2.save((err, subMilestone2) => {
            task1.save((err, task1) => {
              task2.save((err, task2) => {
                agent.get('/api/milestones')
                .then((res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body.milestones).to.be.an('array');
                  expect(res.body.milestones.length).to.be.equal(2);
                  expect(res.body.milestones[1].sub_milestones.length).to.be.equal(1);
                  expect(res.body.milestones[1].sub_milestones[0].id).to.be.equal(subMilestone1._id.toString());
                  expect(res.body.milestones[1].sub_milestones[0].sub_milestones.length).to.be.equal(1);

                agent.delete('/api/milestones')
                  .set("X-CSRF-Token", csrfToken)
                  .send({id: subMilestone1._id})
                  .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.milestones).to.be.an('array');
                    expect(res.body.milestones.length).to.be.equal(2);
                    expect(res.body.milestones[1].sub_milestones.length).to.be.equal(0);

                    Milestone.findById(subMilestone1._id).exec(function(err, subMilestone1) {
                      expect(subMilestone1.date_deleted).to.not.be.equal(null);
                      expect(subMilestone1.tasks.length).to.be.equal(1);
                      expect(subMilestone1.tasks[0].date_deleted).to.not.be.equal(null);

                      Milestone.findById(subMilestone2._id).exec(function(err, subMilestone2) {
                        expect(subMilestone2.date_deleted).to.not.be.equal(null);
                        expect(subMilestone2.tasks.length).to.be.equal(1);
                        expect(subMilestone2.tasks[0].date_deleted).to.not.be.equal(null);
                        done();
                      });
                    });
                  });
                });

              });

            });

          });
        });

      });
    });
  });

  describe('milestone_patch', () => {
    it('successfully updates the milestone', (done) => {
      let milestoneData = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test milestone 5',
        goalType: "timed",
        goalRemaing: 3660,
        _user: userId,
        sub_milestones: [],
      };

      let milestone = new Milestone(milestoneData);

      milestone.save((err, milestone) => {
        agent.patch('/api/milestones')
          .set("X-CSRF-Token", csrfToken)
          .send({
            content: "Test Milestone 5 Updated",
            id: milestone._id
          })
          .then((res) => {
            expect(res.body.milestones[2].content).to.equal('Test Milestone 5 Updated');
            done();
          });
      });
    });
  });

  describe('task_create', () => {
    it('successfully creates a new task', (done) => {
      let milestoneData = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test milestone 5',
        goalType: "timed",
        goalRemaing: 3660,
        _user: userId,
      };

      let taskData = {
        name: 'Test task 1',
        milestoneId: milestoneData._id,
      }

      let milestone = new Milestone(milestoneData);

      milestone.save((err, milestone) => {
        agent.post('/api/milestones/tasks')
          .set("X-CSRF-Token", csrfToken)
          .send(taskData)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.milestones.length).to.equal(4);
            expect(res.body.milestones[3].tasks.length).to.equal(1);
            expect(res.body.milestones[3].tasks[0].name).to.equal(taskData.name);
            done();
          })
      })
    })
  });

  describe('task_delete', () => {
    it('successfully deletes a task', (done) => {
      let milestoneData = {
        _id: new mongoose.Types.ObjectId(),
        content: 'Test milestone 5',
        goalType: "timed",
        goalRemaing: 3660,
        _user: userId,
        tasks: [],
      };

      let taskData = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test task 2',
        _milestone: milestoneData._id,
        _user: userId,
      }

      milestoneData.tasks.push(taskData._id)

      let milestone = new Milestone(milestoneData);
      let task = new Task(taskData);
      milestone.save((err, milestone) => {
        task.save((err, task) => {

          agent.delete('/api/milestones/tasks')
            .set("X-CSRF-Token", csrfToken)
            .send({ id: taskData._id})
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.milestones.length).to.equal(5);
              expect(res.body.milestones[4].tasks.length).to.equal(0);

              Task.findById(task._id).exec(function(err, task) {
                expect(task.date_deleted).to.not.equal(null);
                done();
              })
            })
        })
      })
    })
  });

  describe('task_patch', () => {
    it ('successfully updates a task', (done) => {

      let milestoneData = {
          _id: new mongoose.Types.ObjectId(),
          content: 'Test milestone 5',
          goalType: "timed",
          goalRemaing: 3660,
          _user: userId,
          tasks: [],
        };

      let taskData = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Test task 3',
        _milestone: milestoneData._id,
        _user: userId,
      }

       milestoneData.tasks.push(taskData._id)

      let milestone = new Milestone(milestoneData);
      let task = new Task(taskData);

      milestone.save((err, milestone) => {
        task.save((err, task) => {
          agent.patch('/api/milestones/tasks')
            .set("X-CSRF-Token", csrfToken)
            .send({
              id: task._id,
              name: 'Test task updated'
            })
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.milestones.length).to.equal(6);
              expect(res.body.milestones[5].tasks.length).to.equal(1);
              expect(res.body.milestones[5].tasks[0].name).to.equal('Test task updated');
              done();
            });
        });
      });
    });
  });
});
