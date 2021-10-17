     
$personajeBuscado = document.querySelector(".personaje-buscado");
$cargando = document.querySelector(".cargando"); 

 document.addEventListener("keypress", async e => {
     if(e.target.matches(".searchCha")){
        
        if(e.key === "Enter"){
            try { 
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
                let $busqueda = e.target.value; 
                let $query = e.target.value.toLowerCase(); 
                const url = "https://thronesapi.com/api/v2/Characters"
                let res = await fetch(url); 
                let json = await res.json(); 
                //console.log(res,json); 
                let $template = ''; 

                

                if(!res.ok) throw { status: res.status, statusText: res.statusText};
               
                for (let i = 0; i < json.length; i++) {
                    try {
                        let res = await fetch(url); 
                        let json = await res.json(); 
                        if(
                        json[i].firstName.toLowerCase() === $query.toLowerCase() ||
                        json[i].lastName.toLowerCase() === $query.toLowerCase() ||
                        json[i].fullName.toLowerCase() === $query.toLowerCase()){
                            $template += `
                            <figure>
                                <figcaption class='nombre'> ${json[i].fullName}</figcaption>
                                <div class='contenedor-img'><img src="${json[i].imageUrl}" alt= "${json[i].fullName}"></div> 
                                <p class='titulo'> Titulo: ${json[i].title}</p>
                                </figure>
                        `;
                       
                         }else{
                            $template += ''; 
                   }
                    } catch (err) {
                        
                    }
                    
                }
                $cargando.innerHTML= ''; 
                if($template === ''){
                    $template += ` <h3>
                    <p> No existe el personaje <b>${$busqueda}</b></p>
                    </h3>`; 
                     $personajeBuscado.innerHTML = $template;
                     
                }else{
                    $personajeBuscado.innerHTML = $template;
                }
                 
               
            } catch (err) {
                
            }
        }
     }
 })




