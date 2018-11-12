import request from 'supertest';
import { expect } from 'chai';

import app from './index.js';

describe('GET /', () => {
    it('should respond with text message "Hello World"', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }
                expect(res.text).to.equal('Hello World');
                done();
            });
    });
});

describe('POST /login', () => {
    it('should respond with profile', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'email@email.com',
                password: '1234'
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                expect(res.body).has.all.keys(
                    ['id', 'email', 'name', 'age']
                );

                expect(res.body.id).to.equal('id');
                expect(res.body.name).to.equal('Sung');
                expect(res.body.age).to.equal('undefined');
                done();
            });
    });
});
