// let productList = [
//     {
//         id: 1,
//         productName: "Dầu gội H&S",
//         catalogue: "Phụ liệu tóc",
//         price: 2000,
//         Status: true
//     },
//     {
//         id: 2,
//         productName: "Dầu gội Clear",
//         catalogue: "Phụ liệu tóc",
//         price: 1500,
//         Status: true
//     }
// ]
// localStorage.setItem("productList", JSON.stringify(productList))

let userLogin = JSON.parse(localStorage.getItem("userLogin"));

function logout() {
    localStorage.removeItem("userLogin");
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

function renderData() {
    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    let template = ``;
    for (let i = 0; i < catalogueList.length; i++) {
        template += `
            <tr>
                <td scope="row">${i + 1}</td>
                <td>${catalogueList[i].cataName}</td>
                <td>${catalogueList[i].place}</td>
                <td>${catalogueList[i].status ? "còn trong kho" : "nhập thêm hàng"}</td>
                <td>
                    <button onclick="changeStatusCata(${catalogueList[i].id})" class="btn btn-info">Còn Trong Kho/ Nhập Thêm Hàng</button>
                </td>
                <td>
                    <button onclick="editcatalogue(${catalogueList[i].id})" class="btn btn-danger">Sửa</button>
                    <button onclick="deletecatalogue(${catalogueList[i].id})" class="btn btn-danger">Xóa</button>
                </td>
            </tr>
        `
    }
    document.querySelector("tbody").innerHTML = template;

}
renderData()