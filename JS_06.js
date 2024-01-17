const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
    // 매개변수 a를 가져오고, 숫자로 변환합니다.
    const a = parseInt(req.query.a);

    // 매개변수 값이 유효한지 확인합니다.
    if (isNaN(a) || a <= 0) {
        res.send('유효한 매개변수 값을 입력하세요.');
        return;
    }

    // 1부터 a까지의 합을 계산합니다.
    const sum = (a * (a + 1)) / 2;

    // 결과를 클라이언트에 응답합니다.
    res.send(`${1}-${a}까지의 합= ${sum}입니다.`);
});

app.listen(port, () => {
    console.log(`서버가 http://127.0.0.1:${port} 에서 실행 중입니다.`);
});