function search() {
    let pokeName = document.getElementById("search-input").value;
    searchPokemon(pokeName);
}

const searchPokemon = (pokeName) => {
    console.log(pokeName);
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokeName;
    fetch(url).then((response) => {
        return response.json();
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
    let nameTag = document.getElementById("name");
    let typeTag = document.getElementById("type");
    let movesList = document.getElementById("moves");
    let stats = document.getElementById("stats");
    let imageTag = document.getElementById("image");

    let nameText = document.createTextNode(info["name"]);
    let typeText = document.createTextNode(info["type"]);
    let movesText;
    let statsText;

    nameTag.appendChild(nameText);
    typeTag.appendChild(typeText);

    imageTag.src = info["image"];

    for (i = 0; i < info["moves"].length; i++) {
        var li = document.createElement('li');

        movesText = document.createTextNode(info["moves"][i].move["name"]);
        li.appendChild(movesText);
        movesList.appendChild(li);
    }

    for (i = 0; i < info["stats"].length; i++) {
        var li = document.createElement('li');

        statsText = document.createTextNode(info["stats"][i].stat["name"] + ": " + info["stats"][i].base_stat);
        li.appendChild(statsText);
        stats.appendChild(li);
    }
}
