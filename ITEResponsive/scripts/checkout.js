let linkActive = localStorage.getItem("activeLink");

    //This is the addtocartitems from Products JS, [Object]
    export let addToCartItems = JSON.parse(localStorage.getItem("ItemsAddedToCart")) || [];

    let newShippingSave = JSON.parse(localStorage.getItem("SavedShippingChoice")) || [];

    let isWindowRefreshed = false; // For the refresh of Shipping

let quantityHolder; //For the Items and Quantity Value in Checkout HTML

let totalOrderAmount;
let shippingTotalAmount = 0; // Value displayed in Shipping and Handling
let totalAndShippingAmount = 0; //value displayed in Total Before Tax
let estimatedTax;   //Value displayed in Estimated tax (10%)
let finalTotalAmountOfOrder;

let orderSummaryHTML;
let itemInCartHTML;

const orderedItems = JSON.parse(localStorage.getItem("OrderedItems")) || [];

const CartSummary = JSON.parse(localStorage.getItem("cartSummary")) || [];

//For Date Purpose 

    const currentDate = new Date();

    const currentPlacedDate = new Date(currentDate.getTime());
    const freeShippingDate = new Date(currentDate.getTime());
    const fourNineShippingDate = new Date(currentDate.getTime());
    const nineShippingDate = new Date(currentDate.getTime());;

    freeShippingDate.setDate(freeShippingDate.getDate() + 7);
    fourNineShippingDate.setDate(fourNineShippingDate.getDate() + 4);
    nineShippingDate.setDate(nineShippingDate.getDate() + 2);

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  const formattedcurrentPlacedDate = dateFormatter.format(currentPlacedDate);
  const formattedfreeShippingDate = dateFormatter.format(freeShippingDate);
  const formattedfourNineShippingDate = dateFormatter.format(fourNineShippingDate);
  const formattednineShippingDate = dateFormatter.format(nineShippingDate);

  const encodedfreeShippingDate = formattedfreeShippingDate.replace(/ /g, "_");
  const encodedfourNineShippingDate = formattedfourNineShippingDate.replace(/ /g, "_");
  const encodednineShippingDate = formattednineShippingDate.replace(/ /g, "_");

