import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const verifyProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const count = await Product.countDocuments();
    console.log(`✓ Total products in database: ${count}`);

    const categories = await Product.distinct('category');
    console.log(`✓ Categories (${categories.length}): ${categories.join(', ')}`);

    // Get some sample products
    const samples = await Product.find().limit(3).select('name category price');
    console.log('\n✓ Sample products:');
    samples.forEach((p) => {
      console.log(`  - ${p.name} (${p.category}) - $${p.price}`);
    });

    await mongoose.disconnect();
    console.log('\n✓ Database verification complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error verifying products:', error.message);
    process.exit(1);
  }
};

verifyProducts();
