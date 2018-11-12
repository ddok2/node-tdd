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



출처: https://seokjun.kim/node-js-tdd/
