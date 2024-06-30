// let userList = [
//     {
//         id: 1,
//         userName: "admin",
//         password: "123",
//         status: true
//     },
//     {
//         id: 2,
//         userName: "member",
//         password: "1234",
//         status: true
//     }
// ]

// localStorage.setItem("userList", JSON.stringify(userList))

function signIn(event) {
    event.preventDefault();
    let userInfor = {
        userName: event.target.userName.value,
        password: event.target.password.value
    }

    let userList = JSON.parse(localStorage.getItem("userList"));

    let userResult = null;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].userName == userInfor.userName) {
            userResult = userList[i];
            break;
        }
    }

    if (!userResult) {
        alert("Người dùng không tồn tại!")
        return;
    }

    if (userResult.password != userInfor.password) {
        alert("Mật khẩu không chính xác!")
        return;
    }

    if (!userResult.status) {
        alert("Tài khoản đã bị khóa")
        return;
    }

    localStorage.setItem("userLogin", JSON.stringify(userResult))
    window.location.href = "/"
}