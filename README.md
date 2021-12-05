# Movie API NestJS 

## 사전 준비사항
### npm / node 설치
* 참고 : https://firework-ham.tistory.com/20

### postgresql 데이터베이스 설치 : docker postgres 사용, db 계정 : postgres, 암호 : nest1234, 포트 : 15432
* docker run -d -p 15432:5432 --name postgres -e POSTGRES_PASSWORD=nest1234 -v pgdata:/var/lib/postgresql/data postgres  

### yarn 설치
* choco install yarn -- windows
* brew install yarn  -- mac

### nestjs/cli 전역 설치
* yarn add @nestjs/cli

## 프로젝트 구성/실행
### 최초 node_module 구성 또는 node_module library 갱신.
* yarn install

### 프로젝트 실행하기
* yarn start
* localhost:3000 으로 실행됨.

### 프로젝트 개발환경으로 실행하기(개발환경에서만 swagger ui 가 작동함.)
* yarn start:dev
* swagger ui : localhost:3000/swagger

## 프로젝트 실행이후 curl 로 테스트 하기
### 데이터 입력(create)
* curl -X POST -H "Content-Type: application/json" -d '{"title": "insert test", "year": 2021}' http://localhost:3000/movies

### 데이터 전체 조회(select all)
* curl -X GET -H "Content-Type: application/json" http://localhost:3000/movies

### 데이터 한건 조회(select)
* curl -X GET -H "Content-Type: application/json" http://localhost:3000/movies/1

### 데이터 수정(update)
* curl -X PATCH -H "Content-Type: application/json" -d '{"title": "update test", "year": 2021}' http://localhost:3000/movies/1

### 데이터 삭제(delete)
* curl -X DELETE http://localhost:3000/movies/1


## 프로젝트 jest unit test 
* yarn test
* test 는 db 가 없어도 mock repository 처럼 작동함.
