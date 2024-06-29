let userLogin = JSON.stringify(localStorage.getItem("userLogin"))

function logout() {
    localStorage.removeItem("userLogin")
    window.location.href = "/authen"
}

function renderHeader() {
    document.querySelector("header").innerHTML = `
     <span onclick="window.location.href='/'">ADMIN PAGE</span>
            <div class="box">
                <span>Hello, ${userLogin.userName}!</span>
                <button onclick ="logout()">Log Out</button>
            </div>
    `

}
renderHeader()
let userData = document.querySelector("tbody")
function renderData() {
    template = ""
    for (let i = 0; i < arr.length; i++) {
        template += `
            <tr>
                <td>${userData.id}</td>
                <td>${userData.userName}</td>
                <td>${userData.password}</td>
                <td>${userData.status ? "active" : "block"}</td>
            </tr>
        `
    }
    userData.innerHTML = template
}

renderData(JSON.parse(localStorage.getItem("userList")))