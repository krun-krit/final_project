var tBody = document.getElementById('tBody')

function showAllAnime(title){
  fetch(`https://api.jikan.moe/v3/search/anime?q=${title}`)
  .then((response) => {
      return response.json()
  }).then ((anime) => {
      addAnimeList(anime.results)
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
  img.height = 200
  img.width = 150
  // img.addEventListener('click', function(){
  //   let confirmMsg = confrim(`Do you want add ${title} to your favorit list? `)
  //   if(confirmMsg){
  //       console.log(anime.results)
  //   }
  // })
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