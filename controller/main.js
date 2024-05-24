let map;
let pin; 

function GetMap(){
    map = new Microsoft.Maps.Map('#myMap',{
        //adiciona a localização com as cordenadas
        center: new Microsoft.Maps.Location(-23.502098271488702, -46.420680231192996),
        //tipo de mapa para imagen aereas "aerial" e para rua "street"
         mapTypeId: Microsoft.Maps.MapTypeId.street,
         zoom: 20,

         //editar cores do mapa
         customMapStyle: {
            elements: {
                area: { fillColor: '#b6e591' },
                water: { fillColor: '#75cff0' },
                tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
                arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
                road: { fillColor: '#ffa35a', strokeColor: '#ff9c4f' },
                street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
                transit: { fillColor: '#000000' }
            },
            settings: {
                landColor: '#efe9e1'
            }
        }
    });

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
        var options = {
            maxResults: 4,
            map: map
        };
        var manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
    });
    function selectedSuggestion(suggestionResult) {
        map.entities.clear();
        map.setView({ bounds: suggestionResult.bestView });
        var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
        map.entities.push(pushpin);
    }
    

    
    //requerindo os enderços do arquivo .json 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './modulo/enderecos.json', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var enderecos = JSON.parse(xhr.responseText);
            addPushpins(enderecos);
        }
    };
    xhr.send();    

    //utilizando um laço para adicionar marcadores em diferentes endereços
    let addPushpins = (enderecos) =>{
        for(let endereco of enderecos){     
            pin = new Microsoft.Maps.Pushpin(endereco.location,{
                title: endereco.title,
                subTitle: endereco.subTitle,
                icon: endereco.icon
            });

            
            //informaçõe do pushpin
            pin.metadata = {
                title: endereco.title,
                description: endereco.description 
            };
            
            infobox = new Microsoft.Maps.Infobox(pin, {visible: false})

            infobox.setMap(map)
            map.entities.push(pin);

            Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

            //Criar uma função on click no PushPin
            // Microsoft.Maps.Events.addHandler(pin, "click", function() {
            //     highlight('pushpinClick');
            // });
        }   
    }

    
    //função para adicioar clique no marcador pushpin
    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}

// function highlight(id) {
//     document.getElementById(id).style.display = 'flex';
// }

