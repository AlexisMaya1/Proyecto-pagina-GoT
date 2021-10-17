
const $secJuego = document.querySelector(".juego"); 
    let ArrayCinco = [];
    let maquetacionJuego = ''; 
    let $btnJugar = document.querySelector(".btn-jugar");
    let resCorrectas = 0; 
    let resIncorrectas = 0; 
    const $showJuego = document.querySelector(".show-juego"); 

   
    let $btnsJugarRendirse = document.querySelector(".btns-jugar-rendirse"); 
    
document.addEventListener("click", async (e) => {
    
    if(e.target.matches(".btn-jugar")){

        let $cargando = document.querySelector(".load"); 
        
        $cargando.innerHTML = `<svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#FFA421">
        <circle cx="15" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
                     begin="0s" dur="0.8s"
                     values="15;9;15" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
                     begin="0s" dur="0.8s"
                     values="1;.5;1" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
            <animate attributeName="r" from="9" to="9"
                     begin="0s" dur="0.8s"
                     values="9;15;9" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="0.5" to="0.5"
                     begin="0s" dur="0.8s"
                     values=".5;1;.5" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        <circle cx="105" cy="15" r="15">
            <animate attributeName="r" from="15" to="15"
                     begin="0s" dur="0.8s"
                     values="15;9;15" calcMode="linear"
                     repeatCount="indefinite" />
            <animate attributeName="fill-opacity" from="1" to="1"
                     begin="0s" dur="0.8s"
                     values="1;.5;1" calcMode="linear"
                     repeatCount="indefinite" />
        </circle>
        </svg>`; 

         //numeros random sin repetirse: 

          const numRandom = [];
         let max = 5 
         for (let i = 0; i < max; i++) {
             let random = Math.floor(Math.random()*53);
            let check = numRandom.includes(random); 
             
            if(check === false) {
             numRandom.push(random);
           } else {
             while(check === true){
               n = Math.floor(Math.random() * 53) + 1;
               check = numRandom.includes(n);
                 if(check === false){
                   numRandom.push(n);
                 }
               }
             }
         }
         //console.log(numRandom); 
          
        try {
            let url = 'https://thronesapi.com/api/v2/Characters'; 
            let res = await fetch(url); 
            let json = await res.json();
            
            $btnJugar.disabled = true; 
             
            //console.log(res,json); 
            
            if(!res.ok) throw { status: res.status, statusText: res.statusText};

            for (let i = 0; i < numRandom.length; i++) {
                try {
                    let urlRandom = `https://thronesapi.com/api/v2/Characters/${numRandom[i]}`;
                    let res = await fetch(urlRandom); 
                    let json = await res.json();

                    
                    ArrayCinco.push(json);  

                    if(!res.ok) throw { status: res.status, statusText: res.statusText};    

                } catch (error) {
                    
                }
                 
           }
           
        } catch (err) {
            let message = err.statusText || "Ocurrio un error"; 
            $showJuego.innerHTML = `<p> Error ${err.status}: ${message} </p>`;
        }

        //console.log(ArrayCinco); 

         for (let i = 0; i < ArrayCinco.length; i++) {
       
        maquetacionJuego +=   `<article class='articulo${i}'>
        <div class="contenedor-imagen">
            <img src="${ArrayCinco[i].imageUrl}" alt="${ArrayCinco[i].fullName}">
        </div>
        <div class="contenedor-texto">
         <h3>¿Cual es su nombre?</h3>
         <input type="search" class="respuesta${i}">
        </div>
    </article>`; 
    } 

    $showJuego.innerHTML = maquetacionJuego; 
    maquetacionJuego = ''; 
    $cargando.innerHTML = '';
    resCorrectas = 0; 
    resIncorrectas = 0;  

    var $BtnRendirse = document.createElement("button"); 
    $BtnRendirse.textContent = "Rendirse"; 
    $BtnRendirse.setAttribute("type", "button"); 
    $BtnRendirse.setAttribute("class", "btn-rendirse");
    $btnsJugarRendirse.appendChild($BtnRendirse); 

    document.addEventListener("click", (e) => {

       if(e.target.matches(".btn-rendirse")){
        $showJuego.innerHTML = ''; 
        maquetacionJuego = ''; 
        resCorrectas = 0; 
        resIncorrectas = 0;  
        $btnJugar.disabled = false;
        $BtnRendirse.remove(); 
        ArrayCinco = []; 
        }
  });

    }

  
//Respuestas 

    $showJuego.addEventListener("keypress", (e) => {
    if(e.target.matches(".respuesta0")){
        if(e.key === 'Enter'){
            
            let res1 = document.querySelector(".respuesta0").value;
            if(res1.toLowerCase() === ArrayCinco[0].firstName.toLowerCase() ||
                res1.toLowerCase() === ArrayCinco[0].fullName.toLowerCase() ){
                    resCorrectas++; 
                }else{
                    resIncorrectas++; 
                }
                let article0 = document.querySelector(".articulo0");
                article0.remove(); 
                
        } 
        

    }else if(e.target.matches(".respuesta1")){
        if(e.key === 'Enter'){
             
            let res1 = document.querySelector(".respuesta1").value;
            if(res1.toLowerCase() === ArrayCinco[1].firstName.toLowerCase() ||
                res1.toLowerCase() === ArrayCinco[1].fullName.toLowerCase() ){
                    resCorrectas++; 
                }else{
                    resIncorrectas++; 
                }
                let article1 = document.querySelector(".articulo1");
                article1.remove(); 
                
        } 
         

    }else if(e.target.matches(".respuesta2")){
        if(e.key === 'Enter'){
             
            let res1 = document.querySelector(".respuesta2").value;
            if(res1.toLowerCase() === ArrayCinco[2].firstName.toLowerCase() ||
                res1.toLowerCase() === ArrayCinco[2].fullName.toLowerCase() ){
                    resCorrectas++; 
                }else{
                    resIncorrectas++; 
                }
                let article2 = document.querySelector(".articulo2");
                article2.remove(); 
                
        } 
         
    }else if(e.target.matches(".respuesta3")){
        if(e.key === 'Enter'){
             
            let res1 = document.querySelector(".respuesta3").value;
            if(res1.toLowerCase() === ArrayCinco[3].firstName.toLowerCase() ||
                res1.toLowerCase() === ArrayCinco[3].fullName.toLowerCase() ){
                    resCorrectas++; 
                }else{
                    resIncorrectas++; 
                }
                let article3 = document.querySelector(".articulo3");
                article3.remove(); 
                
        } 
        
    }else if(e.target.matches(".respuesta4")){
        if(e.key === 'Enter'){
            $BtnRendirse.remove();
            let res1 = document.querySelector(".respuesta4").value;
            if(res1.toLowerCase() === ArrayCinco[4].firstName.toLowerCase() ||
                res1.toLowerCase() === ArrayCinco[4].fullName.toLowerCase() ){
                    resCorrectas++; 
                }else{
                    resIncorrectas++; 
                }
                
                let article4 = document.querySelector(".articulo4");
                article4.remove();   
        } 
    } 

    //Imprimir resultados 

   if($showJuego.innerHTML === ''){
       $showJuego.innerHTML = ` <div> 
            <h2>Tuviste ${resCorrectas} respuestas correctas y ${resIncorrectas}
            respuestas incorrectas </h2>
            <div>
            <h3> Respuestas Correctas: </h3>
             <ol> 
             <li> ${ArrayCinco[0].fullName} </li>
             <li> ${ArrayCinco[1].fullName} </li>
             <li> ${ArrayCinco[2].fullName} </li>
             <li> ${ArrayCinco[3].fullName} </li>
             <li> ${ArrayCinco[4].fullName} </li>
             </ul>
            </div>
            </div>`;
            $btnJugar.disabled = false; 
            $btnJugar.textContent = 'Volver a jugar'; 
            
            //Borrar Array
              ArrayCinco = [];
   }
    
})

}); 





