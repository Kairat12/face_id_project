function initNcaLayer(){
    window.webSocket = new WebSocket('wss://127.0.0.1:13579/');
    window.callback = null;
    window.wasClean = false;
    window.webSocket.onopen = function (event) {
        console.log("Connection opened");
        window.wasClean = true;
    };
    
    window.webSocket.onclose = function (event) {
        if (event.wasClean) {
            window.wasClean = false;
            console.log('connection has been closed');
        } else {
            window.wasClean = false;
            console.log('Connection error');
            //openDialog();
        }
        console.log('Code: ' + event.code + ' Reason: ' + event.reason);
    };
    
    // webSocket.onerror = function (event) {
    //     console.log('Something is wrong!');
    //     // openDialog();
    // };
    
    window.webSocket.onmessage = function (event) {
        var result = JSON.parse(event.data);
        console.debug(result);
    
        if (result != null) {
            var rw = {
                code: result['code'],
                message: result['message'],
                responseObject: result['responseObject'],
                getResult: function () {
                    return this.result;
                },
                getMessage: function () {
                    return this.message;
                },
                getResponseObject: function () {
                    return this.responseObject;
                },
                getCode: function () {
                    return this.code;
                }
            };
            if (window.callback != null) {
            if(typeof(window.callback) === "function"){
                window.callback(rw);
            }else{
                    window[callback](rw);
            }
            }
        }
        // console.log(event);
    };
};

initNcaLayer();
function blockScreen() {
    $.blockUI({
        message: 'Подождите, выполняется операция в NCALayer...',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });
}

function reopenNcaLayer(){
    window.webSocket = new WebSocket('wss://127.0.0.1:13579/');
}

function openDialog() {
    if (confirm("Ошибка при подключении к NCALayer. Запустите NCALayer и нажмите ОК") === true) {
        location.reload();
    }
}

function unblockScreen() {
    $.unblockUI();
}



function getActiveTokens(callBack) {
    var getActiveTokens = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getActiveTokens"
    };
    callback = callBack;
    webSocket.send(JSON.stringify(getActiveTokens));
}

function getKeyInfo(storageName, callBack) {
    var getKeyInfo = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "getKeyInfo",
        "args": [storageName]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(getKeyInfo));
}

function browseKeys(callback) {
    callback = callback;
    var message = {
        "method":"browseKeyStore",
        "args":["PKCS12", "P12", "/home/marat/_WORK"]
    };
    webSocket.send(JSON.stringify(message));

}

function signXml(storageName, keyType, xmlToSign, callBack) {
    var signXml = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "signXml",
        "args": [storageName, keyType, xmlToSign, "", ""]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(signXml));
}

function signXmls(storageName, keyType, xmlsToSign, callBack) {
    var signXmls = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "signXmls",
        "args": [storageName, keyType, xmlsToSign, "", ""]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(signXmls));
}

function createCAdESFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCAdESFromFile = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromFile));
}

function createCAdESFromBase64(storageName, keyType, base64ToSign, flag, callBack) {
    var createCAdESFromBase64 = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromBase64",
        "args": [storageName, keyType, base64ToSign, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromBase64));
}

function createCAdESFromBase64Hash(storageName, keyType, base64ToSign, callBack) {
    var createCAdESFromBase64Hash = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCAdESFromBase64Hash",
        "args": [storageName, keyType, base64ToSign]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCAdESFromBase64Hash));
}

function applyCAdEST(storageName, keyType, cmsForTS, callBack) {
    var applyCAdEST = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "applyCAdEST",
        "args": [storageName, keyType, cmsForTS]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(applyCAdEST));
}

function showFileChooser(fileExtension, currentDirectory, callBack) {
    var showFileChooser = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "showFileChooser",
        "args": [fileExtension, currentDirectory]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(showFileChooser));
}

function changeLocale(language) {
    var changeLocale = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "changeLocale",
        "args": [language]
    };
    callback = null;
    webSocket.send(JSON.stringify(changeLocale));
}

function createCMSSignatureFromFile(storageName, keyType, filePath, flag, callBack) {
    var createCMSSignatureFromFile = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromFile",
        "args": [storageName, keyType, filePath, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCMSSignatureFromFile));
}

function createCMSSignatureFromBase64(storageName, keyType, base64ToSign, flag, callBack) {
    var createCMSSignatureFromBase64 = {
        "module": "kz.gov.pki.knca.commonUtils",
        "method": "createCMSSignatureFromBase64",
        "args": [storageName, keyType, base64ToSign, flag]
    };
    callback = callBack;
    webSocket.send(JSON.stringify(createCMSSignatureFromBase64));
}

function getActiveTokensCall() {
    // blockScreen();
	getActiveTokens("getActiveTokensBack");
}

function getActiveTokensBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var listOfTokens = result['responseObject'];        
        $('#storageSelect').empty();
        $('#storageSelect').append('<option value="PKCS12">PKCS12</option>');
        for (var i = 0; i < listOfTokens.length; i++) {
            $('#storageSelect').append('<option value="' + listOfTokens[i] + '">' + listOfTokens[i] + '</option>');
        }
    }
}

function getKeyInfoCall() {
    blockScreen();
    var selectedStorage = $('#storageSelect').val();
    getKeyInfo(selectedStorage, "getKeyInfoBack");
}

function getKeyInfoBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];

        var alias = res['alias'];
        $("#alias").val(alias);

        var keyId = res['keyId'];
        $("#keyId").val(keyId);

        var algorithm = res['algorithm'];
        $("#algorithm").val(algorithm);

        var subjectCn = res['subjectCn'];
        $("#subjectCn").val(subjectCn);

        var subjectDn = res['subjectDn'];
        $("#subjectDn").val(subjectDn);

        var issuerCn = res['issuerCn'];
        $("#issuerCn").val(issuerCn);

        var issuerDn = res['issuerDn'];
        $("#issuerDn").val(issuerDn);

        var serialNumber = res['serialNumber'];
        $("#serialNumber").val(serialNumber);

        var dateString = res['certNotAfter'];
        var date = new Date(Number(dateString));
        $("#notafter").val(date.toLocaleString());

        dateString = res['certNotBefore'];
        date = new Date(Number(dateString));
        $("#notbefore").val(date.toLocaleString());

        var authorityKeyIdentifier = res['authorityKeyIdentifier'];
        $("#authorityKeyIdentifier").val(authorityKeyIdentifier);

        var pem = res['pem'];
        $("#pem").val(pem);
    }
}

function signXmlCall() {
    var xmlToSign = $("#xmlToSign").val();
    var selectedStorage = $('#storageSelect').val();
	blockScreen();
    signXml(selectedStorage, "SIGNATURE", xmlToSign, "signXmlBack");
}

function signXmlBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#signedXml").val(res);
    }
}

function signXmlsCall() {
    var xmlToSign1 = $("#xmlToSign1").val();
	var xmlToSign2 = $("#xmlToSign2").val();
	var xmlsToSign = new Array(xmlToSign1, xmlToSign2);
	var selectedStorage = $('#storageSelect').val();
	blockScreen();
	signXmls(selectedStorage, "SIGNATURE", xmlsToSign, "signXmlsBack");
}

function signXmlsBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#signedXml1").val(res[0]);
		$("#signedXml2").val(res[1]);
    }
}

function createCAdESFromFileCall() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flag").is(':checked');
    var filePath = $("#filePath").val();
    if (filePath !== null && filePath !== "") {
		blockScreen();
        createCAdESFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCAdESFromFileBack");
    } else {
        alert("Не выбран файл для подписи!");
    }
}

function createCAdESFromFileBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMS").val(res);
    }
}

function createCAdESFromBase64Call() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flagForBase64").is(':checked');
    var base64ToSign = $("#base64ToSign").val();
    if (base64ToSign !== null && base64ToSign !== "") {
		// $.blockUI();
        createCAdESFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCAdESFromBase64Back");
    } else {
        alert("Нет данных для подписи!");
    }
}

function createCAdESFromBase64Back(result) {
	// $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSforBase64").val(res);
    }
}

function createCAdESFromBase64HashCall() {
    var selectedStorage = $('#storageSelect').val();
    var base64ToSign = $("#base64HashToSign").val();
    if (base64ToSign !== null && base64ToSign !== "") {
		// $.blockUI();
        createCAdESFromBase64Hash(selectedStorage, "SIGNATURE", base64ToSign, "createCAdESFromBase64HashBack");
    } else {
        alert("Нет данных для подписи!");
    }
}

function createCAdESFromBase64HashBack(result) {
	// $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSforBase64Hash").val(res);
    }
}

function applyCAdESTCall() {
    var selectedStorage = $('#storageSelect').val();
    var cmsForTS = $("#CMSForTS").val();
    if (cmsForTS !== null && cmsForTS !== "") {
		$.blockUI();
        applyCAdEST(selectedStorage, "SIGNATURE", cmsForTS, "applyCAdESTBack");
    } else {
        alert("Нет данных для подписи!");
    }
}

function applyCAdESTBack(result) {
	// $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSWithAppliedTS").val(res);
    }
}

function showFileChooserCall() {
    blockScreen();
    showFileChooser("ALL", "", "showFileChooserBack");
}

function showFileChooserBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#filePath").val(res);
    }
}

function showFileChooserForTSCall() {
    blockScreen();
    showFileChooser("ALL", "", "showFileChooserForTSBack");
}

function showFileChooserForTSBack(result) {
    unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#filePathWithTS").val(res);
    }
}

function changeLocaleCall() {
    var selectedLocale = $('#localeSelect').val();
    changeLocale(selectedLocale);
}

function createCMSSignatureFromFileCall() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flagForCMSWithTS").is(':checked');
    var filePath = $("#filePathWithTS").val();
    if (filePath !== null && filePath !== "") {
		blockScreen();
        createCMSSignatureFromFile(selectedStorage, "SIGNATURE", filePath, flag, "createCMSSignatureFromFileBack");
    } else {
        alert("Не выбран файл для подписи!");
    }
}

function createCMSSignatureFromFileBack(result) {
	unblockScreen();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSWithTS").val(res);
    }
}

function createCMSSignatureFromBase64Call() {
    var selectedStorage = $('#storageSelect').val();
    var flag = $("#flagForBase64WithTS").is(':checked');
    var base64ToSign = $("#base64ToSignWithTS").val();
    if (base64ToSign !== null && base64ToSign !== "") {
		// $.blockUI();
        createCMSSignatureFromBase64(selectedStorage, "SIGNATURE", base64ToSign, flag, "createCMSSignatureFromBase64Back");
    } else {
        alert("Нет данных для подписи!");
    }
}

function createCMSSignatureFromBase64Back(result) {
	// $.unblockUI();
    if (result['code'] === "500") {
        alert(result['message']);
    } else if (result['code'] === "200") {
        var res = result['responseObject'];
        $("#createdCMSforBase64WithTS").val(res);
    }
}