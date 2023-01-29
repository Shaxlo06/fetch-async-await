let container = document.querySelector(".container")
let form = document.querySelector(".form")
let input = document.querySelector(".input")
let temp = document.querySelector(".template").content.cloneNode(true)
let fragment = document.createDocumentFragment()
let card = document.querySelector(".card")
let cardTitle = temp.querySelector(".card-title")
let cardTitleSub = temp.querySelector(".card-title-sub")
let cardSubTitle = temp.querySelector(".card-desc1")
let example1 = temp.querySelector(".example1")
let example2 = temp.querySelector(".example2")

let icon = temp.querySelector(".icon-play")
let audio = temp.querySelector("audio")

const getInputValue = (event) => {
    event.preventDefault()
    let searchText = input.value
    console.log(searchText);
    fetchAllDictionary(searchText)
}
form.addEventListener("submit", getInputValue)

const fetchAllDictionary = async(searchText) => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        
        if(data.word = searchText){
            showSearchedText(data)
           
        };
        
    }catch(err){console.log(err)}
}

const showSearchedText = (data)=> {
    data.forEach(word => {
            cardTitle.innerText = word.word
            cardTitleSub.innerText = word.phonetic
            let mean = word.meanings
            mean.map(ext => {
                let def = ext.definitions
                console.log(def);
                def.map(defs => {
                    cardSubTitle.innerText = defs?.definition
                    
                        example1.innerText = defs.example
                    console.log(defs.definition);
                    console.log(defs.example);
                })
            })
            
            icon.addEventListener("click", (evt)=> {
                evt.preventDefault()
                
                let sound = word.phonetics
                sound.forEach(sound => {
                    audio.src = sound.audio
                    audio.play()
                    console.log(audio);
                })
            })

        fragment.appendChild(temp)
        container.appendChild(fragment)
    });
    
     
}



