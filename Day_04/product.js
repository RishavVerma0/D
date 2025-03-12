class Product {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(id, name, price, quantity) {
        if (this.products.some(p => p.id === id)) {
            alert("Product ID already exists!");
            return;
        }
        const newProduct = new Product(id, name, price, quantity);
        this.products.push(newProduct);
        this.displayProducts();
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this.displayProducts();
    }

    updateProduct(id, name, price, quantity) {
        let product = this.products.find(p => p.id === id);
        if (product) {
            product.name = name;
            product.price = price;
            product.quantity = quantity;
            this.displayProducts();
        }
    }

    displayProducts() {
        const tableBody = document.getElementById("productTableBody");
        tableBody.innerHTML = "";
        this.products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.quantity}</td>
                <td class="actions">
                    <button class="btn edit-btn" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

const manager = new ProductManager();

document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById("productId").value);
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);

    manager.addProduct(id, name, price, quantity);
    document.getElementById("productForm").reset();
});

function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        manager.deleteProduct(id);
    }
}

function editProduct(id) {
    const product = manager.products.find(p => p.id === id);
    if (product) {
        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productQuantity").value = product.quantity;

        document.getElementById("productForm").onsubmit = function(event) {
            event.preventDefault();
            manager.updateProduct(
                id,
                document.getElementById("productName").value,
                parseFloat(document.getElementById("productPrice").value),
                parseInt(document.getElementById("productQuantity").value)
            );
            this.onsubmit = addNewProduct;
            document.getElementById("productForm").reset();
        };
    }
}

function addNewProduct(event) {
    event.preventDefault();
    const id = parseInt(document.getElementById("productId").value);
    const name = document.getElementById("productName").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const quantity = parseInt(document.getElementById("productQuantity").value);

    manager.addProduct(id, name, price, quantity);
    document.getElementById("productForm").reset();
}