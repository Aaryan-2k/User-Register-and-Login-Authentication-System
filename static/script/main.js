async function valid(e) {
    e.preventDefault()
    var pass = document.getElementById("password").value;
    var pas = document.getElementById("confirm_password").value;
    var dyn = document.querySelector("#p10");
    var bx1 = document.querySelector("#password");
    var bx2 = document.querySelector("#confirm_password");
    var username_box = document.querySelector("#username");

    if (pass !== pas) {
        dyn.innerHTML = "<label>Password does not match!</label>";
        dyn.style.color = 'red';
        bx2.style.border = "1px solid red";
        bx1.style.border = "1px solid red";
        return false;
    }

    const isUsernameAvailable = await checkusername();
    console.log(isUsernameAvailable);
    if (!isUsernameAvailable) {
        dyn.innerHTML = "<label>Username already exists!</label>";
        dyn.style.color = 'red';
        username_box.style.border = '1px solid red';
        return false;
    }
    return true
}
async function checkusername() {
    var name = document.getElementById("username").value;

    try {
        const response = await fetch("http://127.0.0.1:5000/fun", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'username': name }),
        });

        const data = await response.json();
        console.log(data);

        return data.success === 0;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}