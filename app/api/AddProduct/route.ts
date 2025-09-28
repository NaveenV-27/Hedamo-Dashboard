import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function POST(req: NextRequest) {
  try {
    const newProduct = await req.json();
    console.log("Path : ", filePath, newProduct)
    // Read existing products
    const fileData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(fileData);

    // Assign a new ID
    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;

    // Append new product
    products.push(newProduct);

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to add product" }, { status: 500 });
  }
}
