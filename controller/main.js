let map;
let pin;

const btnPosition = document.getElementById('btnGetPosition');
let local = document.getElementById('local');
let result = document.getElementById('result');

function GetMap(){
    map = new Microsoft.Maps.Map('#myMap',{
        center: new Microsoft.Maps.Location(-23.502098271488702, -46.420680231192996),
         mapTypeId: Microsoft.Maps.MapTypeId.street,
         zoom: 20,
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

    let iconPin = '../views/icons/pin.png';

    btnPosition.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            map.setView({center: new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude), zoom: 20});
            
            let pushpin = new Microsoft.Maps.Pushpin(map.getCenter(),{icon: iconPin}, null);
            map.entities.push(pushpin, {visible: true, draggable: true, anchor: new Microsoft.Maps.Point(0, 0)});
            local.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`; 
            result.style.display = 'flex';          
        });
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
        var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location,{icon: iconPin}, null);
        map.entities.push(pushpin);
    }
};

const close = document.getElementById('close');
close.addEventListener('click', () => {
    result.style.display = 'none';
});