const weather=document.querySelector('form');
const search=document.querySelector('input');
const message=document.getElementsByClassName('message');
weather.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location=search.value;
    console.log(location);
    fetch('http://localhost:1100/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                 message[0].textContent=data.error;
            }
            else{
            message[0].textContent=data.location;
            message[1].textContent=data.forecast;
            }
        })
    })
})



