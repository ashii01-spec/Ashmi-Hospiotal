const card_number = document.getElementById("cardNumber");
cardNumberInput = document.getElementById('cardNumber');
let exp_date = document.getElementById("expdate");
let CVV = document.getElementById("CVV");
let crad_name = document.getElementById("crdname");
let f_name = document.getElementById("fullname");
let phone = document.getElementById("phoneNumber");
let NIC = document.getElementById("NIC");
const theform = document.getElementById("form");
let pay_btn = document.getElementById("paybtn");
const link = document.getElementById("link");
let total = document.getElementById("total_price");
let cartTable = document.getElementById("Cart");
let date = document.getElementById("date");
const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

// adding event listners
window.addEventListener("load",init); 
pay_btn.addEventListener("click",display);

card_number.addEventListener('input', formatCardNumber);
card_number.addEventListener("change", display1);
exp_date.addEventListener("change",display1);
CVV.addEventListener("change",display1);
crad_name.addEventListener("change",display1);

function init(event)
{
    event.preventDefault();
    pay_btn.innerText = `Pay ${localStorage.getItem("Total")}`;
    f_name.value = `${localStorage.getItem("Full Name")}`;
    phone.value = `${localStorage.getItem("Phone Number")}`;
    NIC.value = `${localStorage.getItem("NIC Number")}`;
    pay_btn.style.border="2px solid red";
    pay_btn.style.boxShadow = "0px 0px";
    pay_btn.style.animationDuration = "0s";


    while (cartTable.rows.length > 1) {
        cartTable.deleteRow(1);
    }

    let total_price = 0;

    Object.keys(localStorage)
        .filter(key => key.startsWith("cart_"))
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
    
    date.innerText = `Order Date : ${today}`;

    total.innerText = "Rs." + total_price.toFixed(2);
}

function formatCardNumber(event) 
{
    const inputValue = event.target.value.replace(/\D/g, '');
    const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    event.target.value = formattedValue;
}

function display(event)
{
    if(theform.checkValidity())
    {
        event.preventDefault();

        pay_btn.style.color="green";
        pay_btn.style.border="2px solid green";
        pay_btn.style.boxShadow = "2px 2px 30px";
        pay_btn.style.animationDuration = "0s";

        const currentDate = new Date();
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);

        alert("Thank You For Purchasing from Ashmi Hospitals!\n Your Order Have Been Placed.\n Delivery Date: "+newDate.toDateString())

        link.setAttribute("href", "./pharmacy.html");   
        link.setAttribute("target", "_self");
        link.click();
    }    
}

function display1()
{
    if(theform.checkValidity())
    {
        pay_btn.style.color="green";
        pay_btn.style.border="2px solid green";
        pay_btn.style.boxShadow = "2px 2px 30px";
        pay_btn.style.animationDuration = "0s";  
    }
    
}