const fs = require('fs');

const inputFile = 'input.txt';
const outputFile = 'output.txt';

function readAndWriteFile(inputFile, outputFile) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('파일을 읽는 도중 오류가 발생했습니다:', err);
      return;
    }

    fs.writeFile(outputFile, data, 'utf8', (err) => {
      if (err) {
        console.error('파일을 쓰는 도중 오류가 발생했습니다:', err);
        return;
      }
      console.log(`[${outputFile}]에 성공적으로 쓰여졌습니다.`);
    });
  });
}


readAndWriteFile(inputFile, outputFile);