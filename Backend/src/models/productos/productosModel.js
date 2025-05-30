import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    default: ''
  },
  calibre: {
    type: String,
    trim: true
  },
  sistemaDeDisparo: {
    type: String,
    trim: true
  },
  longitud: {
    type: String,
    trim: true
  },
  peso: {
    type: String,
    trim: true
  },
  capacidad: {
    type: String,
    trim: true
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productoSchema);
export default Product;
