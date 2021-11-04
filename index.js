
let username = ""
let text = document.getElementById("text")
let btn = document.getElementById("btn")
let context = document.querySelector("#context")

 function setUser () {
   //İnputa girilen value'nun username' atanması
  username =  text.value
  console.log(username)
  text.value = ""

//atanan username değişkeninden sonra GetData Fonksiyonun tetiklenmesi
GetData(username)

 


}
async function GetData(username) {
  let name =""
  let useName=""
  var repos = []
  var reposLanguages = {}
  let size=0;
  let repoCount;
  const url = `https://api.github.com/users/${username}/repos`
  const userUrl=`https://api.github.com/users/${username}`
  fetch(userUrl)
  .then((res)=>res.json())
  .then((info)=>{
    name=info.name;
    useName=info.login;
    
  })


  await fetch(url)
    .then((data) => data.json())
    .then((userRepo) =>{
      userRepo.forEach((item) => {
        repos.push(item.name)
        size+=item.size
        repoCount=repos.length
        
        
      }
      );console.log(repoCount)
      
       
       
        for (var i = 0; i < repos.length; i++) {
          //console.log(repos[i])
          const languageUrl =`https://api.github.com/repos/${username}/${repos[i]}/languages`
           fetch(languageUrl)
          .then((res)=>res.json())
          .then((lang)=>{
            
            for(const [key,value] of Object.entries(lang)){
              if(reposLanguages.hasOwnProperty(key)){
                reposLanguages[key]+=value;
              }
              else{
                reposLanguages[key]=value
              }
            }
            
             
             
            
          })
        
          
          
        }//console.log(reposLanguages)
        //reposLanguages objesi for döngüsünün dışında boş olarak dönüyor.
       
     
      
      
      
      
      
    }
      
    ).then(()=>context.innerHTML =`   
    <div class="content">
    <div class="info">
        <p>${name}</p>
        <br/>
        <p>@${useName}</p>
    </div>

    <hr/>
    
    <ul class="list">
            <li class="Count">Total Repo :<b>${repoCount}  Repositories</b> </li>
            <li class="size">Total Size :<strong>${size} KB</strong></li>
            <li>
                <ul class="languages">
                    
                </ul>
            </li>
        </ul>
    
    </div>`  )
   
   
}





btn.addEventListener("click", setUser)









