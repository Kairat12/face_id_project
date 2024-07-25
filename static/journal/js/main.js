let regBtn = document.getElementById("registration_with_ecp");

if(regBtn){
    regBtn.addEventListener("click", () => {
    regNcaLayer();
})
}


function regNcaLayer() {
    blockScreen();
    if (window.hasOwnProperty('webSocket')) {
        if (webSocket.readyState == webSocket.OPEN) {
            getKeyInfo("PKCS12", function (result) {
                if (result.code === '200') {
                    unblockScreen();
                    let eds_data = result?.responseObject?.subjectDn?.replace(/\\"/g, '"');
                    const fields = eds_data.split(',');
                    // Объект для хранения нормализованных полей
                    const normalizedFields = {};

                    // Разбиваем каждую подстроку на ключ и значение
                    fields.forEach(field => {
                        let [key, value] = field.split('=');
                        value = value.replace("BIN", '').replace("IIN", '')
                        if (key === "O") {
                            normalizedFields[key.toLowerCase()] = value;
                        } else {
                            normalizedFields[key.toLowerCase()] = value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        }
                    });
                    localStorage.setItem('ecpData', JSON.stringify(normalizedFields));
                    window.location.href = '/registration';
                } else if (result.code !== '200') {
                    unblockScreen();
                    console.error(response['code']);
                }
            })
        } else {
            initNcaLayer();
            unblockScreen();
            openDialog();
        }
    }
}

let loginBtn = document.getElementById("login_with_ecp");
if(loginBtn) {
    loginBtn.addEventListener("click", () => {
        LoginNcaLayer();
    })
}

function LoginNcaLayer() {
    blockScreen();
    if (window.hasOwnProperty('webSocket')) {
        if (webSocket.readyState == webSocket.OPEN) {
            getKeyInfo("PKCS12", function (result) {
                if (result.code === '200') {
                    unblockScreen();
                    let eds_data = result?.responseObject?.subjectDn?.replace(/\\"/g, '"');
                    const fields = eds_data.split(',');
                    // Объект для хранения нормализованных полей
                    const normalizedFields = {};

                    // Разбиваем каждую подстроку на ключ и значение
                    fields.forEach(field => {
                        let [key, value] = field.split('=');
                        value = value.replace("BIN", '').replace("IIN", '')
                        if (key === "O") {
                            normalizedFields[key.toLowerCase()] = value;
                        } else {
                            normalizedFields[key.toLowerCase()] = value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ');
                        }
                    });
                    let username = document.getElementById("id_username");
                    username.value = `${normalizedFields.serialnumber}`;
                } else if (result.code !== '200') {
                    unblockScreen();
                    console.error(response['code']);
                }
            })
        } else {
            initNcaLayer();
            unblockScreen();
            openDialog();
        }
    }
}