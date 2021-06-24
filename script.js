var outputTBody = document.getElementById('outputTBody')
var outputFav = document.getElementById('outputFav')

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
    hideAll()
    showFavList()
    outputFav.style.display = 'block'
  })
}

function showFavList(){
    fetch('https://se104-project-backend.du.r.appspot.com/movies/632110362')
    .then((response) => {
        return response.json()
    }).then ((anime) => {
        hideAll()
        addAnimeListFav(anime)
        outputFav.style.display = 'block'
    })
}

function addAnimeListFav(animeListFav){
  favList.innerHTML = ''
  for (animeFav of animeListFav){
      addAniFavToDB(animeFav) 
  }
}

function addAniFavToDB(animeFav){
  const favList = document.getElementById('favList')
  let disFav = document.createElement('div')
  disFav.classList.add("card")
  disFav.classList.add("col-3")
  let img = document.createElement('img')
  img.setAttribute('src', animeFav.image_url)
  img.classList.add('img-thumbnail')
  img.height = 200
  img.width = 150

  let disFavBody = document.createElement('div')
  let titleFav = document.createElement('h5')
  titleFav.innerHTML = animeFav.title
  let detailFav = document.createElement('p')
  detailFav.innerHTML = animeFav.synopsis
  disFavBody.appendChild(titleFav)
  disFavBody.appendChild(detailFav)
  disFav = document.createElement('td')
  let buttonDel = document.createElement('button')
  buttonDel.classList.add('btn')
  buttonDel.classList.add('btn-danger')
  buttonDel.setAttribute('type', 'button')
  buttonDel.innerText = 'Delete'
  buttonDel.addEventListener('click', function() {
    let confirmMsg = confirm('Do you want to delete this anime')
    if(confirmMsg){
          deleteAnime(animeFav)
      }
  })
  let buttonDetail = document.createElement('td')
  buttonDetail.classList.add('btn')
  buttonDetail.classList.add('btn-success')
  buttonDetail.setAttribute('type', 'button')
  buttonDetail.innerText = 'Detail'
  buttonDetail.addEventListener('click', function(){
      hideAll()
      showDC()

  })
  disFav.appendChild(img)
  disFavBody.appendChild(buttonDetail)
  disFavBody.appendChild(buttonDel)
  disFav.appendChild(disFavBody)
  favList.appendChild(disFav)
}


function hideAll(){
  outputTBody.style.display = 'none'
  outputFav.style.display = 'none'
}


document.getElementById('favoriteAni').addEventListener('click', (event) =>{
  showFavList()
})

function deleteAnime(id){
  console.log(id.title)
  fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110362&&movieId=${id.id}`,{
    method: 'DELETE'
  }).then(response => {
    if(response.status === 200){
      return response.json()
    }else{
      throw Error(response.statusText)
    }
  }).then(data => {
    alert('Now we delet this anime.')
    showFavList()
  }).catch(error =>{
    alert('Your input student id is not in the database')
  })
}

function showDC(shoAni){
  fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110362/${shoAni}`)
  .then((response) => {
    return response.json()
}).then ((shoAni) => {
    addShoAni(shoAni)
})
}

function addShoAni(AniDe){
  const aniDetail = document.getElementById('aniDetail')
  let disDetail = document.createElement('div')
  let img = document.createElement('img')
  img.setAttribute('src', aniDe.image_url)
  img.classList.add('img-thumbnail')
  img.height = 200
  img.width = 150

  let deBody = document.createElement('div')
  let titleDe = document.createElement('h4')
  titleDe.innerHTML = aniDe.title
  let detailDe = document.createElement('p')
  detailDe.innerHTML = aniDe.synopsis
  deBody.appendChild(titleDe)
  deBody.appendChild(detailDe)
  aniDetail.appendChild(img)
  aniDetail.appendChild(deBody)

}
