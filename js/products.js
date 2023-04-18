const url = "https://hjulstad.one/cms/wp-json/wc/store/products";
const container = document.querySelector(".main");
const loader = document.querySelector("#loading");

export const displayLoading = () => {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
};
export const hideLoading = () => {
  loader.classList.remove("display");
};

const getData = async () => {
  displayLoading();
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const results = await res.json();
    hideLoading();
    console.log(results)

    for (let i = 0; i < results.length; i++) {
      const obj = results[i];
      if(obj.on_sale === true) {
        continue
      }
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML += `
          <a href="jacketspecific.html?id=${obj.id}"><img class="ProductImg" src="${obj.images[0].thumbnail}" alt="${obj.images[0].alt}"></a>
          <h2>${obj.name}</h2><br>
          <button class="buynowbtn"><a href="./Checkout.html">Buy Now</a></button>
          <h3>${obj.prices.price / 100 + "kr"}</h3>`;
      container.appendChild(card);

      
    }
    const featured = document.querySelector(".featured");
    for (let i = 0; i < results.length; i++) {
      const obj = results[i];
      if (obj.on_sale === false) {
        continue
      }
      featured.innerHTML = `<div><h2>Featured Product:</h2><a href="jacketspecific.html?id=${obj.id}"><img class="ProductImg" src="${obj.images[0].thumbnail}" alt="${obj.images[0].alt}"></a>
      <h2>${obj.name}</h2><br><button class="buynowbtn"><a href="./Checkout.html">Buy Now</a></button>
      <h3><span class="oldprice">${obj.prices.regular_price / 100 + "kr"}</span> ${obj.prices.sale_price / 100 + "kr"}</h3>;
      </div>`
    }
  } catch (error) {
    console.log(error);
    const errorDiv = document.querySelector(".errorDiv");
    if (errorDiv) {
      const errorMsg = document.createElement("h2");
      errorMsg.classList.add("error");
      errorMsg.innerHTML =
        "An error occurred while fetching data, sorry for the inconvenience.";
      errorDiv.appendChild(errorMsg);
    }
  }
};
getData();
    
    
    