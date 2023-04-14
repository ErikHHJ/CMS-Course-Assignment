import { displayLoading , hideLoading } from "./products.js";
const grid = document.querySelector(".grid");
const loader = document.querySelector("#loading");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://hjulstad.one/cms/wp-json/wc/store/products/" + id;

const specificRender = async () => {
    displayLoading()
    try {
        const res = await fetch(url);
        const results = await res.json();
        hideLoading()
        
        
        grid.innerHTML += `
        <div class="venstre"><img src="${results.images[0].thumbnail}" class="jacketimg" alt="${results.images[0].alt}"> <h2 class="colour"><span class="bold">Colour</span> - Only (1) Available</div>
        <div class="høyre"><h1>${results.name}</h1>
                <p class="description">${results.description}
                      </p></div>
        `


    } catch(error){
        const errorDiv = document.createElement("div");
        const errorMsg = document.createElement("h2");
        errorMsg.classList.add("error");
        errorMsg.innerHTML = "An error occurred while fetching data, sorry for the inconvenience. <br> Note: This page will only display detailed statistics if an item was clicked on home page.";
        errorDiv.appendChild(errorMsg);
        grid.appendChild(errorDiv)
    }
}
specificRender();