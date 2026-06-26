
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

const isSmallDevice = height < 700;
const isVerySmallDevice = height < 620;

type Pesquisa = {
  id: string;
  titulo: string;
};

const PESQUISAS_INICIAIS: Pesquisa[] = [
  { id: "1", titulo: "Vacina causa autismo, diz post viral" },
  { id: "2", titulo: "Nova lei eleitoral aprovada pelo Senado" },
  { id: "3", titulo: "Cientistas encontram água em exoplaneta" },
  { id: "4", titulo: "Aumento do salário mínimo para 2027" },
  { id: "5", titulo: "Boato sobre apagão nacional neste fim de semana" },
  { id: "6", titulo: "Banco Central anuncia nova taxa Selic" },
  { id: "7", titulo: "Foto de celebridade é montagem feita por IA" },
  { id: "8", titulo: "Estudo liga uso de celular a novo vírus" },
];

export default function HistoricoPesquisas() {
  const [pesquisas, setPesquisas] =
    useState<Pesquisa[]>(PESQUISAS_INICIAIS);

  const [texto, setTexto] = useState("");

  function removerPesquisa(id: string) {
    setPesquisas((prev) =>
      prev.filter((p) => p.id !== id)
    );
  }

  function abrirPesquisa(item: Pesquisa) {
    const score = Math.floor(Math.random() * 100);

    router.push({
      pathname: "/resultado",
      params: {
        score: String(score),
      },
    });
  }

  function enviarNovaPesquisa() {
    if (!texto.trim()) return;

    const nova: Pesquisa = {
      id: Date.now().toString(),
      titulo: texto.trim(),
    };

    setPesquisas((prev) => [nova, ...prev]);

    setTexto("");
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      {/* HEADER */}
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
          <Image
            source={require("../assets/Plus.png")}
            style={styles.plusIcon}
          />

          <Text style={styles.plusText}>
            Plus
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <View style={styles.content}>
          {/* CARD PRINCIPAL */}
          <View style={styles.card}>
            <Text style={styles.title}>
              Histórico
            </Text>

            <Text style={styles.subtitle}>
              Consulte suas verificações recentes.
            </Text>

            <FlatList
              data={pesquisas}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.listContent
              }
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Nenhuma pesquisa recente.
                </Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemButton}
                  activeOpacity={0.8}
                  onPress={() =>
                    abrirPesquisa(item)
                  }
                  onLongPress={() =>
                    removerPesquisa(item.id)
                  }
                >
                  <Text
                    style={styles.itemText}
                    numberOfLines={2}
                  >
                    {item.titulo}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* INPUT */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Adicionar pesquisa ao histórico"
              placeholderTextColor="#777"
              value={texto}
              onChangeText={setTexto}
              onSubmitEditing={
                enviarNovaPesquisa
              }
              returnKeyType="send"
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                !texto.trim() &&
                  styles.sendButtonDisabled,
              ]}
              onPress={enviarNovaPesquisa}
              disabled={!texto.trim()}
            >
              <Image
                source={require("../assets/send.png")}
                style={styles.sendIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal:
      isVerySmallDevice ? 16 : 24,
    paddingTop:
      isVerySmallDevice ? 18 : 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 55,
    height: 55,

    borderRadius: 999,

    backgroundColor: "#FFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516",
  },

  backText: {
    fontSize: 28,

    color: "#702516",

    fontWeight: "bold",
  },

  plusButton: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516",

    borderRadius: 30,

    paddingHorizontal: 20,
    paddingVertical: 10,

    backgroundColor: "#FFF",
  },

  plusIcon: {
    width: 20,
    height: 20,

    tintColor: "#702516",
  },

  plusText: {
    color: "#702516",

    fontWeight: "700",

    marginLeft: 6,
  },

  content: {
    flex: 1,

    justifyContent: "center",
  },

  card: {
    flex: 1,

    marginTop: 24,

    backgroundColor: "#FFF",

    borderRadius: 28,

    padding: 22,

    borderWidth: 2,
    borderColor: "#702516",

    shadowColor: "#000",

    shadowOffset: {
      width: 4,
      height: 6,
    },

    shadowOpacity: 0.25,

    shadowRadius: 5,

    elevation: 8,
  },

  title: {
    fontSize: 30,

    fontWeight: "bold",

    color: "#702516",

    textAlign: "center",

    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,

    color: "#666",

    textAlign: "center",

    marginBottom: 24,
  },

  listContent: {
    paddingBottom: 10,
  },

  itemButton: {
    backgroundColor: "#F5F5F5",

    borderRadius: 18,

    borderWidth: 1.5,
    borderColor: "#702516aa",

    paddingVertical: 16,
    paddingHorizontal: 18,

    marginBottom: 12,
  },

  itemText: {
    color: "#702516",

    fontSize: 15,

    fontWeight: "600",

    textAlign: "center",
  },

  emptyText: {
    marginTop: 30,

    textAlign: "center",

    color: "#666",

    fontSize: 15,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFF",

    borderRadius: 20,

    borderWidth: 1.5,
    borderColor: "#8A4A3B",

    paddingHorizontal: 12,

    height: 65,

    marginTop: 18,
    marginBottom: 16,
  },

  input: {
    flex: 1,

    fontSize: 15,

    color: "#333",
  },

  sendButton: {
    width: 46,
    height: 46,

    borderRadius: 14,

    backgroundColor: "#702516",

    justifyContent: "center",
    alignItems: "center",
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },

  sendIcon: {
    width: 22,
    height: 22,

    tintColor: "#FFF",
  },
});