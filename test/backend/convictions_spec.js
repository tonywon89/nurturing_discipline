// To ensure using test database
process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
const chai = require('chai');
// const expect = chai.expect;
let chaiHttp = require('chai-http');
const Conviction = require('../../models/Conviction.js');
const conviction_controller = require('../../controllers/convictions_controller.js');
let server = require('../../app.js');


chai.use(chaiHttp);
var agent = chai.request.agent(server)
var csrfToken;
var userId;
describe('Conviction controller', () => {

  before((done) => {
    Conviction.remove({}, (err) => {

      // Logs in the user
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

  })

  describe('conviction_list', () => {
    it('conviction_list returns an empty list of convictions', (done) => {
      agent.get('/api/convictions')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.convictions).to.be.an('array');
          expect(res.body.convictions.length).to.be.equal(0);
          done();
        });
    });
  })

  describe('conviction_create', () => {
    it('creates a new conviction', (done) => {
      agent.post('/api/convictions')
        .set("X-CSRF-Token", csrfToken)
        .send({ title: "Test Conviction1", detailed_description: "Test Detailed Description1"})
        .then((res) => {
          expect(res.body.title).to.equal("Test Conviction1");
          expect(res.body.detailed_description).to.equal('Test Detailed Description1')
          expect(res.body._user).to.equal(userId);
          done();
        })
    });

    it('conviction_list returns the created of conviction', (done) => {
      agent.get('/api/convictions')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.convictions).to.be.an('array');
          expect(res.body.convictions.length).to.be.equal(1);
          expect(res.body.convictions[0].title).to.equal("Test Conviction1");
          expect(res.body.convictions[0].detailed_description).to.equal("Test Detailed Description1");
          done();
        });
    });

    it('creates a new conviction', (done) => {
      agent.post('/api/convictions')
        .set("X-CSRF-Token", csrfToken)
        .send({ title: "Test Conviction2", detailed_description: "Test Detailed Description2"})
        .then((res) => {
          expect(res.body.title).to.equal("Test Conviction2");
          expect(res.body.detailed_description).to.equal('Test Detailed Description2')
          expect(res.body._user).to.equal(userId);
          done();
        })
    });

    it('conviction_list returns 2 created of conviction', (done) => {
      agent.get('/api/convictions')
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.convictions).to.be.an('array');
          expect(res.body.convictions.length).to.be.equal(2);
          expect(res.body.convictions[1].title).to.equal("Test Conviction2");
          expect(res.body.convictions[1].detailed_description).to.equal("Test Detailed Description2");
          done();
        });
    });
  })

  describe('conviction_delete', () => {
    it('sets date deleted for the conviction to be the current time', (done) => {
      let conviction = new Conviction({ title: "Test Conviction3", detailed_description: "Test Detailed Description3", _user: userId });

      conviction.save((err, conviction) => {
        // Make sure that the convition was successfully created
        agent.get('/api/convictions')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.convictions).to.be.an('array');
            expect(res.body.convictions.length).to.be.equal(3);

            // Set date_deleted for the deleted conviction
            agent.delete('/api/convictions')
              .set("X-CSRF-Token", csrfToken)
              .send({ convictionId: conviction._id})
              .then((res) => {
                // The return value of the deletetion is the convictionId
                expect(res.body.convictionId).to.equal(conviction._id.toString());

                // Sanity check to make sure that the deleted conviction is not part of the conviction_list
                agent.get('/api/convictions')
                  .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.convictions).to.be.an('array');
                    // Make sure does not count the deleted conviction
                    expect(res.body.convictions.length).to.be.equal(2);
                    done();
                  });
              });
          });
      });
    });
  })

});
