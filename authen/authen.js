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
//dang nhap
function signIn(event) {
    event.preventDefault();//phương thức để chặn các hành vi mặc định
    let userInfor = { //tạo biến thông tin user
        userName: event.target.userName.value,//lấy giá trị username
        password: event.target.password.value
    }

    let userList = JSON.parse(localStorage.getItem("userList"))//lấy giá trị từ local

    let userResult = null;//tạo một biến bằng null
    for (let i = 0; i < userList.length; i++) {//chạy for 
        if (userList[i].userName == userInfor.userName) {//nếu 
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