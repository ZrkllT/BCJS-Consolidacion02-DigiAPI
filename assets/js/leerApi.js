let url = 'https://digimon-api.vercel.app/api/digimon/'
let urlFind = ''
let nro = 0
let niveles = []

function digiList(lvl,name){
    if(lvl == '' && name == ''){
        urlFind = url
    }else if(lvl == '' && name != ''){
        urlFind = url+'name/'+name
    }else if(lvl != '' && name == ''){
        urlFind = url+'level/'+lvl
    }
    fetch(urlFind).then((digimon) =>{
        return digimon.json()
    }).then((datos) =>{
        $('#digiTable tbody').html('')
        nro = 0
        for(const item of datos){
            nro ++
            $('#digiTable tbody').append(`
                <tr>
                  <td>${nro}</td>
                  <td>${item.name}</td>
                  <td><img id='digiImg${nro}' src='${item.img}' name=${item.name} class='img-thumbnail'></td>
                  <td>${item.level}</td>
                `)
            }
    }).catch((err) =>{
        $('#errJumbotrom').removeClass('d-none')
    })
}

function digiLevels(){
    fetch(url).then((levels) =>{
        return levels.json()
    }).then((datos) =>{
        for(const lvl of datos){
            if(niveles.includes(lvl.level)){
            }else{
                 niveles.push(lvl.level)
                 $('#idDigiLvl').append(`
                <option value='${lvl.level}'>${lvl.level}</option>
                `)
            }            
        }
    })
}

$(document).ready(function(){
    digiLevels()

    $(document).on('change','#idDigiLvl',function(){
        $('#digiTable tbody').html('')
        let lvlToFind = $('#idDigiLvl').val();
        $('#errJumbotrom').addClass('d-none');
        $('#digiCard').addClass('d-none')
        if(lvlToFind != 'Todos'){
            document.getElementById('idDigiName').value = '';
            $('#idDigiName').prop('disabled', true);
        }else{
            document.getElementById('idDigiName').value = '';
            $('#idDigiName').prop('disabled', false);
        }
    })

    $(document).on('click','#idBtnBuscar',function(){
        $('#errJumbotrom').addClass('d-none')
        $('#digiCard').addClass('d-none')
        let lvlToFind = $('#idDigiLvl').val()
        let nameToFind = $('#idDigiName').val()

        if(lvlToFind == 'Todos'){
            lvlToFind = ''
        }
        digiList(lvlToFind,nameToFind)
    })

    $(document).on('click','#errJumbotrom',function(){
        $('#errJumbotrom').addClass('d-none')
        $('#digiCard').addClass('d-none')
        document.getElementById('idDigiName').value = '';
    })

    $('#digiTable tbody').on('click','img',function(){
        digiId = $(this).attr('id')
        digiImg = $(this).attr('src')
        digiName = $(this).attr('name')

        $('#digiCard').removeClass('d-none')
        $('#digiCardSection').html('')
        $('#digiCardSection').append(`
            <img id="${digiId}" src="${digiImg}" class="card-img-top img-thumbnail">
            <div id="cardMovieBody" class="card-body">
              <h3 class="card-title">${digiName}</h3>
            </div>

            `)
    })
})

/*
$('#cardMovie').append(`
    <img id="imgMovie" src="${dataPelicula.poster}" class="card-img-top img-thumbnail">
    <div id="cardMovieBody" class="card-body">
      <h3 class="card-title">${dataPelicula.title}</h3>
      <p class="card-text">${dataPelicula.synopsis}</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Título Romanizado:</strong> ${dataPelicula.hepburn}</li>
        <li class="list-group-item"><strong>Año Estreno:</strong> ${dataPelicula.release}</li>
        <li class="list-group-item"><strong>Director:</strong> ${dataPelicula.director}</li>
        <li class="list-group-item"><a class="btn btn-primary">Más Información</a></li>
    </ul>
    `)
    */

//document.getElementById("prueba").value = "";
/*
$(document).querySelector('.img-thumbnail').forEach(elemento =>{
    elemento.addEventListener('click', ele =>{
        const idImg = ele.target.getAttribute('id')
        console.log('click en: '+id)
    })
})
*//*
document
    .getElementById("to_focus")
    .addEventListener("keydown", function(event) {
        if(event.ctrlKey && event.key === "z"){
            // Hacer algo, tal vez deshacer
        }
    }
});
*/