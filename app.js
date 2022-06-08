console.log("Page Loaded");

const api_key = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC";
const limit = 9;
const rating = 'g';
let pageNumber = 0;
let movePage = 0;


const resultButton = document.querySelector("#clicker");
let resultSearch = document.querySelector("#result");
const showMoreResults = document.querySelector("#showMore");

let searchTerm = document.querySelector("#searchTerm");


async function getResults(){
    console.log("get results reached");

    console.log(searchTerm);
    pageNumber += 1;
    console.log("page number: " + pageNumber);


    let apiUrl =`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm.value}&limit=9&offset=${movePage}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.data;
    console.log("response is: ", response);
    console.log("responseData is: ", responseData);
    console.log("data is: ", data)
    
    displayResults(data);
    showMoreResults.classList.remove("hidden");
    showMoreResults.addEventListener('click', (e) => {
        e.preventDefault()
        showMore(data);});
}

function displayResults(data){
    console.log(data[0].images.original.url);
    resultSearch.innerHTML = "";
    data.forEach((gif,index) => {
        resultSearch.innerHTML += ` 
        <img src = "${data[index].images.original.url}" alt = "Images">
    `
    });
}

function showMore(data){
    movePage = pageNumber * limit;
    getResults();
}

//resultButton.addEventListener('click', (e) => {
   // e.preventDefault()
    //getResults();});

window.onload = function(){
    resultButton.addEventListener('click', (e) => {
        e.preventDefault()
        getResults();});
}


