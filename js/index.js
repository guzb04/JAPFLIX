document.addEventListener("DOMContentLoaded", ()=>{
    let searchBtn = document.getElementById("btnBuscar");
    inputBuscar = document.getElementById("inputBuscar");
    list = document.getElementById("lista");
    
    
    searchBtn.addEventListener("click", ()=>{
        let inputBuscarValue = inputBuscar.value.toLowerCase()
        list.innerHTML = ''
        fetchData.forEach((element)=>{
            
            if(element.title.toLowerCase().includes(inputBuscarValue) || estaEnTagline(element, inputBuscarValue) || estaEnOverview(element, inputBuscarValue) || estaEnGenres(element, inputBuscarValue)){
                console.log(`tagline ${estaEnTagline(element, inputBuscarValue)}`)
                console.log(`overview ${estaEnOverview(element, inputBuscarValue)}`)
                console.log(`genres ${estaEnGenres(element, inputBuscarValue)}`)
                agregarPeli(element)
            }
        })
    })

})

function agregarPeli(peli){
    let votos = peli.vote_average;
    let rating = Math.round(votos/2);
    let peliInner = `
        <div class="card-content" data-bs-toggle = "offcanvas" data-bs-target = "#offcanvasTop" aria-controls = "offcanvasTop">
        
            <div>
                <h4 class="text-white">${peli.title}</h4>
                <p class="text-white">${peli.tagline}</p>
            </div>
        <div class="ml-auto">
            <span id="${peli.title}_star_0" class="fa fa-star"></span>
            <span id="${peli.title}_star_1" class="fa fa-star"></span>
            <span id="${peli.title}_star_2" class="fa fa-star"></span>
            <span id="${peli.title}_star_3" class="fa fa-star"></span>
            <span id="${peli.title}_star_4" class="fa fa-star"></span>
        </div>
        </div>

        <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">placeholder</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p id="offcanvasTopOverview">placeholder</p>
            <hr>
            <p id="offcanvasTopDate">placeholder</p>
        </div>
    </div>

    `;

    


    let peliHtml = document.createElement("li");
    peliHtml.classList.add("bg-dark")
    peliHtml.addEventListener("click", ()=>{
        let offcanvasTitle = document.getElementById("offcanvasTopLabel");
        let offcanvasOverview = document.getElementById("offcanvasTopOverview");
        let offcanvasDate = document.getElementById("offcanvasTopDate");

        let releaseYear = peli.release_date.split('-')
        console.log(releaseYear[0])

        offcanvasTitle.textContent = peli.title;
        offcanvasOverview.textContent = peli.overview;
        offcanvasDate.textContent = releaseYear[0];
        

    })

    
    peliHtml.innerHTML += peliInner; // Set innerHTML of peliHtml with peliInner content
    

    
    list.appendChild(peliHtml)
    for (let i = 0; i<rating; i++){
        let star = document.getElementById(`${peli.title}_star_${i}`);
        star.classList.add("checked")
    }
    
    console.log(peli)
}

function estaEnGenres(peli, valor){
    let vof = false;

    peli.genres.forEach((genero)=>{
        if (genero.name.toLowerCase().includes(valor)){
            vof = true;
        }
    })
    return vof
}

function estaEnOverview(peli, valor){
    let palabras = peli.overview.split(' ');
    let vof = false;
    
    palabras.forEach((palabra)=>{
        if (palabra.toLowerCase() == valor){
            vof = true;
        }
    })
    return vof
}

function estaEnTagline(peli, valor){
    let palabras = peli.tagline.split(' ');
    let vof = false;

    palabras.forEach((palabra) =>{
        if (palabra.toLowerCase() == valor){
            vof = true;
        }
    })
    return vof
}