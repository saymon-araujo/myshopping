import React, { useState } from "react";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";

export function FormBox() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  async function handleAddProduct() {
    firestore()
      .collection("products")
      .add({
        description,
        quantity,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Produto adicionado com sucesso");
      })
      .catch(() => {
        Alert.alert("Opa", "Não conseguimos adicionar seu produto :/");
      });
  }
  async function handleAddProductWithCustomId() {
    firestore()
      .collection("products")
      .doc("my-custom-id")
      .set({
        description,
        quantity,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Produto adicionado com sucesso");
      })
      .catch(() => {
        Alert.alert("Opa", "Não conseguimos adicionar seu produto :/");
      });
  }

  return (
    <Container>
      <Input placeholder="Nome do produto" size="medium" onChangeText={setDescription} />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(value) => setQuantity(Number(value))}
      />

      <ButtonIcon size="large" icon="add-shopping-cart" onPress={handleAddProduct} />
    </Container>
  );
}
