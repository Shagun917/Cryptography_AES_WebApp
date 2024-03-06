let form = document.querySelector('#form');
let form2 = document.querySelector('#form2');
let text = document.querySelector('#plaintext');
let encryptedtext = document.querySelector('#encryptedText');
let decryptedText = document.querySelector('#DeText');

var originalImageString,encryptedImageString,decryptedImageString;

function AES(text, shift) {
    return text
        .split('')
        .map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const isUpperCase = (code >= 65 && code <= 90);
                const offset = isUpperCase ? 65 : 97;
                return String.fromCharCode(((code - offset + shift) % 26) + offset);
            }
            return char;
        })
        .join('');
}

function encrypt(text, shift) {
    return AES(text, shift);
}


let decrypt = (text, shift) => {
    return AES(text, 26 - shift);
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let plaintext = text.value;
    encryptedtext.value = encrypt(plaintext, 5);
})

form2.addEventListener('submit', (event) => {
    event.preventDefault();
    let passwd = encryptedtext.value;
    decryptedText.value = decrypt(passwd, 5);
})
