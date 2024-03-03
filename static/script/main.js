let form_valid=false
function valid() {
  var pass = document.getElementById("password").value;
  var pas = document.getElementById("confirm_password").value;
  var dyn = document.querySelector("#p10");
  var bx1 = document.querySelector("#password");
  var bx2 = document.querySelector("#confirm_password");
  if (form_valid==false){
    return false
  }

  if (pass !== pas) {
    dyn.innerHTML = "<label>Password does not match!</label>";
    dyn.style.color = "red";
    bx2.style.border = "1px solid red";
    bx1.style.border = "1px solid red";
    return false;
  }

  return true;
}

async function checkusername() {
  var name = document.getElementById("username").value;
  console.log("Checking username");
  try {
    const response = await fetch("http://127.0.0.1:5000/fun", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "username": name }),
    });

    const data = await response.json();
    console.log(data);
    console.log("abcd");

    return data.success === 0;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
async function check_mail(){
  let email=document.getElementById("email").value
  try{
  const response= await fetch("http://127.0.0.1:5000/check_mail",{
    method:"POST",
    headers: {
      "Content-Type":"application/json"
    },
    body : JSON.stringify({"email":email}),
  })
  const data=await response.json()
  console.log(data.result)
  console.log(data.result==false)
  return data.result==false;


}
catch(error){
  console.log(error)
  return false
}
}

const email=document.getElementById('email')
email.addEventListener('blur', async function() {
  var mailbox=document.getElementById("email")
  var email_available=await check_mail()
  var dyn = document.querySelector("#p10");
  console.log(email_available)
  if(email_available){
    mailbox.style.border="1px solid green"
    dyn.innerHTML=""
    form_valid=true
  }
  else{
    dyn.innerHTML="<label>Email already used</label>"
    dyn.style.color="red"
  mailbox.style.border="1px solid red"
  form_valid=false
  }
})






const usernameInput = document.getElementById('username');
usernameInput.addEventListener('blur', async function () {
  username_box = document.getElementById("username");
  var dyn = document.querySelector("#p10");

  if (usernameInput.value.length === 0) {
    console.log("kuch ni keruunga");
  } else {
    const isUsernameAvailable = await checkusername();
    console.log(isUsernameAvailable);

    if (!isUsernameAvailable) {
      form_valid=false
      dyn.innerHTML = "<label>Username already exists!</label>";
      dyn.style.color = "red";
      username_box.style.border = "1px solid red";
    } else {
      username_box.style.border = "1px solid green";
      dyn.innerHTML = "";
      dyn.style.color = "green";
      form_valid=true
    }
  }
});
