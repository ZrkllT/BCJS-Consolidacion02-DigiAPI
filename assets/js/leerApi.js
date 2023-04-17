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
                  <td><img id='digiImg${nro}' src='${item.img}' name=${item.name} alt="${item.level}" class='img-thumbnail'></td>
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
        $('#digiTable tbody').removeClass('d-none')
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
        $('#digiTable tbody').removeClass('d-none')

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
        $('#digiTable tbody').removeClass('d-none')
        document.getElementById('idDigiName').value = '';
    })

    $('#digiTable tbody').on('click','img',function(){
        digiId = $(this).attr('id')
        digiImg = $(this).attr('src')
        digiName = $(this).attr('name')
        digiLvl = $(this).attr('alt')

        $('#digiCard').removeClass('d-none')
        $('#digiCardSection').html('')
        $('#digiCardSection').append(`
            <img id="${digiId}" src="${digiImg}" class="card-img-top img-thumbnail">
            <div id="digiCardBody" class="card-body">
              <h3 class="card-title">${digiName}</h3>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>Nivel: </strong>${digiLvl}</li>
            </ul>
            `)
        $('#digiTable tbody').addClass('d-none')
    })

    $(document).on('click','#digiCardSection',function(){
        $('#digiCard').addClass('d-none')
        $('#digiTable tbody').removeClass('d-none')
    })
})
