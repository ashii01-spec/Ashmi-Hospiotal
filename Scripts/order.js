const the_form = document.getElementById("the_form");
let cartTable = document.getElementById("Cart");
const btn_checkout = document.getElementById("btn_checkout");
let total = document.getElementById("total_price");
let total_price = 0;
const btnAddToFavourites = document.getElementById("btn_add_to_favourites");
const btnApplyFavourites = document.getElementById("btn_apply_favourites");

// Medicine Prices
const medicinePrices = {
    "Paracetamol": 5.0,
    "Ibuprofen": 8.0,
    "Aspirin": 10.5,
    "Tramadol": 12.0,
    "Morphine": 15.5,
    "Diclofenac": 7.0,
    "Amoxicillin": 6.5,
    "Ciprofloxacin": 9.5,
    "Doxycycline": 11.0,
    "Azithromycin": 14.0,
    "Metronidazole": 8.5,
    "Cephalexin": 10.0,
    "Fluoxetine (Prozac)": 20.5,
    "Sertraline (Zoloft)": 18.0,
    "Amitriptyline": 15.0,
    "Escitalopram (Lexapro)": 22.5,
    "Duloxetine (Cymbalta)": 25.0,
    "Bupropion (Wellbutrin)": 30.0,
    "Loratadine (Claritin)": 10.5,
    "Cetirizine (Zyrtec)": 12.0,
    "Diphenhydramine (Benadryl)": 8.0,
    "Fexofenadine (Allegra)": 14.0,
    "Chlorpheniramine": 6.0,
    "Promethazine": 7.5,
    "Amlodipine": 12.0,
    "Lisinopril": 14.5,
    "Losartan": 10.0,
    "Hydrochlorothiazide (HCTZ)": 8.5,
    "Metoprolol": 9.0,
    "Clonidine": 11.5
};

// References for categories
let category1 = {
    select: document.getElementById("c1_medicine"),
    button: document.getElementById("btn_add_to_cart_1"),
    quantity: document.getElementById("c1_quantity"),
};

let category2 = {
    select: document.getElementById("c2_medicine"),
    button: document.getElementById("btn_add_to_cart_2"),
    quantity: document.getElementById("c2_quantity"),
};

let category3 = {
    select: document.getElementById("c3_medicine"),
    button: document.getElementById("btn_add_to_cart_3"),
    quantity: document.getElementById("c3_quantity"),
};

let category4 = {
    select: document.getElementById("c4_medicine"),
    button: document.getElementById("btn_add_to_cart_4"),
    quantity: document.getElementById("c4_quantity"),
};

let category5 = {
    select: document.getElementById("c5_medicine"),
    button: document.getElementById("btn_add_to_cart_5"),
    quantity: document.getElementById("c5_quantity"),
};

// Event Listeners (Order Page)
category1.button.addEventListener("click", (selectedEvent) =>addToCart(selectedEvent, category1.select, category1.quantity));
category2.button.addEventListener("click", (selectedEvent) =>addToCart(selectedEvent, category2.select, category2.quantity));
category3.button.addEventListener("click", (selectedEvent) =>addToCart(selectedEvent, category3.select, category3.quantity));
category4.button.addEventListener("click", (selectedEvent) =>addToCart(selectedEvent, category4.select, category4.quantity));
category5.button.addEventListener("click", (selectedEvent) =>addToCart(selectedEvent, category5.select, category5.quantity));

btn_checkout.addEventListener("click", handleCheckout);
the_form.addEventListener("submit", handleCheckout);
btnAddToFavourites.addEventListener("click", addFavourites);
btnApplyFavourites.addEventListener("click", applyFavourites);
// Add to Cart Function
function addToCart(event, selectedCategory, quantityElement) {

    event.preventDefault();
    const selectedMedicine = selectedCategory.value;
    const quantity = parseInt(quantityElement.value);

    if (!selectedMedicine || selectedMedicine === "default" || !quantity || isNaN(quantity) || quantity <= 0) {
        alert("Please select a medicine and enter a valid quantity");
        return;
    }    

    const price = calculatePrice(selectedMedicine, quantity);

    total_price = total_price + price;

    total.innerText ="Rs." + total_price.toFixed(2);

    const newRow = cartTable.insertRow();
    newRow.innerHTML = `
        <td>${selectedMedicine}</td>
        <td>${quantity}</td>
        <td>Rs. ${price.toFixed(2)}</td>
    `;

    selectedCategory.selectedIndex = 0;
    quantityElement.value = "";
}

// Price Calculation Function
function calculatePrice(medicine, quantity) {
    return medicinePrices[medicine] ? medicinePrices[medicine] * quantity : 0;
}

// Checkout Function
function handleCheckout(event) {
    event.preventDefault();
    if (cartTable.rows.length <= 1) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }

    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cart_")) {
            localStorage.removeItem(key);
        }
    });
    
    for (let i = 1; i < cartTable.rows.length; i++) {
        localStorage.setItem(
            `cart_${i}`,
            `Medicine: ${cartTable.rows[i].cells[0].innerText}, ` +
            `Quantity: ${cartTable.rows[i].cells[1].innerText}, ` +
            `Price: ${cartTable.rows[i].cells[2].innerText}`
        );
    }

    localStorage.setItem('Total', total.innerText)

    // Redirect to details page
    alert("Proceeding to checkout.");
    window.location.href = "./payment.html";
}

function addFavourites(event){
    event.preventDefault();
    
    let favourites = [];

    // Loop through each row in the cart table (except the header row)
    for (let i = 1; i < cartTable.rows.length; i++) {
        localStorage.setItem(
            `favourite_${i}`,
            `Medicine: ${cartTable.rows[i].cells[0].innerText}, ` +
            `Quantity: ${cartTable.rows[i].cells[1].innerText}, ` +
            `Price: ${cartTable.rows[i].cells[2].innerText}`
        );
    }

    alert("Favourites added successfully!"); 
}

function applyFavourites(event) {
    event.preventDefault();

    while (cartTable.rows.length > 1) {
        cartTable.deleteRow(1);
    }

    total_price = 0;

    // Loop through local storage to find favourites
    Object.keys(localStorage)
        .filter(key => key.startsWith("favourite_"))
        .forEach(key => {
            const data = localStorage.getItem(key);
            const match = data.match(/Medicine: (.+?), Quantity: (\d+), Price: Rs\.(.+)/);

            if (match) {
                const [_, medicine, quantity, price] = match;

                // Insert row into table
                const row = cartTable.insertRow();
                row.innerHTML = `
                    <td>${medicine}</td>
                    <td>${quantity}</td>
                    <td>Rs. ${parseFloat(price).toFixed(2)}</td>
                `;

                total_price += parseFloat(price);
            } else {
                console.error(`Error parsing key "${key}": Invalid format`);
            }
        });

    // Update the total price in the table footer
    total.innerText = "Rs." + total_price.toFixed(2);

    // Provide feedback to the user
    alert("Favourites applied successfully!");
}


