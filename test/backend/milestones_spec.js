// To ensure using test database
process.env.NODE_ENV = 'test';

const chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../../app.js');
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

    it('sets date_deleted for the associated task')
  });
});
