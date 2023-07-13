import { addToCartItems as checkoutAddtoCartItems } from "./checkout.js";

let orderedItems = JSON.parse(localStorage.getItem("OrderedItems")) || [];

let orderCombinedDetailsHTML = ""; // This will contain the combined HTML for the order
let orderFinalHTML = "";

let orderHeaderHTML = "";
let orderDetailsHTML = "";

let CartSummary = JSON.parse(localStorage.getItem("cartSummary")) || [];

const orderId = JSON.parse(localStorage.getItem("OrderId")) || [];

function distributeGeneratedOrderId() {

    for (let i = 0; i < orderedItems.length; i++) {

        if (!orderId[i]) {

            const orderIdofItem = generateOrderId(36);
             
            orderId[i] = orderIdofItem.toLowerCase();
            localStorage.setItem("OrderId", JSON.stringify(orderId));
        }
    }
}

function generateOrderId(length) {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let generatedOrderId = '';
  
    for (let i = 0; i < length; i++) {
        
        if (i == 8 || i == 13 || i == 18 || i == 23) {
            generatedOrderId += '-' ;
        }

        else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            const randomChar = characters.charAt(randomIndex);
            generatedOrderId += randomChar;
        }
      
    }
  
    return generatedOrderId;
}

if (orderedItems.length) {

    distributeGeneratedOrderId();
    orderedItems.forEach( (arrayOfItems, index1) => {
        orderHeaderHTML = `<div class = "order-placed-header">
    <div>
        <div class = "order-placed-header-container">
            <div class = "order-placed-header-title">
                <b>Order Placed:</b>
            </div>

            <div class = "order-placed-header-content">
                ${CartSummary[index1].datePlaced}
            </div>
        </div>
        
        <div class = "order-placed-header-container">
            <div class = "order-placed-header-title">
                <b>Total Cost:</b>
            </div>

            <div class = "order-placed-header-content">
                $${ (CartSummary[index1].finalTotalAmount / 100).toFixed(2)}
            </div>

        </div>
    </div>

    <div>
        <div class = "order-placed-header-title">
            <b>Order Id:</b>
        </div>
        
        <div class = "order-placed-header-content">
            ${orderId[index1]}
        </div>
    </div>
    </div>`

    arrayOfItems.forEach( (orderedItem , index) => {

        let ShippingFee; 

        if ((CartSummary[index1].newShippingSave[index]) == null) {
            ShippingFee = 0;
        }

        else {
            ShippingFee = (CartSummary[index1].newShippingSave[index]);
        }

        orderDetailsHTML += `
    <div>

        <div class = "order-imagecontainer">
            <img src = "${orderedItem.imageSource
            }">
        </div>

        <div class = "order-details">
            <div class = "order-details-name">
                ${orderedItem.checkoutName
                }
            </div>

            <div class = "order-details-price" >
                $<b>${ (orderedItem.checkoutPrice/100).toFixed(2)
                }</b>
            </div>

            <div class = "order-details-sf">
                Shipping Fee: $<b>${ (ShippingFee
                    /100).toFixed(2)
                }</b>
            </div>


            <div class = "order-details-quantity">
                Quantity: <b>${orderedItem.quantity
                }</b>
            </div>

            <div class = "order-details-deliverydate">
                Delivery Date: <b>${orderedItem.deliveryDate
                }</b>
            </div>

        </div>

        <div class = "buyagainbutton-container">
            <div>
                <button class = "buyitagain-button" data-product-id = ${orderedItem.checkoutId}><i class="fa-solid fa-repeat"></i> &nbsp; Buy it again</button>
            </div>
        </div>

    </div>
    `
    })


    orderCombinedDetailsHTML = `<div>
            ${orderHeaderHTML}         
            
            <div class = "order-details-container">
                    ${orderDetailsHTML}
                </div>
            

    </div>`

    orderFinalHTML += orderCombinedDetailsHTML;
    orderDetailsHTML = "";

    })

}
    else {
        orderFinalHTML = `<div class = "cart-empty">
        <div>
        Your order section is currently empty.
        </div>
        <div>
        <a href = "shop.html">View Products</a>
        </div>
    </div>`
    }

const OrderMainContainer = document.querySelector(".your-order-maincontainer");

OrderMainContainer.innerHTML = orderFinalHTML;

const BuyAgainButton = document.querySelectorAll(".buyitagain-button");

let isButtonBuyAgainClicked = false;
let intervalId;

BuyAgainButton.forEach ( (button) => {
    
    
    const productId = button.dataset.productId;
    
    orderedItems.forEach( (arrayOfItems) => {
        
        arrayOfItems.forEach( (item) => {
            
            if(item.checkoutId == productId) {
                
            button.addEventListener("click", () => {

                let repeatItem;

                checkoutAddtoCartItems.forEach( (item) => {

                    if(item.checkoutId == productId) {
                        repeatItem = item;
                    }
                })

                if (repeatItem) {
                    repeatItem.quantity += 1;
                }

                else if (!repeatItem) {
                    item.quantity = 1;
                    checkoutAddtoCartItems.push(item);
                }

                localStorage.setItem("ItemsAddedToCart", JSON.stringify(checkoutAddtoCartItems));

                button.innerHTML = `<i class="fa-solid fa-check"></i> Added to Cart!`;

                if (!isButtonBuyAgainClicked) {
                

                    intervalId = setTimeout( () => {
                        button.innerHTML = `<i class="fa-solid fa-repeat"></i> &nbsp; Buy it again`;
                    }, 1500)
    
                    isButtonBuyAgainClicked = true;
                }
    
                else {
                    clearInterval(intervalId);
                    intervalId = setTimeout( () => {
                        button.innerHTML = `<i class="fa-solid fa-repeat"></i> &nbsp; Buy it again`;
                        isButtonBuyAgainClicked = false;
                    }, 1500)
                }

                
                })
            }
        })

    })
}) 
