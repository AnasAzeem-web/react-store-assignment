from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#                                    --- BLUEPRINTS ---
class Product(BaseModel):
    id: int
    name: str
    price: float
    category: str = "General"
    description: str = "Standard item"

class Category(BaseModel):
    id: int
    name: str
    category: str

class Order(BaseModel):
    id: int
    customer_name: str
    total_amount: float

#                           --- THE VAULTS (Memory Banks) ---
products_db = []
categories_db = []
orders_db = []
cart_db = []


#                            --- PRODUCTS DOORS ---
@app.get("/products")
def get_products():
    return products_db

@app.get("/products/{product_id}")
def get_product(product_id: int):
    for p in products_db:
        if p.id == product_id:
            return p
    raise HTTPException(status_code=404, detail="Product not found")

@app.post("/products", status_code=201)
def add_product(product: Product):
    products_db.append(product)
    return {"message": "Product successfully added!"}

@app.put("/products/{product_id}")
def update_product(product_id: int, product: Product):
    for i, p in enumerate(products_db):
        if p.id == product_id:
            products_db[i] = product
            return {"message": "Product updated"}
    raise HTTPException(status_code=404, detail="Product not found")

@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    for i, p in enumerate(products_db):
        if p.id == product_id:
            del products_db[i]
            return {"message": "Product deleted"}
    raise HTTPException(status_code=404, detail="Product not found")


#                               --- CATEGORIES DOORS ---
@app.get("/categories")
def get_categories():
    return categories_db

@app.get("/categories/{category_id}")
def get_category(category_id: int):
    for c in categories_db:
        if c.id == category_id:
            return c.category
    raise HTTPException(status_code=404, detail="Category not found")

@app.post("/categories", status_code=201)
def add_category(category: Category):
    categories_db.append(category)
    return {"message": "Category successfully added!"}


#                                   --- CART DOORS ---
@app.get("/cart")
def get_cart():
    return cart_db

@app.post("/cart/add/{product_id}")
def add_to_cart(product_id: int):
    for p in products_db:
        if p.id == product_id:
            cart_db.append(p)
            return {"message": "Added to cart"}
    raise HTTPException(status_code=404, detail="Product not found")

@app.delete("/cart/remove/{product_id}")
def remove_from_cart(product_id: int):
    for i, p in enumerate(cart_db):
        if p.id == product_id:
            del cart_db[i]
            return {"message": "Removed from cart"}
    raise HTTPException(status_code=404, detail="Product not found in cart")


#                          --- ORDERS / CHECKOUT ---
@app.get("/orders")
def get_orders():
    return orders_db

@app.get("/orders/{order_id}")
def get_order(order_id: int):
    for o in orders_db:
        if o.id == order_id:
            return o
    raise HTTPException(status_code=404, detail="Order not found")

@app.post("/orders")
def place_order(order: Order):
    orders_db.append(order)
    cart_db.clear()
    return {"message": "Order placed!"}