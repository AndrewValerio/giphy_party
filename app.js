console.log("Page Loaded");

const api_key = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC";
const limit = 3;
const rating = 'g';
let pageNumber = 0;


const resultButton = document.querySelector("#clicker");
let resultSearch = document.querySelector("#result");
const showMoreResults = document.querySelector("#showMore");

let searchTerm = document.querySelector("#searchTerm");
let prevSearch = "";


async function getResults(){
    console.log("get results reached");
    const offset = pageNumber * limit;

    console.log(searchTerm);
    console.log("page number: " + (pageNumber + 1));


    let apiUrl =`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchTerm.value}&limit=${limit}&offset=${offset}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.data;
    console.log("response is: ", response);
    console.log("responseData is: ", responseData);
    console.log("data is: ", data)
    if(prevSearch != searchTerm.value){
        pageNumber = 0;
        resultSearch.innerHTML = "";
        prevSearch = searchTerm;
    }
    displayResults(data);
    showMoreResults.classList.remove("hidden");
        pageNumber++;
    prevSearch = searchTerm.value;
}

function displayResults(data){
    console.log(data[0].images.original.url);
    data.forEach((gif,index) => {
        resultSearch.innerHTML += ` 
        <img src = "${data[index].images.original.url}" alt = "Images">
    `
    });
}


//resultButton.addEventListener('click', (e) => {
   // e.preventDefault()
    //getResults();});

window.onload = function(){
    resultButton.addEventListener('click', (e) => {
        e.preventDefault()
        getResults();});
        showMoreResults.addEventListener('click', (e) => {
            e.preventDefault()
            getResults();});
}


