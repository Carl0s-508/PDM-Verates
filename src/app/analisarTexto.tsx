import { router } from "expo-router";
import { useState } from "react";
import { useDatabase } from "../database/sqlite";

import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

import {
  dbInsertAnalise,
  dbIncrementarUsoDiario,
} from "../database/databaseInit";

import { analisarConteudoIA } from "../services/api";

const { width, height } = Dimensions.get("window");

const isSmallDevice = height < 700;
const isVerySmallDevice = width < 360;

// ==============================
// TELA PRINCIPAL
// ==============================

export default function AnalisarTexto() {
  const db = Platform.OS !== "web" ? useDatabase() : null;

  const [conteudo, setConteudo] = useState("");
  const [loading, setLoading] = useState(false);

  async function analisarConteudo() {
    if (!conteudo.trim()) return;

    try {
      setLoading(true);

      // 🔥 CHAMADA REAL PARA BACKEND (IA)
      const resultadoIA = await analisarConteudoIA(conteudo.trim());

      const userId = "user_logado_id";
      const analiseId = `anl_${Date.now()}`;

      // 💾 SALVANDO NO BANCO LOCAL
      if (db) {
        await dbInsertAnalise(
          db,
          analiseId,
          userId,
          conteudo.trim(),
          resultadoIA.resumo,
          resultadoIA.confiabilidade,
          resultadoIA.veracidade,
          "Texto"
        );

        await dbIncrementarUsoDiario(db, userId);
      }

      // 📲 IR PARA TELA DE RESULTADO
      router.push({
        pathname: "/resultado",
        params: {
          resultado: JSON.stringify(resultadoIA),
        },
      });

    } catch (error) {
      console.error("Erro ao analisar conteúdo:", error);
      Alert.alert("Erro", "Não foi possível analisar o conteúdo.");
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = !conteudo.trim() || loading;

  return (
    <View style={styles.background}>
      <SideTab />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Header />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Insira o conteúdo</Text>

            <Text style={styles.subtitle}>
              Digite ou cole o conteúdo para análise de veracidade
            </Text>

            <TextInput
              style={styles.textArea}
              placeholder="Ex: Notícia da cidade X..."
              placeholderTextColor="#8a8a8a"
              value={conteudo}
              onChangeText={setConteudo}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.button, isDisabled && styles.buttonDisabled]}
              onPress={analisarConteudo}
              disabled={isDisabled}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>
                {loading ? "Analisando..." : "Analisar o Conteúdo"}
              </Text>

              <Image
                source={require("../assets/send.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <SecurityCard />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ==============================
// COMPONENTES
// ==============================

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => router.push("/planos" as any)}
      >
        <Text style={styles.crown}>♛</Text>
        <Text style={styles.plusText}>Plus</Text>
      </TouchableOpacity>
    </View>
  );
}

function SideTab() {
  return (
    <View style={styles.sideTab}>
      <Text style={styles.sideTabDots}>⋮</Text>
    </View>
  );
}

function SecurityCard() {
  return (
    <View style={styles.securityCard}>
      <View style={styles.lockCircle}>
        <Text style={styles.lockIcon}>🔒</Text>
      </View>

      <Text style={styles.securityText}>
        Seus dados são totalmente protegidos.
      </Text>
    </View>
  );
}

// ==============================
// ESTILOS
// ==============================

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F2EDE9",
  },

  sideTab: {
    position: "absolute",
    left: 0,
    top: height * 0.12,
    width: 22,
    height: 70,
    backgroundColor: "#d9a89a8c",
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderWidth: 1.5,
    borderLeftWidth: 0,
    borderColor: "#702516aa",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  sideTabDots: {
    fontSize: 18,
    color: "#702516",
    fontWeight: "bold",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: isVerySmallDevice ? 18 : 24,
    paddingTop: isVerySmallDevice ? 16 : 22,
  },

  backButton: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#702516",
    elevation: 3,
  },

  backText: {
    fontSize: 24,
    color: "#702516",
    fontWeight: "bold",
  },

  plusButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#702516",
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 9,
    backgroundColor: "#FFF",
  },

  crown: {
    fontSize: 14,
    color: "#702516",
    marginRight: 6,
  },

  plusText: {
    color: "#702516",
    fontWeight: "700",
    fontSize: 15,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: isVerySmallDevice ? 22 : 30,
    paddingTop: isSmallDevice ? 24 : 36,
    paddingBottom: 30,
  },

  content: {
    width: "100%",
  },

  title: {
    fontSize: isVerySmallDevice ? 24 : 28,
    fontWeight: "bold",
    color: "#702516",
    marginBottom: 14,
  },

  subtitle: {
    fontSize: isVerySmallDevice ? 13 : 14,
    color: "#444",
    marginBottom: 22,
  },

  textArea: {
    width: "100%",
    minHeight: isVerySmallDevice ? 110 : 130,
    backgroundColor: "#F4F4F4",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#8A4A3B",
    padding: 16,
    fontSize: 14,
    marginBottom: 24,
  },

  button: {
    height: 58,
    width: "100%",
    backgroundColor: "#6B2416",
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#3d120a",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
    marginRight: 10,
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "#FFF",
  },

  securityCard: {
    marginTop: 30,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#8A4A3B",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  lockCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  lockIcon: {
    fontSize: 14,
  },

  securityText: {
    flex: 1,
    color: "#4A4A4A",
    fontSize: 13,
  },
});