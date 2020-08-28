function uname_ic(){
    var elem = document.getElementById("Alert");
    alert("Invalid Username");
}
function pwd_ic(){
    var elem = document.getElementById("Alert");
    elem.innerHTML= "Password Incorrect"
}

module.exports= {
    uname_ic, pwd_ic
};