//fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res){console.log(res)})// link do IBGE para bsca dos estados e cidades
//o fetch("") ele promete que vai no site e retorna seja com os dados ou nao 
//fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function(res){console.log(res.json())})

function populateUFs(){
    const ufSelect = document.querySelector("select[name = uf]")
    

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then(states => {

        for (const state of states){
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`// minha tag html option que vou trabalhar e pegando os nomes dos estados 
        }
    })
}


populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name = city]")
    const stateInput = document.querySelector("input[name = state]")

    //console.log(event.target.value)
    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`//link IBGE corresponde a municipios
    
    //limpa o campo  apos selecionar um pais e recomessa pedindo pra escolher um cidade
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then(cities => {
        //em option value city nome = mostrar nome se for id = mostrar codigo id
        //para poder salvar o nome ou id no banco de dados

        for (const city of cities){
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`// minha tag html option que vou trabalhar e pegando os nomes dos estados 
        }

        citySelect.disabled = false

    })
}


 
document
    .querySelector("select[name = uf]")//entrando no documento em select e na parte name = uf para trabalhar nela
    .addEventListener("change", getCities)


//items de coleta
//pegar todos os li = listats
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect){
item.addEventListener("click", handleSelecteditem)
}


const collectedItems = document.querySelector("input[name = items]") //atualizar o campo escondido com os itens selecionados 1.1

let selectedItems = []// itens selecionados recebe vasio

function handleSelecteditem(){
    const itemLi = event.target // itemLi = items listas de items de coleta

    //adicionar ou remover uma classe em java 
    itemLi.classList.toggle("selected") //toggle("selected") = adcionar ou remover,  remove("selected"), ou add("selected") add ou remove ou toggle uma class
 //toggle("selected") = click no item se tiver selecionado ele remove a seleçao se nao ele adciona permitindo selecionar varios items e remover 
    const itemId = itemLi.dataset.id //dataset-id = o id dos items de coleta ele esta pegando o id do item selecionado

    
//verificar se existem itens selecionados, se sim
//pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId// retorna true ou false comparando o imtem com o iditem
        return itemFound
    })


//se ja estiver selecionado, tirar da selaçao
    if (alreadySelected >= 0){
        //tirar da seleçao
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId//false
            return itemIsDifferent
        })


        selectedItems = filteredItems
    }else{
        //se nao estiver selecionado, adicionar a seleçao
        //adicionar a seleçao
        selectedItems.push(itemId)
    }

//atualizar o campo escondido com os itens selecionados 1.2
    collectedItems.value = selectedItems

}