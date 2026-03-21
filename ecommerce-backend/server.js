const path = require("path");
const express = require("express");
const cors = require("cors");

const products = require("./data/products");

const app = express();

/** Base URL clients use to load images (override for Android emulator: http://10.0.2.2:5001) */
const API_PUBLIC_BASE = process.env.API_PUBLIC_URL || "http://localhost:5001";

app.use(cors());

app.use(express.json());

app.use(
    "/devil-fruits",
    express.static(path.join(__dirname, "devil-fruits"))
);

function normalizeProduct(product) {
    if (!product.image || product.image.startsWith("http")) {
        return product;
    }
    const pathname = product.image.startsWith("/")
        ? product.image
        : `/${product.image}`;
    return { ...product, image: `${API_PUBLIC_BASE}${pathname}` };
}

app.get("/api/products", (req, res) => {
    res.json(products.map(normalizeProduct));
});


app.get("/api/categories", (req, res) => {
    const categories = [...new Set(products.map(product => product.category))];
    res.json(categories);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(normalizeProduct(product));
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});


app.get("/", (req, res) => {
    res.send("E-Commerce Product API is running...");
});


const port = Number(process.env.PORT) || 5001;
app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});

