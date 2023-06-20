//For Ratings

for (let i = 1; i <= 100; i++) {

    const style = document.createElement("style");
    style.textContent =  `@keyframes rating${i} {
        from {width: 0px;}
        to {width: ${i}%;}
    }
    
    .rating${i} {
        width: ${i}%;
        animation: rating${i} 2s;
    }
    `
    document.head.appendChild(style);
}

const products = [
    {
        id: "T9ExM5sNwm",
        imageSource: '../ITE Responsive/images/products/astronaut.png',
        price: 2900,
        name: '"Stellar Expedition: Astronaut Adventures"',
        ratings: '3.5/5',
        goodRating: `${Math.round( (3.5/5) * 100) }%`,
        badRating: `${Math.round( (1.5/5) * 100) }%`,
        goodRatingPercent: `rating${Math.round( (3.5/5) * 100) }`,
        badRatingPercent: `rating${Math.round( (1.5/5) * 100) }`

    },

    {
        id: "2MneaOcMAJ",
        imageSource: '../ITE Responsive/images/products/positive.png',
        price: 2500,
        name: '"Positivity Parade"',
        ratings: '4.0/5',
        goodRating: `${Math.round( (4/5) * 100) }%`,
        badRating: `${Math.round( (1/5) * 100) }%`,
        goodRatingPercent: `rating${Math.round( (4/5) * 100) }`,
        badRatingPercent: `rating${Math.round( (1/5) * 100) }`

    },

    {
        id: "g8Qu02a3Rx",
        imageSource: '../ITE Responsive/images/products/hope.png',
        price: 2800,
        name: '"Hopeful Horizons"',
        ratings: '4.3/5',
        goodRating: `${Math.round( (4.3/5) * 100) }%`,
        badRating: `${Math.round( (0.7/5) * 100) }%`,
        goodRatingPercent: `rating${Math.round( (4.3/5) * 100) }`,
        badRatingPercent: `rating${Math.round( (0.7/5) * 100) }`

    },

    {
        id: "z9bgDPov9z",
        imageSource: '../ITE Responsive/images/products/newyork.png',
        price: 2200,
        name: '"Enjoy NYC Vibes"',
        ratings: '4.1/5',
        goodRating: `${Math.round( (4.1/5) * 100) }%`,
        badRating: `${Math.round( (0.9/5) * 100) }%`,
        goodRatingPercent: `rating${Math.round( (4.1/5) * 100) }`,
        badRatingPercent: `rating${Math.round( (0.9/5) * 100) }`

    },

    {
        id: "SeW9WXffQu",
        imageSource: '../ITE Responsive/images/products/nvg.png',
        price: 2350,
        name: '"Unyielding Spirit: Never Give Up"',
        ratings: '4.1/5',
        goodRating: '82%',
        badRating: '18%',
        goodRatingPercent: 'rating82',
        badRatingPercent: 'rating18'

    },
];


let productsHTML = "";

products.forEach( (products) => {

    productsHTML += ` 
    
    <div class = "product-container">
    <div class = "product-picture">
            <img src = "${products.imageSource}">

            <p class = "price">$ ${(products.price/100).toFixed(2)}</p>
    </div>

        

    <div class = "product-name ">
        <p>${products.name}</p>
    </div>

    <div class = "product-quantity">
    <p>Quantity: </p>
        <select class = "js-quantity-value-${products.id}">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
    </div>

    <div class = "product-ratings">
        <p class = "ratings-details">Ratings: <strong>${products.ratings}</strong></p>

            <div class = "ratings-bar">
                <div class = "good-rating ${products.goodRatingPercent}">
                    <div class = "good-rating-percent-div"><p class = "good-rating-percent" >${products.goodRating}</p></div>
                </div>

                <div class = "bad-rating ${products.badRatingPercent}">
                    <div class = "bad-rating-percent-div"><p class = "bad-rating-percent">${products.badRating}</p></div>
                    
                </div>

            </div>
    </div>

    <div class = "product-added js-additem-${products.id}">
        <p>Added to Cart</p>
    </div>

    <div class = "product-addbutton">
        <button class = "js-addtocartButton" data-product-name = ${products.name} data-product-id = ${products.id}>Add to Cart</button>
    </div>
</div>`

} );

document.querySelector(".product-maincontainer").innerHTML = productsHTML;

//For Add to Cart Button

//Array for My Cart
const addToCartItems = [];
const addtocartButton = document.querySelectorAll(".js-addtocartButton");
const productAdded = document.querySelector(".product-added");
let counter = 0;

addtocartButton.forEach( (button) => {

    let quantityValue = document.querySelector(`.js-quantity-value-${products[counter].id}`);
    let addedNotif = document.querySelector(`.js-additem-${products[counter].id}`);

    button.addEventListener("click", () => {

        
        addToCartItems.push({
            productName: button.dataset.productName,
            productId: button.dataset.productId,
            quantity: Number(quantityValue.value)
            })

            quantityValue.value = 1;

            addedNotif.style.opacity = "1";

            setTimeout( () => {
                addedNotif.style.opacity = "0";
            }, 2000)
        }) 
    counter++;
    } 
);
