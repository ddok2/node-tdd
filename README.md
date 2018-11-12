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


출처: https://seokjun.kim/node-js-tdd/
