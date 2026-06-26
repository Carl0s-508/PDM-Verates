import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";
import { getLastUser } from "../database/userRepository";
import { User } from "../../types/user";

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

export default function Perfil() {
  const db = useSQLiteContext();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const result = await getLastUser(db);
      setUser(result);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#702516" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <View style={styles.card}>

        <TopBar title="Perfil" />

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.nome?.slice(0, 2).toUpperCase() || "U"}
          </Text>
        </View>

        <Text style={styles.name}>{user?.nome}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/editar")}
        >
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/")}>
          <Text style={styles.logout}>Sair</Text>
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

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#702516",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    alignSelf: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },

  email: {
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },

  innerCard: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 12,
    marginVertical: 15,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  statBox: {
    alignItems: "center",
  },

  statNumber: {
    fontWeight: "bold",
    color: "#702516",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
  },

  button: {
    backgroundColor: "#702516",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  logout: {
    marginTop: 12,
    color: "#702516",
    textAlign: "center",
    fontWeight: "600",
  },
});