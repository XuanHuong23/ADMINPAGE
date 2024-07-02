
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

//dang xuat trang
function logout() {
    localStorage.removeItem("userLogin")
    window.location.href = '/authen'
}

//dua du lieu header ra man hinh
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

// render du lieu cua mot trang
function renderData(userList) {
    // let userList = JSON.parse(localStorage.getItem("userList"))
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
renderData(JSON.parse(localStorage.getItem("userList")))

// thay đổi trạng thái dữ liệu ==> hiện tất cả dữ liệu
function changeStatusUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"))
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            userList[i].status = !userList[i].status;
            break
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    loadlistData()
}

// thêm dữ iệu
function addUser() {
    //khai bao mot user moi
    let newUser = {
        id: Date.now(),
        userName: window.prompt("Nhập tên người dùng"),
        password: window.prompt("Nhập mật khẩu"),
        status: true
    }
    //neu username bang voi dau cach ==> nguoi dung phai nhap khong co cach
    if (newUser.userName.includes(" ")) {
        alert("vui lòng nhập không khoảng cách")
        return
    }
    //tao mot bien userlisst
    let userList = JSON.parse(localStorage.getItem("userList"))
    //them du lieu tu newuser vao userlist
    userList.push(newUser)
    alert("Đã thêm người dùng mới")
    //luu vao userlist o trong localstorage
    localStorage.setItem("userList", JSON.stringify(userList))
    changePage(Math.ceil(userList.length / limit) - 1)
}

// xóa dữ liệu
function deleteUser(userId) {
    let userList = JSON.parse(localStorage.getItem("userList"))
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == userId) {
            alert("Bạn chắc chắn xóa người dùng này??")
            userList.splice(i, 1)//lệnh splice(xóa 1 phần từ bắt đầu từ vị trí i)
            break;
        }
    }
    localStorage.setItem("userList", JSON.stringify(userList))
    renderData(JSON.parse(localStorage.getItem("userList")))
    changePage(Math.ceil(userList.length / limit) - 1)
}


//phân trang
let limit = 3//tạo 1 biến giới hạn 1 trang 3 phần tử
let nowPage = 0 // trang bắt đầu dẽ là vị trí 0
//tạo một function in ra trang
function printPageList() {
    let userList = JSON.parse(localStorage.getItem("userList"))
    let pageCount = Math.ceil(userList.length / limit)//có 6 phần tử --> 6/3=3
    //in dữ liệu ra màn hình
    let template = ``
    for (let i = 0; i < pageCount; i++) {
        template += `
            <button onclick="changePage(${i})">${i}</button>
`
    }
    document.querySelector("#page_list").innerHTML = template
}
printPageList()//gọi hàm in ra trang
//
function loadlistData() {
    let userList = JSON.parse(localStorage.getItem("userList"))
    let start = nowPage * limit//ví dụ [0,1,2,3,4,5,6] có 6 phần tử, ở vị trí đầu sẽ bằng trang đầu * số lượn phần tử bị giới hạn
    let end = start + limit//vị trí cuối sẽ bằng vị trí đầu + phần tử giới hạn

    let pageDataList = []//tạo 1 mảng rỗng
    //chạy for
    for (let i = start; i < end; i++) {
        if (userList[i]) { //nếu nó có trong userlist thì phần tử sẽ đc thêm vào mảng rỗng
            pageDataList.push(userList[i])
        } else { //nếu không thì dừng function
            break
        }
    }
    renderData(pageDataList)//render pagdatalisst ra màn hình
}

loadlistData()

function changePage(page) {
    nowPage = page
    printPageList()
    loadlistData()
}

//tim kiem
function searchData() {
    let userList = JSON.parse(localStorage.getItem("userList"))
    let inputSearch = document.querySelector(".searchData").value // lấy giá trị từ HTMl

    let searchList = [] //tạo mảng rỗng
    for (const i in userList) {

        if (inputSearch == " ") {//nếu giá trị đã nhập là trống
            alert("Hãy nhập thông tin")
            return
        }

        if ((userList[i].userName.toLowerCase()).includes(inputSearch.toLowerCase()) == true) {//dùng lệnh includes để tìm kiếm thông tin
            //tolowercase dùng để đổi các kí tự về chữ thường
            searchList.push(userList[i])
        }
        //tìm bỏ dấu trong tiếng việt???????????
    }
    alert("Đã tìm thấy người dùng")
    renderData(searchList)//render tìm kiếm ra màn hình

}

//sap xep
//dung for de sap xep 
function sortList(event) {
    console.log("event", event.target.value);
    let userList = JSON.parse(localStorage.getItem("userList"))
    //     if (event.target.value === "name_asc") {
    //         userList.sort((a, b) => a.userName.localeCompare(b.userName))
    //     } else {
    //         userList.sort((a, b) => b.userName.localeCompare(a.userName))
    //     }
    //     // renderData(userList)
    //     localStorage.setItem("userList", JSON.stringify(userList))
    //     loadlistData()
    // }
    for (let i = 0; i < userList.length; i++) {
        for (let j = 0; i < userList.length - 1; i++) {
            if (userList[j].userName > userList[j + 1].userName) {
                let max = userList[j].userName
                userList[j].userName = userList[j + 1].userName
                userList[j + 1].userName = max
            }
        }
        return
    }
    console.log("sort", sortList());
}
