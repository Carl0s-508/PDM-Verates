import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";
import { getLastUser } from "../database/userRepository";

function TopBar({ title }: { title: string }) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.topTitle}>{title}</Text>

      <View style={{ width: 60 }} />
    </View>
  );
}

export default function EditarPerfil() {
  const db = useSQLiteContext();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const user = await getLastUser(db);
    if (!user) return;

    setNome(user.nome);
    setEmail(user.email);
  }

  async function salvar() {
    await db.runAsync(
      `
      UPDATE users
      SET nome = $nome,
          email = $email
      WHERE id = (
        SELECT id FROM users
        ORDER BY created_at DESC
        LIMIT 1
      )
      `,
      { $nome: nome, $email: email }
    );

    router.back();
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <View style={styles.card}>

        <TopBar title="Editar perfil" />

        <Text style={styles.label}>Nome</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          placeholderTextColor="#777"
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={salvar}>
          <Text style={styles.buttonText}>Salvar alterações</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 20,
    borderWidth: 2,
    borderColor: "#702516",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },

  back: {
    color: "#702516",
    fontSize: 14,
    fontWeight: "600",
  },

  topTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#702516",
  },

  label: {
    color: "#702516",
    fontSize: 13,
    marginBottom: 4,
    marginTop: 10,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#702516",
  },

  button: {
    backgroundColor: "#702516",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});