const login_btn = document.querySelector("#login_btn");
const join_btn = document.querySelector("#join_btn");

if(login_btn)
    login_btn.addEventListener("click",login);
if(join_btn)
    join_btn.addEventListener("click",join);

function login(){
    const id = document.querySelector("#user_id").value;
    const password = document.querySelector("#user_password").value;
    console.log(id+password);
    fetch('http://localhost:3000/auth/login',{
        method: "POST",
        body: JSON.stringify({
            email : id,
            password : password
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

function join(){
    const email = document.querySelector("#join_email");
    const password = document.querySelector("#join_password");
    const nick = document.querySelector("#join_nick");
    if(email.value&&password.value&&nick.value){
        fetch("http://localhost:3000/auth/join",{
            method: "POST",
            body: JSON.stringify({
                email: email.value,
                password: password.value,
                nick: nick.value
            }),
            headers:{ 
                "Content-Type" : "application/json; charset=UTF-8"
            }
        }).then(response=>{
            if([200,201].includes(response.status)){
                alert("회원가입 성공");
                email.value = "";
                password.value = "";
                nick.value = "";
            }
        });
    } else {
        return alert("이메일, 비밀번호, 닉네임을 입력해주세요!");
    }

}