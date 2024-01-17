const mysql = require('mysql2');

const connec = {
  host: 'localhost',
  user: 'root',
  password: '1111',
  database: 'member',
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const createDt = `
  CREATE DATABASE IF NOT EXISTS member CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
`;

const useDt = `
  USE member;
`;

const gwon = `
  GRANT ALL PRIVILEGES ON *.* TO 'USER'@'localhost' IDENTIFIED BY '1111';
`;

const tab = `
  CREATE TABLE IF NOT EXISTS member (
    hakbun INT PRIMARY KEY,
    irum VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    sex VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    age INT,
    dept VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    tel VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
`;

// 데이터 삽입
const ins = [
  "INSERT INTO member VALUES (20221234, '홍길동', '남', 20, '산업시스템', '010-345-0987');",
  "INSERT INTO member VALUES (20191234, '강산에', '남', 23, '산업디자인', '010-143-1237');",
  "INSERT INTO member VALUES (20191235, '김혜수', '여', 23, '소프트웨어공학', '010-242-0345');",
  "INSERT INTO member VALUES (20191236, '라미란', '여', 23, '컴퓨터공학', '010-351-5134');",
  "INSERT INTO member VALUES (20151234, '마동석', '남', 27, 'IT융합', '010-393-6685');",
];

// 성별이 '남성'인 경우에 대해서만 데이터 출력
const mann = `
  SELECT * FROM member WHERE sex = '남' COLLATE utf8mb4_unicode_ci;
`;

// 데이터베이스 연결
const connection = mysql.createConnection(connec);

connection.connect(err => {
  if (err) {
    console.error('오류 발생:', err);
    return;
  }

  // 데이터베이스 생성
  connection.query(createDt, (err, results) => {
    if (err) {
      console.error('오류 발생:', err);
      connection.end();
      return;
    }


    // 생성된 데이터베이스 선택
    connection.query(useDt, (err, results) => {
      if (err) {
        console.error('오류 발생:', err);
        connection.end();
        return;
      }


      // 사용자에게 권한 부여
      connection.query(gwon, (err, results) => {
        if (err) {
          console.error('오류 발생:', err);
          connection.end();
          return;
        }


        // 테이블 생성
        connection.query(tab, (err, results) => {
          if (err) {
            console.error('오류 발생:', err);
            connection.end();
            return;
          }


          // charset 변경
          const alterCharset = `
            ALTER TABLE member CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
          `;

          connection.query(alterCharset, (err, results) => {
            if (err) {
              console.error('오류 발생:', err);
              connection.end();
              return;
            }

            console.log('테이블 charset이 변경되었습니다.');

            // 데이터 삽입
            ins.forEach(query => {
              connection.query(query, (err, results) => {
                if (err) {
                  console.error('오류 발생:', err);
                }
              });
            });


            // 성별이 '남성'인 데이터 조회
            connection.query(mann, (err, results) => {
              if (err) {
                console.error('오류 발생:', err);
              } else {
                console.log('Member 테이블 데이터:', results);
              }

              // 데이터베이스 연결 종료
              connection.end();
            });
          });
        });
      });
    });
  });
});