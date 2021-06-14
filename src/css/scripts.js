window.onload = formatLinks

function formatLinks(){
    let login =  document.querySelector('#login')
    let register =  document.querySelector('#register')
    let logoutLink =  document.querySelector('#logout')
  document.cookie.split(';').forEach(cookie=>{
    let parsed = cookie.split('=')
    if(parsed[0] === '_id'){
        if(parsed[1] !==''){
            !login.classList.contains('d-none') && login.classList.toggle('d-none')
            !register.classList.toggle('d-none') && register.classList.toggle('d-none')
            !logoutLink.classList.toggle('d-block') && logoutLink.classList.toggle('d-none')
        }else{
            !login.classList.toggle('d-block') && login.classList.toggle('d-block')
            !register.classList.toggle('d-block') && register.classList.toggle('d-block')
            !logoutLink.classList.toggle('d-none') && logoutLink.classList.toggle('d-none')
        }  
    }else{
        !login.classList.toggle('d-block') &&login.classList.toggle('d-block')
        !register.classList.toggle('d-block') &&register.classList.toggle('d-block')
        !logoutLink.classList.toggle('d-none') && logoutLink.classList.toggle('d-none')
    }
  })
}


