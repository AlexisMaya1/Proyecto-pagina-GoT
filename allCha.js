
const url = "https://thronesapi.com/api/v2/Characters",
 d = document, 
$loading = d.querySelector(".loading"), 
$listaPersonajesBtns = document.querySelector(".personajes-botones"); 
$section = d.querySelector(".contenido"),
$juegoContenedor = document.querySelector(".juego-contenedor"),

d.addEventListener("click", async e => {
    if(e.target.matches(".all")){
         try {
            $loading.innerHTML = `<svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#FFA421">
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
            let res = await fetch(url); 
            let json =  await res.json(); 
            $template = ""; 
          //console.log(res, json); 
            
            if(!res.ok)throw {status:res.status, statusText: res.statusText} 

           for (let i = 0; i < json.length + 1; i++) {
               try {
                let res = await fetch(url); 
                let json =  await res.json();
                
                if(!res.ok)throw {status:res.status, statusText: res.statusText}

                $template += `
                        <figure>
                            <div class='contenedor-img'><img src="${json[i].imageUrl}" alt= "${json[i].fullName}"></div> 
                            <figcaption class='nombre'> ${json[i].fullName}</figcaption>
                            <figcaption class='titulo'> ${json[i].title}</figcaption>
                            </figure>
                    `; 
        
               } catch (err) {
                let message = err.statusText || "Ocurrio un error"; 
                $section.innerHTML = `<p> Error ${err.status}: ${message} </p>`;
               }
               
           }

          $section.innerHTML = $template;  
            $loading.innerHTML = ''; 
             

            if(!res.ok) throw { status: res.status, statusText: res.statusText};

           
             
         } catch (err) {
            let message = err.statusText || "Ocurrio un error"; 
            $section.innerHTML = `<p> Error ${err.status}: ${message} </p>`;
         } 

        
            let $BtnBorrar = document.createElement("button"); 
            let BtnBorrarContenido = document.createTextNode("Borrar");
            $BtnBorrar.appendChild(BtnBorrarContenido); 
            $BtnBorrar.setAttribute("type", "button");
            $BtnBorrar.setAttribute("class", "borrar"); 
        
        
         $listaPersonajesBtns.appendChild($BtnBorrar); 
         
    }
  if(e.target.matches(".borrar")){
        $section.innerHTML = ''; 
        let $BtnDelete = document.querySelector(".borrar"); 
        $BtnDelete.remove(); 
    }
}); 




