const height = 5;

for (let i = 1; i <= height; i++) {
    let output = '';

    for (let j = height - i; j > 0; j--) {
        output += ' ';
    }

    for (let k = 1; k <= i; k++) {
        output += k;
    }

    console.log(output);
}