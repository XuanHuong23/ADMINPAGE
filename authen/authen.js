const time_to_show_login = 400;
const time_to_hidden_login = 200;

function change_to_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

    setTimeout(function () { document.querySelector('.cont_form_login').style.opacity = "1"; }, time_to_show_login);

    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = "none";
    }, time_to_hidden_login);
}

const time_to_show_sign_up = 100;
const time_to_hidden_sign_up = 400;

function change_to_sign_up(at) {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
    document.querySelector('.cont_form_sign_up').style.display = "block";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.opacity = "1";
    }, time_to_show_sign_up);

    setTimeout(function () {
        document.querySelector('.cont_form_login').style.display = "none";
    }, time_to_hidden_sign_up);


}

const time_to_hidden_all = 500;

function hidden_login_and_sign_up() {

    document.querySelector('.cont_forms').className = "cont_forms";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";
    document.querySelector('.cont_form_login').style.opacity = "0";

    setTimeout(function () {
        document.querySelector('.cont_form_sign_up').style.display = "none";
        document.querySelector('.cont_form_login').style.display = "none";
    }, time_to_hidden_all);

}

function signIn(event) {
    event.preventDefaut();

    let userData = {
        id: Date.now(),
        userName: event.target.userName.value,
        password: event.target.password.value,
        status: true
    }
    let userExit = null
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userName == userName) {
            userExit = userList[i]
            break
        }
    }

    if (!userExit) {
        alert("Người dùng không tồn tại")
        return
    }
    if (userExit.password != userData.password) {
        alert("Mật khẩu không chính xác")
        return
    }
    if (!userExit.status) {
        alert("Tài khoản bị khóa!")
        return
    }

    localStorage.setItem("userLogin", JSON.stringify(userData))
    window.location.href = "/"

}

function signUp(event) {
    event.preventDefaut()

    let newUser = {
        id: Date.now(),
        userName: event.target.userName.value,
        password: event.target.password.value,
        status: true
    }

    if (newUser.password != event.target.passwordAgain.value) {
        alert("Mật khẩu không trùng khớp")
        return;
    }
    if (newUser.userName == " ") {
        alert("Tên đăng nhập không thể bỏ trống")
        return
    }
    if (newUser.password == " ") {
        alert("Mật khẩu không thể bỏ trống")
        return
    }
    let userList = JSON.parse(localStorage.getItem("userList"))
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))

    alert("Đăng Ký Thành Công")
}


