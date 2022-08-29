const mountains = './mountains.json';
const searchFilter = document.querySelector('.filter__search-input');
const sortFilter = document.querySelector('.filter__sort');
const montainContainer = document.querySelector('.table');

function populateMountains(mountainList){    
    montainContainer.innerHTML = '';
    montainContainer && mountainList.forEach(mountain => {
        const {img, title, description } = mountain;
        montainContainer.innerHTML +=`
            <article class="table__content">
                <div class="table__image"><img class="table__image-container" src="../img/${img}.svg"></div>
                <h1 class="table__title">${title}</h1>
                <p class="table__description">${description}</p>
            </article>
        `
    });
}
async function fetchJSON(targetJSON, filter){
    const request = new Request(targetJSON);
    const response = await fetch(request);
    let result = await response.json();
    if(filter === ''){
        populateMountains(result);
        return;
    }
    else if(filter === 'search'){
        const filter = searchFilter.value.toLowerCase();
        result = result.filter(result => result.title.toLowerCase().match(filter))        
        if(result.length === 0){
            montainContainer.innerHTML = `<h1 class="table__empty">"${searchFilter.value}" not found</h1>`
            return;
        }
        populateMountains(result);
        return;
    }
    else if(filter === 'sort'){

        const sort = sortFilter.value;

        if(sort==='aazz'){
            populateMountains(result);
            return;
        }

        result = result.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

        if(sort=='za'){result = result.reverse()}

        populateMountains(result);
        return;
    }
}

fetchJSON(mountains, '');

searchFilter && searchFilter.addEventListener('keyup' , function(event){    
    if(event.key === 'Enter'){
        fetchJSON(mountains, 'search');
    }    
});
sortFilter && sortFilter.addEventListener('change' , function(event){        
        fetchJSON(mountains, 'sort');
});
function filter(e,type){    
    if(type === 'search'){
        console.log(searchFilter.value);
    }
}