function quantityInCart() {

    orderSummaryHTML = '';
    itemInCartHTML = '';

    const reviewTitle = document.querySelector(".reviewyourorder-title");
    const checkOutQuan = document.querySelector(".checkout-items-quantity");
    const itemQuan = document.querySelector(".items-quantity");

    quantityHolder = 0;

    if (addToCartItems.length) {

        addToCartItems.forEach( (item) => {
            quantityHolder += item.quantity;
        })

        checkOutQuan.innerHTML = quantityHolder;

        //For Calculations of Price 
        totalOrderAmount = 0; // Price displayed on the items
        addToCartItems.forEach( (item) => {

            itemInCartHTML += `<div class = "itemincart">
                        <div class = "itemincart-deliverydate deliveryDate-${item.checkoutId}">
                            Delivery date: Friday, June 30
                        </div>
                            
                                <div class = "itemincart-details">
                                    <div class = "itemincart-imagecontainer">
                                        <img src = "${item.imageSource}">
                                    </div>

                                    <div>
                                        <div class = "itemincart-name">
                                            <p>${item.checkoutName}</p>
                                        </div>

                                        <div class = "itemincart-price">
                                            $${ (item.checkoutPrice / 100).toFixed(2)}
                                        </div>

                                        <div class = "itemincart-quantity">
                                            <div class = "quantity-container ">
                                                Quantity: &nbsp; 
                                                <div class = "item-quantity" data-product-id = ${item.checkoutId
                                                }>${item.quantity}</div>
                                            </div>

                                            <div class = "item-quantity-container" data-product-id = ${item.checkoutId
                                            }>
                                                <div class = "update-quantity-container" data-product-id = ${item.checkoutId
                                                }>  
                                                    <div>
                                                        <input type="number" id="quantity" name="quantity" min="1" max="99" data-product-id = ${item.checkoutId
                                                        }>
                                                        <button class = "js-save-button" data-product-id = ${item.checkoutId
                                                        }><i class="fa-solid fa-floppy-disk"></i> Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class = "updatedelete-button-container">
                                                <div class = "itemincart-quantity-update">
                                                    <button class = "js-update-button" data-product-id = ${item.checkoutId
                                                    }> <i class="fa-solid fa-rotate"></i> Update Quantity</button>
                                                </div>

                                                <div class = "itemincart-quantity-delete">
                                                    <button class = "js-delete-button delete-button" data-product-id = ${item.checkoutId
                                                    }> <span id = "eks-button">&#10005;</span> Delete Item</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class = "itemincart-rightside">
                                        <div class = "itemincart-choosing-title">
                                            Choose a delivery option:
                                        </div>

                                        <div>
                                            <div class = "shippingoption">
                                                <div class = "shippinginput-button">
                                                    <input type="radio" id="shipping" name="shipping-option-${item.checkoutId
                                                    }" data-delivery-date = ${encodedfreeShippingDate} value = 0>
                                                </div>
                                                
                                                <div class = "shippinginput-button-details">
                                                    <label for="freeshipping"><b>${formattedfreeShippingDate}</b> <br> Free Shipping</label><br>
                                                </div>
                                            </div>

                                            <div class = "shippingoption">
                                                <div class = "shippinginput-button">
                                                    <input type="radio" id="shipping" name="shipping-option-${item.checkoutId
                                                    }" data-delivery-date = ${encodedfourNineShippingDate
                                                    } value = 499>
                                                </div>
                                                
                                                <div class = "shippinginput-button-details">
                                                    <label for="fourninenine"><b>${formattedfourNineShippingDate}</b> <br> $4.99 - Shipping</label><br>
                                                </div>
                                            </div>

                                            <div class = "shippingoption">
                                                <div class = "shippinginput-button">
                                                    <input type="radio" id="shipping" name="shipping-option-${item.checkoutId
                                                    }" data-delivery-date = ${encodednineShippingDate
                                                    } value = 999>
                                                </div>
                                                
                                                <div class = "shippinginput-button-details">
                                                    <label for="freeshipping"><b>${formattednineShippingDate}</b> <br> $9.99 - Shipping</label><br>
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>
                            </div>
                </div>`
        })
    }

    else {
        itemInCartHTML = `<div class = "additional-in-review">
        <div>
        Your cart is empty.
        </div>
        <div>
        <a href = "shop.html">View Products</a>
        </div>
    </div>`
    checkOutQuan.innerHTML = quantityHolder;
    }
        //For the List of Items in the Cart

        orderSummaryReset();

        const itemInCart = document.querySelector(".itemincart-list");
        itemInCart.innerHTML = itemInCartHTML;
    
}

function orderSummaryReset() {
    totalAndShippingAmount = totalOrderAmount + shippingTotalAmount;
    estimatedTax = ((totalAndShippingAmount) * 0.10); 
    finalTotalAmountOfOrder = totalAndShippingAmount + estimatedTax;

    //For the Part of the Order Summary 

    if (!addToCartItems.length) {
        totalOrderAmount = 0;
        estimatedTax = 0;
        totalAndShippingAmount = 0;
        shippingTotalAmount = 0;
        finalTotalAmountOfOrder = 0;
    }

    totalOrderAmount = 0;
    addToCartItems.forEach( (item) => {
        totalOrderAmount += Number(item.checkoutPrice * item.quantity);
    })


    orderSummaryHTML = `<div class = "order-summary-title">Order Summary</div>
    
    <div class = "items-details">
        <div class = "check-items-shipping">
            <div>
                Items(${quantityHolder}): 
            </div>

            <div>
                Shipping & Handling:
            </div>
        </div>
    
        <div class = "check-items-shipping-details">
            <div>
                $${ (totalOrderAmount / 100).toFixed(2)} 
            </div>
            <div>
                $${ (shippingTotalAmount / 100).toFixed(2)}
            </div>
        </div>
    </div>
    
    <div class = "items-details tax-details">
        <div class = "check-tax">
            <div>
                Total before tax: 
            </div>
            <div>
                Estimated Tax (10%):
            </div>
        </div>
    
        <div class = "check-tax-details">
            <div>
                $${ ( (totalAndShippingAmount) / 100).toFixed(2)}
            </div>
            <div>
                $${ (estimatedTax / 100).toFixed(2)}
            </div>
        </div>
    </div>
    
    
    <div class = "items-details total-order">
        <div>
            Order Total:  
        </div>
    
        <div>
            <span class = "item-order-total-price">$${ ( finalTotalAmountOfOrder / 100).toFixed(2)}</span>
        </div>
    </div>
    
        <div class = "order-button-container">
        <a href = "order.html"><button class = "placeyourorder-button">Place your order</button></a>
        </div>`

    const orderSummary = document.querySelector(".order-summary");
    orderSummary.innerHTML = orderSummaryHTML;

    const placeYourOrderButton = document.querySelector(".placeyourorder-button"); // For Place your order button
    placeYourOrderButton.addEventListener("click", () => {

        orderedItems.push(addToCartItems);
        
        CartSummary.push({
            datePlaced: formattedcurrentPlacedDate,
            finalTotalAmount: finalTotalAmountOfOrder, 
            newShippingSave
        });

        localStorage.setItem("cartSummary", JSON.stringify(CartSummary));
        localStorage.setItem("OrderedItems", JSON.stringify(orderedItems));
        localStorage.removeItem("ItemsAddedToCart");
        localStorage.removeItem("SavedShippingChoice");
    })


    // To make the Place your order button fade when no items are in the cart
    if (!addToCartItems.length) {
        const orderButton = document.querySelector(".order-button-container");
        orderButton.style.pointerEvents = "none";
        orderButton.style.opacity = "0.5"
    }
}



