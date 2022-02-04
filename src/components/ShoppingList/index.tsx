import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  function fetchAllProducts() {
    firestore()
      .collection("products")
      .get()
      .then((response) => {
        const data = response.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function fetchUniqueProduct() {
    firestore()
      .collection("products")
      .doc("my-custom-id")
      .get()
      .then((response) => {
        const data = { id: response.id, ...response.data() };

        console.log(data);
      });
  }
  function fetchProductsWithRealtimeSync() {
    const subscribe = firestore()
      .collection("products")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }
  function fetchFilteredProductsWithRealtimeSync() {
    const subscribe = firestore()
      .collection("products")
      .where("quantity", ">=", 1)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }
  function fetchLimitedProductsWithRealtimeSync() {
    const subscribe = firestore()
      .collection("products")
      .limit(2)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }
  function fetchOrderedProductsWithRealtimeSync() {
    const subscribe = firestore()
      .collection("products")
      .orderBy("description", "asc")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }
  function fetchOrderedWithIntervalProductsWithRealtimeSync() {
    const subscribe = firestore()
      .collection("products")
      .orderBy("quantity")
      .startAt(3)
      .endAt(4)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((document) => {
          return {
            id: document.id,
            ...document.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }

  useEffect(() => {
    fetchOrderedProductsWithRealtimeSync();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
