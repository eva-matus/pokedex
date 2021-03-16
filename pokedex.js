//esto me cargar el documento en el DOM para ser manipulado
document.addEventListener('DOMContentLoaded', function(){

    function show_result(response){
        response.results.forEach(function(pokemon){           
            $('#cards').append(`<div class="card container" style="width: 18rem;">
                                <div class="card-body">
                                <h5 class="card-title">${pokemon.name}</h5>
                                <button id='more-info' class="boton-quiero" data-info=${pokemon.url} data-name=${pokemon.name}>¡Quiero saber más de este pokémon!</button>
                                    </div>
                                </div>`)               
        })
        var button = $('#next-button')
        button.attr('data-next', response.next)
    }

    function show_info (response) {
        var typeArray = []
        response.types.forEach(function(typeInfo){
            typeArray.push(typeInfo.type.name)
            var promise = $.ajax(typeInfo.type.url)
            promise.done(show_generation)
            function show_generation(response){
                $('#generation').text(response.generation.name )
            }
        })
        $('#type').text(typeArray.join(', '))

        var abilitiesArray = []
        response.abilities.forEach(function(abilitiesInfo){
            abilitiesArray.push(abilitiesInfo.ability.name)
        })
        $('#abilities').text(abilitiesArray.join(', '))

        var movesArray = []
        response.moves.forEach(function(abilitiesInfo){
            movesArray.push(abilitiesInfo.move.name)
        })
        finalMovesArray = movesArray.slice(0, 5)
        $('#moves').text(finalMovesArray.join(', '))
        $('#show-info').modal('show');       
    }    

    baseURL = 'https://pokeapi.co/api/v2/pokemon/'

    var promise = $.ajax(baseURL)
        promise.done(show_result)

    $('#cards').on('click', function (event) {
        if (event.target.dataset.info){
            var pokemonName = event.target.dataset.name
            var promise = $.ajax(event.target.dataset.info)
            $('.modal-title').text(pokemonName)
            promise.done(show_info)
        }  
    })

    $('#next-button').on('click', function(){
        var nextURL = $('#next-button').attr('data-next')
        $.ajax(nextURL).done(show_result) 
    })
});