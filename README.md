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



출처: https://seokjun.kim/node-js-tdd/
