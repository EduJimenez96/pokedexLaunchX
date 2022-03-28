function search() {
    let pokeName = document.getElementById("search-input").value;
    searchPokemon(pokeName);
}

const searchPokemon = (pokeName) => {
    console.log(pokeName);
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName.toLowerCase();
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            let imageTag = document.getElementById("image");
            let nameTag = document.getElementById("name");
            let typeTag = document.getElementById("type");

            imageTag.src = "images/notFound.png";
            nameTag.innerHTML = "Not found";
            typeTag.innerHTML = "Not found";
        }

    }).then((data) => {

        let info = {
            "name": data.name,
            "moves": data.moves,
            "image": data.sprites.front_default,
            "type": data.types[0].type["name"],
            "stats": data.stats
        };

        showPokeInfo(info);
    });

}

function showPokeInfo(info) {
    let imageTag = document.getElementById("image");
    let nameTag = document.getElementById("name");
    let typeTag = document.getElementById("type");
    let stats = document.getElementById("stats");
    let movesList = document.getElementById("moves");

    imageTag.src = info["image"];
    nameTag.innerHTML = info["name"];
    typeTag.innerHTML = info["type"];

    displayList(stats, info["stats"]);
    displayList(movesList, info["moves"], true);
}

function displayList(ulElement, list, isMoves = false) {
    let text;


    if (ulElement.hasChildNodes()) {
        var listLi = ulElement.getElementsByTagName("li");

        ulElement.innerHTML = '';
        /*for (i = 0; i <= listLi.length; i++){
            ulElement.removeChild(listLi[i]);
            i = 0;
        } */
    }

    for (i = 0; i < list.length; i++) {
        var li = document.createElement('li');
        text = isMoves ? document.createTextNode(list[i].move["name"]) : document.createTextNode(list[i].stat["name"] + ": " + list[i].base_stat);
        li.appendChild(text);
        ulElement.appendChild(li);
    }
}
