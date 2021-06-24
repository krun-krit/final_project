function showAllAnime(title){
  fetch(`https://api.jikan.moe/v3/search/anime?q=${title}`)
  .then((response) => {
      return response.json()
  }).then ((anime) => {
      console.log(anime.results)
      addAnimeList(anime.results)
  })
}

function onLoad(){
  // showAllAnime()
}

function clicky(){
  let search = document.getElementById('search').value
  console.log(search)
  showAllAnime(search)
}

function addAnimeToTable(anime){
  const tBody = document.getElementById('tBody')
  let display = document.createElement('div')
  display.classList.add("card")
  let img = document.createElement('img')
  img.setAttribute('src', anime.image_url)
  img.height = 200
  img.width = 150
  img.addEventListener('click', function(){
    let confirmMsg = confrim(`Do you want add ${title} to your favorit list? `)
    if(confirmMsg){
        console.log(anime.results)
    }
  })
  display.appendChild(img)

  let displayBody = document.createElement('div')
  let title = document.createElement('h5')
  title.innerHTML = anime.title
  displayBody.appendChild(title)
  display.appendChild(displayBody)
  tBody.appendChild(display)
}

function addAnimeList(animeList){
  for (anime of animeList){
      addAnimeToTable(anime) 
  }
}