if (linkActive == 'checkout.html') {
    quantityInCart();
    deleteButtonAttach();
    UpdateButton();
    ShippingUpdate();
}

function deleteButtonAttach () {

    const deleteButton = document.querySelectorAll(".js-delete-button");

        deleteButton.forEach( (button) => {
            
            const productId = button.dataset.productId;

            button.addEventListener("click", () => {
            
                addToCartItems.forEach( (item, index) => {

                    if (item.checkoutId == productId) {
                        addToCartItems.splice(index, 1);
                        newShippingSave.splice(index, 1);
                        localStorage.setItem("SavedShippingChoice", JSON.stringify(newShippingSave))
                        localStorage.setItem("ItemsAddedToCart", JSON.stringify(addToCartItems));
                        quantityInCart();
                        deleteButtonAttach();
                        UpdateButton();
                        ShippingUpdate();
                    }
                });

            })
        } )

    }

function UpdateButton() {

    //For the Quantity
    const itemQuantity = document.querySelectorAll(".item-quantity");   //div that has the quantity value
    let quantityTemp; // Temporary Holder of the Quantity Value

    // For Update Button
    const updateButton = document.querySelectorAll(".js-update-button");    //all update buttons
    const itemQuantityContainer = document.querySelectorAll(".update-quantity-container");  //div on where to modify the quantity values

    //For Updating the Quantity 
    const saveUpdateQuanButton = document.querySelectorAll(".js-save-button");  //all save button
    const quantityUpdater = document.querySelectorAll("#quantity"); //all of the inputs

    updateButton.forEach( (button) => { //Loop through all update buttons
        const productId = button.dataset.productId; //get the update button dataset (productId)

        button.addEventListener("click", () => {    //Loop through all the update buttons

            itemQuantity.forEach( (div) => {   //This loop through all of the div that has the quantity of item
                if (productId == div.dataset.productId) {   //when found the right div
                    quantityTemp = div.innerHTML;   //get the innerHTML or the current value of the quantity
                    div.style.display = "none";     //make the div of quantity disappear

                    quantityUpdater.forEach( (input) => {   // this loops through on all of the inputs
                        if (productId == input.dataset.productId) { //when the right input was found
                            input.value = quantityTemp; //change its value to the innerHTML earlier
                        }
                    })
                }
            })

            itemQuantityContainer.forEach( (div) => {   //Loops through on all of the update buttons
                const divProdId = div.dataset.productId;    //get the dataset productId

                if (productId == divProdId) {   //If found, make the div or update disappear, and make the input appear
                    div.style.display = "block";
                    button.style.display = "none";

                    //Start
                    saveUpdateQuanButton.forEach( (button) => { //This loops through on all of the save button
                            const saveButtonproductId = button.dataset.productId;  
                    
                            button.addEventListener("click", () => {    //give each of this button an event
                    
                                quantityUpdater.forEach( (input) => {
                                    const inputproductId = input.dataset.productId;
                    
                                        if (saveButtonproductId == inputproductId) {    // if the input and save button matched,
                    
                                            addToCartItems.forEach( (item , index) => { //Loops through all the cart on items
                                                const productId = item.checkoutId;
                    
                                                    if (productId == inputproductId) {

                                                            if (input.value < 1 ) {  //don't allow amount below than 0;
                                                                addToCartItems.splice(index, 1);
                                                                newShippingSave.splice(index, 1);
                                                                localStorage.setItem("SavedShippingChoice", JSON.stringify(newShippingSave))
                                                                localStorage.setItem("ItemsAddedToCart", JSON.stringify(addToCartItems));
                                                                quantityInCart();
                                                                deleteButtonAttach();
                                                                UpdateButton();
                                                                ShippingUpdate();
                                                            }

                                                            else if (input.value > 999) {
                                                                alert("Maximum Amount is 999");
                                                            }

                                                                

                                                            else {  //Changes happens here
                                                                item.quantity = Number(input.value);    //change the current quantity of the item to the input value
                                                                div.style.display = "none"; //make the input disappear
                                                                button.style.display = "block"; //make the update button appear again

                                                                localStorage.setItem("ItemsAddedToCart", JSON.stringify(addToCartItems));   //set back the new updates on quantity to the local storage

                                                                //Run all of these function, which also updates all of the information
                                                                quantityInCart();   
                                                                deleteButtonAttach();
                                                                UpdateButton();
                                                                ShippingUpdate();
                                                            }
                                                        
                                                    }
                                            })
                                        }
                                    
                                })
                    
                            })
                        })
                    } //End
            } )
            
        })
    } )

}

