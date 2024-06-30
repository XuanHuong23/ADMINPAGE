
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
// login
let userLogin = JSON.parse(localStorage.getItem("userLogin"))

function logout() {
    localStorage.removeItem("userLogin")
    window.location.href = '/authen'
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
        <h3>XUAN HUONG COMESTIC</h3>
        <div class="user_box">
            <span>Welcome, ${userLogin.userName} !</span>
            <button onclick="logout()" class="btn btn-danger">Log out</button>
        </div>
    `
}
renderHeader()
// lấy dữ liệu
function renderData() {
    let userList = JSON.parse(localStorage.getItem("userList"))
    let template = ``;
    for (let i = 0; i < userList.length; i++) {
        template += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${userList[i].userName}</td>
                <td>${userList[i].status ? "bình thường" : "tạm khóa"}</td>
                <td>
                    <button onclick="changeStatusUser(${userList[i].id})" class="btn btn-info">Bình Thường / Tạm Khóa</button>
                </td>
                <td>
                    <button onclick="deleteUser(${userList[i].id})" class="btn btn-danger">Xóa Người Dùng</button>
                </td>
            </tr>
        `
    }
    document.querySelector("#user_box").innerHTML = template;

}
renderData()

// thay đổi trạng thái dữ liệu
function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"))
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData()
}
// thêm dữ iệu
function addUser() {
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Nhập tên người dùng"),
        password: window.prompt("Nhập mật khẩu"),
        status: true
    }

    if (newUser.userName.includes(" ")) {
        alert("vui lòng nhập không khoảng cách")
        return
    }

    let userList = JSON.parse(localStorage.getItem("userList"))
    userList.push(newUser)
    localStorage.setItem("userList", JSON.stringify(userList))
    changePage()
}
// xóa dữ liệu
function deleteUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"))
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData();
}
// phân trang --->lỗi
let limit = 3
let nowPage = 0

function printPageList() {
    let userList = JSON.parse(localStorage.getItem("userList"))
    let pageCount = Math.ceil(userList.length / limit)

    let template = ``
    for (let i = 0; i < pageCount; i++) {
        template += `
            <button onclick="changePage(${i})>${i}</button>
`
    }
    document.querySelector(".page_list").innerHTML = template
}
printPageList()

function loadlistData() {
    let userList = JSON.parse(localStorage.getItem("userList"))
    let start = nowPage * limit
    let end = start + limit

    let pageDataList = []
    for (let i = start; i < end; i++) {
        if (userList[i]) {
            pageDataList.push(userList[i])
        } else {
            break
        }
    }
    renderData(pageDataList)
}

loadlistData()

function changePage(page) {
    console.log("page", page);
    nowPage = page
    printPageList()
    loadlistData()
}
// tìm kiếm ----> lỗi
function searchData() {

    let inputSearch = document.querySelector(".searchData").value
    let userList = JSON.parse(localStorage.getItem("userList"))

    console.log("inputSearch", inputSearch)
    let searchList = []
    for (const i in userList) {
        if (inputSearch == " ") {
            alert("Hãy nhập thông tin")
            return
        }
        if ((userList[i].userName).includes(inputSearch) == true) {
            searchList.push(userList[i])
        }

    }
    renderData(searchList)
}
