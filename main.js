// let userList = [
//     {
//         id: Date.now(),
//         userName: "admin",
//         password: "123",
//         status: true
//     },
//     {
//         id: Date.now(),
//         userName: "member",
//         password: "1234",
//         status: true
//     }

// ]
// localStorage.setItem("userList", JSON.stringify(userList))

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