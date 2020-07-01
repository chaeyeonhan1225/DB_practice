const joinbtn = document.querySelector('#join-btn');
const searchbtn = document.querySelector('#search-btn');

joinbtn.addEventListener("click",join);
searchbtn.addEventListener("click",searchnick);

function join(){
    const user_id = document.querySelector('#user-id');
    const user_password = document.querySelector('#user-password');
    const user_nick = document.querySelector('#user-nick');
    const _id = user_id.value;
    const password = user_password.value;
    const nick = user_nick.value;
    if(_id&&password&&nick){
        fetch('http://localhost:8001/user/join',{
            method: "POST",
            body: JSON.stringify({
                userId: _id,
                password: password,
                nick: nick,
            }),
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(response=>{ 
            if([200,201].includes(response.status)){
                user_id.value = "";
                user_password.value = "";
                user_nick.value = "";
                location.reload();
                alert("회원가입 완료");
            }
        });
    } else {
        alert("아이디, 비밀번호, 닉네임을 입력해주세요!");
    }
};

function searchnick(){
    const userId = document.querySelector("#search").value;
    if(userId){
        fetch('http://localhost:8001/user/search',{
            method: "POST",
            body: JSON.stringify({
                userId: userId
            }),
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(response=>{ 
            if([200,201].includes(response.status)){
                response.json().then((resolve)=>{
                    console.log(resolve);
                    document.querySelector("#search").value = "";
                    let result = document.createElement('li');
                    result.innerHTML = resolve.result;
                    document.querySelector('#search-nick').appendChild(result);
                    alert("검색 완료");
                }).catch((error)=>{
                    console.error(error);
                });
            } 
        });
    }
}