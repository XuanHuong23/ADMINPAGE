// let catalogueList = [
//     {
//         id: 1,
//         cataName: "Kem dưỡng da",
//         place: "Khu A1",
//         Status: true
//     },
//     {
//         id: 2,
//         cataName: "Kem lót",
//         place: "Khu B1",
//         Status: true
//     }
// ]
// localStorage.setItem("catalogueList", JSON.stringify(catalogueList))

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

function renderData(catalogueList) {
    // let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
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
                    <button onclick="editCatalogue(${catalogueList[i].id})" class="btn btn-danger" id="btnid">Sửa</button>
                    <button onclick="deleteCatalogue(${catalogueList[i].id})" class="btn btn-danger" id="btnid">Xóa</button>
                </td>
            </tr>
        `
    }
    document.querySelector("tbody").innerHTML = template;

}
renderData(JSON.parse(localStorage.getItem("catalogueList")))

function changeStatusCata(cataId) {
    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    for (let i = 0; i < catalogueList.length; i++) {
        if (catalogueList[i].id == cataId) {
            catalogueList[i].status = !catalogueList[i].status
            break
        }
    }
    localStorage.setItem("catalogueList", JSON.stringify(catalogueList))
    renderData(JSON.parse(localStorage.getItem("catalogueList")))
}

function addcatalogue() {
    let newCatalogue = {
        id: Date.now(),
        cataName: document.getElementById("catalogueName").value,
        place: document.getElementById("place").value,
        Status: true
    }

    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    catalogueList.push(newCatalogue)
    localStorage.setItem("catalogueList", JSON.stringify(catalogueList))
    renderData(JSON.parse(localStorage.getItem("catalogueList")))

}



function deleteCatalogue(cataId) {
    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    for (let i = 0; i < catalogueList.length; i++) {
        if (catalogueList[i].id == cataId) {
            catalogueList.splice(i, 1)
            break
        }
    }
    localStorage.setItem("catalogueList", JSON.stringify(catalogueList))
    renderData(JSON.parse(localStorage.getItem("catalogueList")))
}

let limit = 3
let nowPage = 0

function printPageList() {
    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    let pageCount = Math.ceil(catalogueList.length / limit)

    let template = ``
    for (let i = 0; i < pageCount; i++) {
        template += `
            <button onclick="changePage(${i})">${i}</button>
`
    }
    document.querySelector("#page_list").innerHTML = template
}
printPageList()

function loadlistData() {
    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    let start = nowPage * limit
    let end = start + limit

    let pageDataList = []
    for (let i = start; i < end; i++) {
        if (catalogueList[i]) {
            pageDataList.push(catalogueList[i])
        } else {
            break
        }
    }
    renderData(pageDataList)
}

loadlistData()

function changePage(page) {
    nowPage = page
    printPageList()
    loadlistData()
}

function editCatalogue(id) {
    let catalogueList = JSON.parse(localStorage.getItem("catalogueList"))
    for (let i = 0; i < catalogueList.length; i++) {
        if (catalogueList[i].id === id) {
            catalogueList[i].cataName = document.getElementById("catalogueName").value
            catalogueList[i].place = document.getElementById("place").value
        }
    }
    console.log("id", id);
    localStorage.setItem("catalogueList", JSON.stringify(catalogueList))
    renderData(catalogueList)
}

