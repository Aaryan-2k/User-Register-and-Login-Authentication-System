function valid(){
    var pass=document.getElementById("password").value;
    var pas=document.getElementById("confirm_password").value;
    var dyn=document.querySelector("#p10")
    var bx1=document.querySelector("#password")
    var bx2=document.querySelector("#confirm_password")
    var username_box=document.querySelector("#username")
    if (pass!=pas){
        dyn.innerHTML="<label>Password does not match !</label>"
        dyn.style.color='red'
        bx2.style.border = "1px solid red"
        bx1.style.border = "1px solid red"

        return false
    }
    if(checkusername()){
        return true
    }
    else{
        dyn.innerHTML="<label>Username already exists!</label>"
        dyn.style.color='red'
        username_box.style.border='1px solid red'

        return false


    }
function checkusername(){
    var name=document.getElementById("username").value
    fetch("/flask_function",{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'username': name }),
})
.then(response => response.json())
            .then(data => {
                if (data.success==1) {
                    return false

                } 
                else {
                    return true

                }
})

}
}