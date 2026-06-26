import { router } from "expo-router";
import { useState } from "react";
import { useDatabase } from "../database/sqlite";
import * as ImagePicker from "expo-image-picker";

import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  dbInsertAnalise,
  dbIncrementarUsoDiario,
} from "../database/databaseInit";
4

const { width, height } = Dimensions.get("window");

const isSmallDevice = height < 700;
const isVerySmallDevice = width < 360;

// ==============================
// TELA PRINCIPAL
// ==============================

export default function AnalisarImagem() {
  const db = Platform.OS !== "web" ? useDatabase() : null;

  const [imagem, setImagem] = useState<string | null>(null);

  async function selecionarImagem() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissao.granted) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  }

  async function analisarImagem() {
    if (!imagem) return;

    try {
      const score = gerarScore();
      const resultado = definirResultado(score);

      const userId = "user_logado_id";
      const analiseId = `anl_${Date.now()}`;

      if (db) {
        await dbInsertAnalise(
          db,
          analiseId,
          userId,
          imagem,
          "Imagem enviada pelo usuário para análise.",
          score,
          resultado,
          "Imagem"
        );

        await dbIncrementarUsoDiario(db, userId);
      }

      router.push({
        pathname: "/resultado",
        params: { score: String(score) },
      });
    } catch (error) {
      console.error("Erro ao salvar análise de imagem:", error);
    }
  }

  const isDisabled = !imagem;

  if (Platform.OS === "web") {
    return <WebMessage />;
  }

  return (
    <View style={styles.background}>
      <SideTab />

      <Header />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Insira a imagem</Text>

          <TouchableOpacity
            style={styles.imageBox}
            activeOpacity={0.85}
            onPress={selecionarImagem}
          >
            {imagem ? (
              <Image source={{ uri: imagem }} style={styles.previewImage} />
            ) : (
              <Text style={styles.imagePlaceholder}>🖼</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, isDisabled && styles.buttonDisabled]}
            onPress={analisarImagem}
            disabled={isDisabled}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Analisar a imagem</Text>

            <Image source={require("../assets/send.png")} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <SecurityCard />
      </ScrollView>
    </View>
  );
}

// ==============================
// COMPONENTES
// ==============================

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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

function WebMessage() {
  return (
    <View style={styles.webMessage}>
      <Text>Envio de imagem disponível somente no aplicativo.</Text>
    </View>
  );
}

// ==============================
// FUNÇÕES AUXILIARES
// ==============================

function gerarScore() {
  return Math.floor(Math.random() * 100);
}

function definirResultado(score: number) {
  if (score >= 80) return "Alta confiabilidade";
  if (score >= 50) return "Confiabilidade moderada";
  return "Baixa confiabilidade";
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

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
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
    paddingTop: isSmallDevice ? 36 : 50,
    paddingBottom: 30,
    justifyContent: "space-between",
  },

  content: {
    width: "100%",
  },

  title: {
    fontSize: isVerySmallDevice ? 24 : 28,
    fontWeight: "bold",
    color: "#702516",

    marginBottom: isSmallDevice ? 28 : 36,
  },

  imageBox: {
    width: "100%",
    height: isVerySmallDevice ? 90 : 110,

    backgroundColor: "#F4F4F4",

    borderRadius: 16,

    borderWidth: 1.5,
    borderColor: "#8A4A3B",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 26,

    overflow: "hidden",
  },

  imagePlaceholder: {
    fontSize: 30,
  },

  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    fontSize: isVerySmallDevice ? 12 : 13,
  },

  webMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});