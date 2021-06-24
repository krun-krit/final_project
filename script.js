var outputTBody = document.getElementById('outputTBody')

function showAllAnime(title){
  fetch(`https://api.jikan.moe/v3/search/anime?q=${title}`)
  .then((response) => {
      return response.json()
  }).then ((anime) => {
      addAnimeList(anime.results)
      outputTBody.style.display = 'block'
  })
}

function onLoad(){
  // showAllAnime()
}

function clicky(){
  let search = document.getElementById('search').value
  showAllAnime(search)
}

function addAnimeToTable(anime){
  const tBody = document.getElementById('tBody')
  let display = document.createElement('div')
  display.classList.add("card")
  display.classList.add("col-3")
  let img = document.createElement('img')
  img.setAttribute('src', anime.image_url)
  img.classList.add('img-thumbnail')
  img.height = 200
  img.width = 150
  img.addEventListener('click', function(){
    let confirmMsg = confirm(`Do you want add ${anime.title} to your favorit list?`)
    if(confirmMsg){
        addAni(anime)
    }
  })
  display.appendChild(img)

  let displayBody = document.createElement('div')
  let title = document.createElement('h5')
  title.innerHTML = anime.title
  let detail = document.createElement('p')
  detail.innerHTML = anime.synopsis
  displayBody.appendChild(title)
  displayBody.appendChild(detail)
  display.appendChild(displayBody)
  tBody.appendChild(display)
}

function addAnimeList(animeList){
  tBody.innerHTML = ''
  for (anime of animeList){
      addAnimeToTable(anime) 
  }
}


function addAni(anime){
  let id = {}
  id.id = 632110362
  id.movie = anime
  console.log(id)
  fetch('https://se104-project-backend.du.r.appspot.com/movies', {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(id)
  }).then(response => {
    if(response.status === 200){
        return response.json()
    }else{
        throw Error(response.statusText)    
    }
  }).then(data => {
    console.log('success', data)
    showAllAnime()
  })
}

function showFavList(anime){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/632110362')
    .then((response) => {
        return response.json()
    }).then ((anime) => {
        console.log(anime)
        addAnimeListFav(anime)
    })
}

function addAnimeListFav(animeListFav){
  favList.innerHTML = ''
  for (animeFav of animeListFav){
      addAniFavToDB(animeFav) 
  }
}

function addAniFavToDB(anime){
  const favList = document.getElementById('favList')
  let disFav = document.createElement('div')
  disFav.classList.add("card")
  disFav.classList.add("col-3")
  let img = document.createElement('img')
  img.setAttribute('src', anime.image_url)
  img.classList.add('img-thumbnail')
  img.height = 200
  img.width = 150
  disFav.appendChild(img)

  let disFavBody = document.createElement('div')
  let titleFav = document.createElement('h5')
  titleFav.innerHTML = anime.title
  let detailFav = document.createElement('p')
  detailFav.innerHTML = anime.synopsis
  disFavBody.appendChild(titleFav)
  disFavBody.appendChild(detailFav)
  disFav.appendChild(disFavBody)
  favList.appendChild(disFav)
}

var favList = document.getElementById('favList')

function hideAllList(){
  outputTBody.style.display = 'none'
}



document.getElementById('favoriteAni').addEventListener('click', (event) =>{
  hideAllList()
  showFavList()
})

function deleteAnime(id){
  fetch('https://se104-project-backend.du.r.appspot.com/movies/632110362',{
    method: 'DELETE'
  }).then(response => {
    if(response.status === 200){
      return response.json()
    }else{
      throw Error(response.statusText)
    }
  }).then(data => {
    alert('Do you want to delete this anime out of your list')
    showAllAnime()
  }).catch(error =>{
    alert('Your input student id is not in the database')
  })
}