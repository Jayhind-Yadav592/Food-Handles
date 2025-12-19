// ================= FOOD DATA =================
const foods = [
    { id: 1, name: "Margherita Pizza", price: 299, category: "pizza", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400", desc: "Classic cheese pizza" },
    { id: 2, name: "Chicken Burger", price: 199, category: "burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", desc: "Juicy chicken patty" },
    { id: 3, name: "Pasta Alfredo", price: 249, category: "pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", desc: "Creamy white sauce" },
    { id: 4, name: "Chocolate Cake", price: 149, category: "dessert", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", desc: "Rich chocolate delight" },
    { id: 5, name: "Cold Coffee", price: 99, category: "drinks", image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400", desc: "Refreshing iced coffee" },
    { id: 6, name: "Pepperoni Pizza", price: 349, category: "pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400", desc: "Loaded with pepperoni" },
    { id: 7, name: "Veg Burger", price: 149, category: "burger", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400", desc: "Fresh veggie patty" },
    { id: 8, name: "Penne Arrabiata", price: 229, category: "pasta", image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400", desc: "Spicy tomato pasta" },
    { id: 9, name: "Strawberry Shake", price: 129, category: "drinks", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400", desc: "Fresh strawberry blend" },
    { id: 10, name: "Tiramisu", price: 179, category: "dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400", desc: "Italian coffee dessert" }
];

// ================= GLOBAL =================
let cart = [];
let currentCategory = "all";

// ================= DISPLAY FOODS =================
function displayFoods(list) {
    const grid = document.getElementById("foodGrid");
    grid.innerHTML = "";

    list.forEach((food, index) => {
        const card = document.createElement("div");
        card.className = "food-card";
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <img src="${food.image}" class="food-image">
            <div class="food-info">
                <div class="food-name">${food.name}</div>
                <div class="food-desc">${food.desc}</div>
                <div class="food-footer">
                    <div class="food-price">₹${food.price}</div>
                    <button class="add-btn" onclick="addToCart(${food.id})">Add +</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ================= CATEGORY FILTER (FINAL FIX) =================
function filterCategory(category) {
    currentCategory = category;

    // active button change
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    event.target.classList.add("active");

    // filter logic
    const filtered =
        category === "all"
            ? foods
            : foods.filter(f => f.category === category);

    displayFoods(filtered);
}

// ================= SEARCH =================
function searchFood() {
    const q = document.getElementById("searchInput").value.toLowerCase();

    const filtered = foods.filter(f =>
        f.name.toLowerCase().includes(q) &&
        (currentCategory === "all" || f.category === currentCategory)
    );

    displayFoods(filtered);
}

// ================= CART =================
function addToCart(id) {
    const food = foods.find(f => f.id === id);
    const item = cart.find(i => i.id === id);

    item ? item.quantity++ : cart.push({ ...food, quantity: 1 });
    updateCart();
    showNotification();
}

function updateCart() {
    document.getElementById("cartCount").textContent =
        cart.reduce((s, i) => s + i.quantity, 0);
    displayCartItems();
}

function displayCartItems() {
    const cartItems = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");

    if (!cart.length) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        totalPrice.textContent = "₹0";
        return;
    }

    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">₹${item.price}</div>
                </div>
                <div class="item-controls">
                    <button class="qty-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
        `;
    });

    totalPrice.textContent = `₹${total}`;
}

function increaseQuantity(id) {
    cart.find(i => i.id === id).quantity++;
    updateCart();
}

function decreaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    item.quantity--;
    if (item.quantity === 0) cart = cart.filter(i => i.id !== id);
    updateCart();
}

// ================= UI =================
function toggleCart() {
    document.getElementById("cartModal").classList.toggle("active");
}

function showNotification() {
    const n = document.getElementById("notification");
    n.classList.add("show");
    setTimeout(() => n.classList.remove("show"), 2000);
}

function checkout() {
    if (!cart.length) return alert("Your cart is empty!");
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    alert(`Order placed successfully!\nTotal: ₹${total}`);
    cart = [];
    updateCart();
    toggleCart();
}

// ================= INIT =================
displayFoods(foods);
