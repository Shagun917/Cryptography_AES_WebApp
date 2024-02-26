let form = document.querySelector('#form');
let form2 = document.querySelector('#form2');
let fileInput = document.querySelector('#file');
let passwordInput = document.querySelector('#password');
let codeInput = document.querySelector('#decypt_password');
let originalImagePreview = document.querySelector('#originalImagePreview');
let originalImageSize = document.querySelector('#originalImageSize');
let encryptedImageText = document.querySelector('#encryptedImageText');
let encryptedTextSize = document.querySelector('#encryptedTextSize');
let decryptedImagePreview = document.querySelector('#decryptedImagePreview');
let decryptedImageSize = document.querySelector('#decryptedImageSize');

var originalImageString, encryptedImageString, decryptedImageString;

// Function to encrypt.
// Pass plaintext and password 
// returns cipher text
let encrypt = (plainText, password) => {
    return CryptoJS.AES.encrypt(plainText, password, "{ mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }");
}

// Function to decrypt.
// Pass cipher and password 
// returns plain text
let decrypt = (cipherString, password) => {
    return CryptoJS.AES.decrypt(cipherString, password, "{ mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }").toString(CryptoJS.enc.Utf8);
}

// Function to format file size bytes into human readable format
// Eg, 12000 bytes => 11.7 KiB 
// si = base unit 1000 or 1024 , true = 1000, false = 1024
let fileSize = (bytes, si = true, dp = 1) => {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    const units = si
        ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

let encryptImage = (file, passwd) => {
    var reader = new FileReader();
    reader.onload = function () {
        //get original string
        originalImageString = reader.result.replace("data:", "").replace(/^.+,/, "");
        originalImagePreview.src = "data:image/png;base64," + originalImageString;
        originalImageSize.innerHTML = fileSize((new TextEncoder().encode(originalImageString)).length);

        //encrypt
        encryptedImageString = encrypt(originalImageString, passwd);
        encryptedImageText.value = "data:image/png;base64," + encryptedImageString;
        encryptedTextSize.innerHTML = fileSize((new TextEncoder().encode(encryptedImageString)).length);
    }

    reader.readAsDataURL(file);
}
let DecryptImage = (file, passwd, Code) => {
    if(passwd == Code) {
        decryptedImageString = decrypt(encryptedImageString, passwd);
        decryptedImagePreview.src = "data:image/png;base64," + decryptedImageString;
        decryptedImageSize.innerHTML = fileSize((new TextEncoder().encode(decryptedImageString)).length);
    } 
    reader.readAsDataURL(file);
}
var Code = "";
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const [file] = fileInput.files;
    if (file) originalImagePreview.src = URL.createObjectURL(file);
    let passwd = passwordInput.value;
    Code = passwd;
    encryptImage(file, passwd);
})
form2.addEventListener('submit', (event) => {
    event.preventDefault();
    let passwd = codeInput.value;
    DecryptImage(file, passwd, Code);
})