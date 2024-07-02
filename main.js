let userLogin = JSON.parse(localStorage.getItem("userLogin"));
//dang xuat
function logout() {
    localStorage.removeItem("userLogin");
    window.location.href = '/authen'
}
//render data ra man hinh
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