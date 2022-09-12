btnBuscar = document.getElementById("btnBuscar")
inputBuscar = document.getElementById("inputBuscar")

function showCards(data){
    

    document.getElementById("contenedor").innerHTML = ``;
    // console.log(inputBuscar.value);
    if(data.collection.items.length > 0){
        if(document.getElementById("card-container")){
            console.log('ya hay busqueda');
        }else{
            inputBuscar.classList.remove('is-invalid')
        document.getElementById("alertB").classList.add("hide")
        // console.log(data);
        let contenido = `<div id="title" class="text-center">
                <h2>Resultado de la búsqueda ${inputBuscar.value.toUpperCase()}</h2>
            </div>`
        for (let i = 0; i < data.collection.items.length; i++) {
            const item = data.collection.items[i];
            // console.log(item.links[0].href);
            // console.log(item.data[0].title);
            
            contenido += `

            <div class="col-md-4 scale">
            <div id="card-container" class="card mb-4 shadow-sm custom-card cursor-active card_hover"> 

            <a href="${item.links[0].href}" target="_blank">
                <img class="bd-placeholder-img card-img-top imgNASA" src="${item.links[0].href}">
            </a>
                <div class="card-body mt-0 box">
                    <h5 class="card-title">${item.data[0].title}</h5>
                    <p class="card-text">${item.data[0].description}</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">${item.data[0].date_created}</small>
                </div>    
            </div>
            </div>
            `
            document.getElementById("contenedor").innerHTML = contenido;
        }
    }
    
}else{
    let contenido = `<div id="title" class="text-center">
            <h2>No hay resultados para la búsqueda ${inputBuscar.value.toUpperCase()}</h2>
        </div>`
        document.getElementById("contenedor").innerHTML = contenido;
}

}

btnBuscar.addEventListener("click", async function(){
   
    const url = "https://images-api.nasa.gov/search?q=" + inputBuscar.value.toLowerCase();
    
    if(inputBuscar.value == ""){
        document.getElementById("contenedor").innerHTML = ``;
        inputBuscar.classList.add('is-invalid')
        document.getElementById("alertB").classList.remove("hide")
        
    }else{
    
    const getJSONData = await fetch(url)
                                .then((response) => response.json())
                                .catch(function (error) {
                                    console.log(error);
                                });
    showCards(getJSONData);
    // console.log(getJSONData);
                            }
        
})