function ShippingUpdate() {

    let prevSelectedShipping = [];

    for (let i = 0; i < (addToCartItems.length); i++) {

            let productId = addToCartItems[i].checkoutId;

            let shippingRadBut = document.querySelectorAll(`input[name="shipping-option-${productId}"]`);

            let deliveryDate = document.querySelector(`.deliveryDate-${productId}`)

            prevSelectedShipping[i] = 0;

            if (!isWindowRefreshed) {
                shippingTotalAmount = 0;
                    for (let i = 0; i < newShippingSave.length; i++)  {
                        shippingTotalAmount += newShippingSave[i];
                    }
                orderSummaryReset();
            }
            
            shippingRadBut.forEach( (input, index) => { // This is to show the previous choice in shipping option of the user even if the page is refreshed

                let isInputFound = false;

                let decodedDeliveryDateDetails = input.dataset.deliveryDate.replace(/_/g, " ");

                if (!newShippingSave[i] && index == 0){
                    input.checked = true;
                    isInputFound = true;
                    deliveryDate.innerHTML = `Delivery date: ${decodedDeliveryDateDetails}`;
                }

                else if (newShippingSave[i] == 499 && index == 1) {
                    input.checked = true;
                    isInputFound = true;
                    deliveryDate.innerHTML = `Delivery date: ${decodedDeliveryDateDetails}`;
                }

                else if (newShippingSave[i] == 999 && index == 2) {
                    input.checked = true;
                    isInputFound = true;
                    deliveryDate.innerHTML = `Delivery date: ${decodedDeliveryDateDetails}`;
                }

                if (isInputFound) {
                    
                    addToCartItems[i].deliveryDate = decodedDeliveryDateDetails;
                    localStorage.setItem("ItemsAddedToCart", JSON.stringify(addToCartItems));
                }

                input.addEventListener("change", () => {

                    deliveryDate.innerHTML = `Delivery date: ${decodedDeliveryDateDetails}`;

                    const newShippingOption = Number(input.value);
                    newShippingSave[i] = newShippingOption;

                    shippingTotalAmount = 0;
                    for (let i = 0; i < newShippingSave.length; i++)  {
                        shippingTotalAmount += newShippingSave[i];
                    }
                    orderSummaryReset();

                    //For the Delivery Date
                    addToCartItems[i].deliveryDate = decodedDeliveryDateDetails;
                    localStorage.setItem("ItemsAddedToCart", JSON.stringify(addToCartItems));
                    localStorage.setItem("SavedShippingChoice", JSON.stringify(newShippingSave));

                })
            })
    }
}



