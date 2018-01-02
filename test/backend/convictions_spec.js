// To ensure using test database
process.env.NODE_ENV = 'test';

const chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../../app.js');
const Conviction = require('../../models/Conviction.js');


chai.use(chaiHttp);
var agent = chai.request.agent(server)
var csrfToken;
var userId;
describe('Conviction controller', () => {

  before((done) => {
    Conviction.remove({}, (err) => {

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
          expect(res.body.date_added).to.not.be.a('null');
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
  });

  describe('conviction_patch', () => {
    it('updates the conviction with the new values', (done) => {
      let conviction = new Conviction({ title: "Test Conviction4", detailed_description: "Test Detailed Description4", _user: userId });

      conviction.save((err, conviction) => {
        agent.patch('/api/convictions')
          .set("X-CSRF-Token", csrfToken)
          .send({
            title: "Test Convicton4 Updated",
            detailed_description: "Test Detailed Description4 Updated",
            id: conviction._id
          })
          .then((res) => {
            expect(res.body.id).to.equal(conviction._id.toString());
            expect(res.body.title).to.equal("Test Convicton4 Updated");
            expect(res.body.detailed_description).to.equal("Test Detailed Description4 Updated");
            done();
          });
      });
    })
  })

});
