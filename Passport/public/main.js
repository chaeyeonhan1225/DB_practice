const login_btn = document.querySelector("#login_btn");

login_btn.addEventListener("click",login);

function login(){
    const id = document.querySelector("#user_id").value;
    const password = document.querySelector("#user_password").value;
    console.log(id+password);
    fetch('http://localhost:3000/auth/login',{
        method: "POST",
        body: JSON.stringify({
            userId : id,
            userPassword: password
        }),
        headers:{
            "Content-Type" : "application/json; charset=UTF-8"
        }
    }).then(response=>{
        if([200,201].includes(response.status)){
            document.querySelector("#user_id").value = "";
            document.querySelector("#user_password").value = "";
            location.reload();  // 새로고침
            console.log("회원 가입 완료");
        }
    });
}