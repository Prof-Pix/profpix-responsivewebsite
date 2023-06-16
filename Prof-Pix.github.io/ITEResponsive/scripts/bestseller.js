const bestsellerProds = [
    {
    imageDesign: 'images/strong.png',
    productName: '"Everytime Strong: Unleashing the Power Within"',
    priceCents: 2600,
    },

    {
        imageDesign: 'images/be-brave.png',
        productName: '"Courageous Spirit: Be Brave, Everytime Strong"',
        priceCents: 3300,
    },

    {
        imageDesign: 'images/moving-forward.png',
        productName: '"Unstoppable: Just Keep Moving Forward"',
        priceCents: 3500,
    },

    {
        imageDesign: 'images/everything-better.png',
        productName: '"Everything Better When We&#39;re Together"',
        priceCents: 2800,
    },

    {
        imageDesign: 'images/dream.png',
        productName: '"Dream Weaver: Chasing the Unimaginable"',
        priceCents: 2300,
    },

    {
        imageDesign: 'images/shine.png',
        productName: '"Radiant Brilliance: Let Your Light Shine"',
        priceCents: 2800,
    }

];

let bestProductsHTML = '';

bestsellerProds.forEach( (bestProducts) => {
   bestProductsHTML += `<div class = "bestseller-outerdiv">
        <div class = "bestseller-design">
            <img src = "${bestProducts.imageDesign}">
        </div>


        <div class = "bestseller-productname">
            ${bestProducts.productName}
        </div>

        <div class = "bestseller-price">
            <b>$${(bestProducts.priceCents/100).toFixed(2)}</b> 
        </div>
    </div>`
} );

document.querySelector(".bestseller-products").innerHTML = bestProductsHTML;

