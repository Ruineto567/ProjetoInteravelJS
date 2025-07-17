let currentePageUrl = 'https://rickandmortyapi.com/api/character'


window.onload = async () => {
    try {
        await loadCharacters(currentePageUrl);
    } catch (error){
        console.log(error);
        alert('Erro ao carregar Cards !');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');   
    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadBackPage);

};

async function loadCharacters(url) {
    const maincContent = document.getElementById('main-content');
    maincContent.innerHTML = '';

    try {

        const response = await fetch(url);
        const responseJson = await response.json();


        responseJson.results.forEach((character) => {
            const card = document.createElement('div');
            card.style.backgroundImage = `url(${character.image})`
            card.className = 'cards';

            const characterNameBG = document.createElement('div');
            characterNameBG.className = 'character-name-bg';

            const characterName = document.createElement('span');
            characterName.className = 'character-name';
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName);
            card.appendChild(characterNameBG);

            card.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible';

                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';

                const characterImage = document.createElement('div');
                characterImage.style.backgroundImage = `url(${character.image})`
                characterImage.className = 'character-image';

                const name = document.createElement('span');
                name.className = 'character-details';
                name.innerText = `Nome: ${character.name}`

                const characterStatus = document.createElement('span');
                characterStatus.className = 'character-details';
                characterStatus.innerText = `Status: ${convertStatus(character.status)}`

                const species = document.createElement('span');
                species.className = 'character-details';
                species.innerText = `Especies: ${convertSpecies(character.species)}`

                const gender = document.createElement('span');
                gender.className = 'character-details';
                gender.innerText = `Genero: ${convertGender(character.gender)}`

                const origin = document.createElement('span');
                origin.className = 'character-details';
                origin.innerText = `Origem: ${character.origin.name}`

                modalContent.appendChild(characterImage);
                modalContent.appendChild(name);
                modalContent.appendChild(characterStatus);
                modalContent.appendChild(species);
                modalContent.appendChild(gender);
                modalContent.appendChild(origin);               
            }
            
            maincContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.info.next;
        backButton.disabled = !responseJson.info.prev;

        backButton.style.visibility = responseJson.info.prev ? 'visible' : 'hidden';

        currentePageUrl = url 


    } catch (error){
        console.log(error);
        alert('Erro ao carregar personagens !');
    }
}

async function loadNextPage() {
    if (!currentePageUrl)  return;

     try {
        const response = await fetch(currentePageUrl);
        const responseJson = await response.json();

        await loadCharacters(responseJson.info.next);

    } catch (error){
        console.log(error);
        alert('Erro ao carregar pagina !');
    }
}

async function loadBackPage() {
    try {
        const response = await fetch(currentePageUrl);
        const responseJson = await response.json();
        loadCharacters(responseJson.info.prev);

    } catch (error){ 
        console.log(error);
        alert('Erro ao carregar pagina !');
    }
}

function hideModal () {
    const modal = document.getElementById('modal');
    modal.style.visibility = 'hidden';
}


function convertStatus(status) {
  const statusMap = {
    Alive: 'Vivo',
    Dead: 'Morto',
    unknown: 'Desconhecido'
  };
  return statusMap[status] || status;
}

function convertSpecies(species) {
  const speciesMap = {
    Human: 'Humano',
    Alien: 'Alienígena'
  };
  return speciesMap[species] || species;
}

function convertGender(gender) {
  const genderMap = {
    Male: 'Masculino',
    Female: 'Feminino',
    unknown: 'Desconhecido',
    Genderless: 'Sem gênero'
  };
  return genderMap[gender] || gender;
}


