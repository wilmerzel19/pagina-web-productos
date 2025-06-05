import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { Product } from '../types';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION_NAME = 'products';

export const getAllProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, COLLECTION_NAME);
  const productsSnapshot = await getDocs(productsCollection);
  
  return productsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data.category,
      featured: data.featured,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  });
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const productsCollection = collection(db, COLLECTION_NAME);
  const featuredQuery = query(
    productsCollection,
    where('featured', '==', true),
    orderBy('createdAt', 'desc')
  );
  
  const productsSnapshot = await getDocs(featuredQuery);
  
  return productsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data.category,
      featured: data.featured,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  });
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const productsCollection = collection(db, COLLECTION_NAME);
  const categoryQuery = query(
    productsCollection,
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  );
  
  const productsSnapshot = await getDocs(categoryQuery);
  
  return productsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data.category,
      featured: data.featured,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const productDoc = doc(db, COLLECTION_NAME, id);
    const productSnapshot = await getDoc(productDoc);
    
    if (!productSnapshot.exists()) {
      return null;
    }
    
    const data = productSnapshot.data();
    return {
      id: productSnapshot.id,
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      category: data.category,
      featured: data.featured,
      createdAt: data.createdAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>, imageFile: File): Promise<string> => {
  try {
    // Upload image first
    const imageId = uuidv4();
    const imageRef = ref(storage, `product-images/${imageId}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);
    
    // Add product with image URL
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...product,
      imageUrl,
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (
  id: string, 
  product: Partial<Omit<Product, 'id' | 'createdAt'>>, 
  imageFile?: File
): Promise<void> => {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    
    // If there's a new image, upload it and update the URL
    if (imageFile) {
      // Upload new image
      const imageId = uuidv4();
      const imageRef = ref(storage, `product-images/${imageId}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      
      // Get the old image URL to delete it later
      const productSnapshot = await getDoc(productRef);
      const oldImageUrl = productSnapshot.data()?.imageUrl;
      
      // Update product with new image URL
      await updateDoc(productRef, {
        ...product,
        imageUrl,
      });
      
      // Delete old image if it exists
      if (oldImageUrl) {
        try {
          const oldImageRef = ref(storage, oldImageUrl);
          await deleteObject(oldImageRef);
        } catch (error) {
          console.error("Error deleting old image:", error);
        }
      }
    } else {
      // Update product without changing the image
      await updateDoc(productRef, product);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    
    // Get the image URL to delete it from storage
    const productSnapshot = await getDoc(productRef);
    const imageUrl = productSnapshot.data()?.imageUrl;
    
    // Delete the product document
    await deleteDoc(productRef);
    
    // Delete the image if it exists
    if (imageUrl) {
      try {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};