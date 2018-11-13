# Node TDD Test

## 준비하기
우선 프로젝트를 생성하자.
```npm
$ mkdir node-tdd && cd node-tdd
$ npm init -f
```
```npm
$ npm install express -S
$ npm install mocha chai supertest -D
$ npm install babel-cli babel-preset-node6 babel-register -D
```

`.babelrc` 설정도 하자.


```
$ vi .babelrc
```
```json
{
  "presets": ["node6"]
}
```

## 시작하기
`import express from 'expresss';'` 부터 시작해야할 것 같지만, 
우선 서버 시작과 테스트 러닝 스크립트를 `package.json` 추가하자.
```json
{
    "scripts": {
        "test": "npx mocha --compilers js:babel-register --recursive ./**/*.spec.js",
        "start": "npx babel-node index.js"
    }
}
```

`index.spec.js` 에 아래 코드를 입력하자.
```javascript
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

```

모든 튜토리얼이 그렇듯 Hello World 를 리턴 할 것을 예상하고 간단한 테스트 코드를 작성하였다. 
`app` 을 `import` 하는 것을 알 수있는데, `supertest` 는 express instance 를 
import 하여 테스트를 위한 request 를 보낼 수 있는 패키지이다.

다음은 `index.js` 에 아래 코드를 입력하자
```javascript
import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('working...');
});

export default app;

```
실행:
```
$ npm test
```

결과:
```
$ npm test

> node-tdd@1.0.0 test /Users/sung/Development/sung/node-tdd
> npx mocha --compilers js:babel-register --recursive ./**/*.spec.js



(node:10516) DeprecationWarning: "--compilers" will be removed in a future version of Mocha; see https://git.io/vdcSr for more info
working...
  GET /
    ✓ should respond with text message "Hello World"


  1 passing (40ms)

```

## 로그인
`POST` API를 하나 더 만들어서 테스트 해보자.
```json
{
  "email": "email@email.com",
  "passworld": "1234"
}
```
Request Body에 위와 같은 내용을 담아 `POST` 요청을 보내면 프로필 정보를 알려주는 로그인 API가 있다고 가정하자.
리턴값은 json으로 아래와 같은 형태로 보내줄 것이다.
```json
{
  "id": "id",
  "email": "email@email.com",
  "name": "Sung",
  "age": "undefined"
}
```

테스트 코드는 다음과 같이 작성한다.
```javascript
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
```

이제 `npm test` 명령어로 테스트를 한다.

결과:
```
$ npm test

> node-tdd@1.0.0 test /Users/sung/Development/sung/node-tdd
> npx mocha --compilers js:babel-register --recursive ./**/*.spec.js



(node:13014) DeprecationWarning: "--compilers" will be removed in a future version of Mocha; see https://git.io/vdcSr for more info
working...
  GET /
    ✓ should respond with text message "Hello World"

  POST /login
    1) should respond with profile


  1 passing (49ms)
  1 failing

  1) POST /login
       should respond with profile:
     Error: expected 200 "OK", got 404 "Not Found"
      at Test._assertStatus (node_modules/supertest/lib/test.js:268:12)
      at Test._assertFunction (node_modules/supertest/lib/test.js:283:11)
      at Test.assert (node_modules/supertest/lib/test.js:173:18)
      at Server.localAssert (node_modules/supertest/lib/test.js:131:12)
      at emitCloseNT (net.js:1664:8)
      at _combinedTickCallback (internal/process/next_tick.js:136:11)
      at process._tickCallback (internal/process/next_tick.js:181:9)

```

아직 실제로 `app`에서 `/login` route 를 설정해주지 않았기 때문에 위와 같은 404 에러로 테스트에 실패한다. 
그러면 이제 실제 앱에서 관련 코드를 작성해보자.

우선 `express` 에서 `Request Body` 를 파싱해주기 위해 `body-parser 미들웨어`를 설치하자.
```
$ npm i body-parser -S
```

`index.js` 는 다음과 같이 수정한다.
```javascript
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
```

`login`코드는 다음과 같다.
```javascript
app.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Bad Request');
    }

    if (req.body.email === 'email@email.com'
        && req.body.password === '1234') {
        return res.send({
            id: 'id',
            email: 'email@email.com',
            name: 'Sung',
            age: 'undefined'
        });
    }
    return res.status(401).send('Unauthorized');
});
```

`npm test` 돌려보자.
```
$ npm test

> node-tdd@1.0.0 test /Users/sung/Development/sung/node-tdd
> npx mocha --compilers js:babel-register --recursive ./**/*.spec.js



(node:13070) DeprecationWarning: "--compilers" will be removed in a future version of Mocha; see https://git.io/vdcSr for more info
working...
  GET /
    ✓ should respond with text message "Hello World"

  POST /login
    ✓ should respond with profile


  2 passing (39ms)


```

끝!


출처: https://seokjun.kim/node-js-tdd/
