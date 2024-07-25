const ecpData = JSON.parse(localStorage.getItem('ecpData'));
if (ecpData) {
    console.log("ecpData", ecpData);
    regBtn = document.getElementById("reg_btn");
    regBtn.classList.remove("active");
    regEcpBtn = document.getElementById("reg_ecp_btn");
    regEcpBtn.classList.add("active");
    let username = document.getElementById("id_username");
    username.value = `${ecpData.serialnumber}`;
    username.setAttribute('readonly', '');
    let full_name = document.getElementById("id_full_name");
    full_name.value = ecpData.g !== undefined ? `${ecpData.cn} ${ecpData.g}` : `${ecpData.cn}`;
    full_name.setAttribute('readonly', '');
    let organization = document.getElementById("id_organization");
    organization.value = ecpData.o;
    organization.setAttribute('readonly', '');
    let bin = document.getElementById("id_bin");
    bin.value = ecpData.ou;
    bin.setAttribute('readonly', '');
    localStorage.removeItem('ecpData');
}
