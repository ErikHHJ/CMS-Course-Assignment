const clickDiv = document.querySelector(".plusclick");
const clickDiv2 = document.querySelector(".minusclick");
const quantity = document.querySelector(".productquantity");
const totalCost = document.querySelector(".topay");

let x = 1
let y = 70



clickDiv.onclick = () => {
    x += 1;
    quantity.innerHTML = x
    y += 70
    totalCost.innerHTML = `$${y}`

}
clickDiv2.onclick = () => {
    if(x < 2) {
        return
    } else {
        x -= 1;
    quantity.innerHTML = x
    y -= 70
    totalCost.innerHTML = `$${y}`
    }
}