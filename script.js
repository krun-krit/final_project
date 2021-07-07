var outputTBody = document.getElementById('outputTBody')
var outputFav = document.getElementById('outputFav')
var aniDetail = document.getElementById('aniDetail')
var carouselExampleIndicators = document.getElementById('carouselExampleIndicators')


function showAllAnime(title){
  fetch(`https://api.jikan.moe/v3/search/anime?q=${title}`)
  .then((response) => {
      return response.json()
  }).then ((anime) => {
      addAnimeList(anime.results)
      hideAll()
      outputTBody.style.display = 'block'
  })
}

function clicky(){
  let search = document.getElementById('search').value
  showAllAnime(search)
}

function addAnimeToTable(anime){
  const tBody = document.getElementById('tBody')
  let display = document.createElement('div')
  let img = document.createElement('img')
  img.setAttribute('src', anime.image_url)
  img.classList.add('img-thumbnail')
  img.height = 200
  img.width = 150

  // let displayBody = document.createElement('div')
  let title = document.createElement('h5')
  title.innerHTML = anime.title
  let detail = document.createElement('p')
  detail.innerHTML = anime.synopsis
  let buttonAdd = document.createElement('button')
  buttonAdd.classList.add('btn')
  buttonAdd.classList.add('btn-outline-success')
  buttonAdd.setAttribute('type', 'button')
  buttonAdd.innerText = 'ADD'
  buttonAdd.addEventListener('click', function() {
    let confirmMsg = confirm(`Do you want add ${anime.title} to your favorit list?`)
    if(confirmMsg){
        addAni(anime)
    }
  })
  display.appendChild(img)
  display.appendChild(title)
  display.appendChild(detail)
  display.appendChild(buttonAdd)
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
  disFav.classList.add("col")
  disFav.classList.add("card")
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
  buttonDel.classList.add('btn-outline-danger')
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
  buttonDetail.classList.add('btn-outline-success')
  buttonDetail.setAttribute('type', 'button')
  buttonDetail.innerText = 'Detail'
  buttonDetail.addEventListener('click', function(){
      showDC(animeFav)

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
  aniDetail.style.display = 'none'
  carouselExampleIndicators.style.display = 'none'
}


document.getElementById('favoriteAni').addEventListener('click', (event) =>{
  showFavList()
})

function deleteAnime(id){
  fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110362&&movieId=${id.id}`,{
    method: 'DELETE'
  }).then(response => {
    if(response.status === 200){
      return response.json()
    }else{
      throw Error(response.statusText)
    }
  }).then(data => {
    alert('Now we delete this anime.')
    showFavList()
  }).catch(error =>{
    alert('Your input student id is not in the database')
  })
}

function showDC(shoAni){
  fetch(`https://se104-project-backend.du.r.appspot.com/movie/632110362/${shoAni.id}`)
  .then(response => {
    return response.json()
}).then (data => {
    aniDetail.innerHTML = ''
    hideAll()
    addShoAni(data)
    aniDetail.style.display = 'block'
})
}

function addShoAni(aniDe){
  const aniDetail = document.getElementById('aniDetail')
  let disDetail = document.createElement('row')
  let img = document.createElement('img')
  img.setAttribute('src', aniDe.image_url)
  img.classList.add('img-thumbnail')
  img.height = 200
  img.width = 150

  let deBody = document.createElement('div')
  let titleDe = document.createElement('h3')
  titleDe.innerHTML = aniDe.title
  let detailName = document.createElement('h4')
  detailName.innerText = "Synopsis :"
  let detailDe = document.createElement('p')
  detailDe.innerHTML = aniDe.synopsis
  let typeName = document.createElement('h4')
  typeName.innerText = "Type :"
  let typeDe = document.createElement('p')
  typeDe.innerHTML = aniDe.type
  let epName = document.createElement('h4')
  epName.innerText = "Episodes :"
  let epDe = document.createElement('p')
  epDe.innerHTML = aniDe.episodes
  let scName = document.createElement('h4')
  scName.innerText = "Scores :"
  let scDe = document.createElement('p')
  scDe.innerHTML = aniDe.score
  let ratedName = document.createElement('h4')
  ratedName.innerText = "Rated :"
  let ratedDe = document.createElement('p')
  ratedDe.innerHTML = aniDe.rated
  
  let buttonBack = document.createElement('td')
  buttonBack.classList.add('btn')
  buttonBack.classList.add('btn-outline-secondary')
  buttonBack.setAttribute('type', 'button')
  buttonBack.innerText = 'BACK'
  buttonBack.addEventListener('click', function(){
      showFavList()

  })

  deBody.appendChild(typeName)
  deBody.appendChild(titleDe)
  deBody.appendChild(detailName)
  deBody.appendChild(detailDe)
  deBody.appendChild(typeName)
  deBody.appendChild(typeDe)
  deBody.appendChild(epName)
  deBody.appendChild(epDe)
  deBody.appendChild(scName)
  deBody.appendChild(scDe)
  deBody.appendChild(ratedName)
  deBody.appendChild(ratedDe)
  deBody.appendChild(buttonBack)
  
  aniDetail.appendChild(img)
  aniDetail.appendChild(deBody)

}





