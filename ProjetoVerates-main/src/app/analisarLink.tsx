import { router } from "expo-router";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { dbInsertAnalise, dbIncrementarUsoDiario } from "../database/databaseInit";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AnalisarLink() {
  const db = useSQLiteContext();
  const [link, setLink] = useState("");

const analisarNoticia = async () => {
  if (!link.trim()) return;

  console.log(link);
  const scoreAleatorio = Math.floor(Math.random() * 100);
  
  // Define o resultado textual com base no score obtido
  let resultadoText = "Baixa confiabilidade";
  if (scoreAleatorio >= 80) resultadoText = "Alta confiabilidade";
  else if (scoreAleatorio >= 50) resultadoText = "Confiabilidade moderada";

  try {
    const analiseId = "anl_" + Date.now();
    const mockUserId = "user_logado_id"; // Em produção, você pegará o ID do usuário logado

    // Insere a análise no banco de dados local
    await dbInsertAnalise(
      db,
      analiseId,
      mockUserId,
      link,
      "Conteúdo extraído do link analisado.", 
      scoreAleatorio,
      resultadoText,
      "Geral"
    );

    // Incrementa ou cria o registro de uso do dia atual
    await dbIncrementarUsoDiario(db, mockUserId);

    router.push({
      pathname: "/resultado",
      params: {
        score: scoreAleatorio,
      },
    });
  } catch (error) {
    console.error("Erro ao processar e salvar análise no SQLite:", error);
  }
};
  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => router.back()}
        >
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => router.push("/planos" as any)}
        >
          <Image
            source={require("../assets/Plus.png")}
            style={styles.plusIcon}
          />
          <Text style={styles.plusText}>Plus</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Insira o link</Text>

          <Text style={styles.subtitle}>
            Cole o link da notícia que deseja verificar.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="https://exemplo.com/noticia"
            placeholderTextColor="#666"
            value={link}
            onChangeText={setLink}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={analisarNoticia}>
            <Text style={styles.buttonText}>Analisar a notícia</Text>

            <Image
              source={require("../assets/send.png")}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>

        {/* CARD INFERIOR */}
        <View style={styles.securityCard}>
          <Image
            source={require("../assets/lock.png")}
            style={styles.securityIcon}
          />

          <Text style={styles.securityText}>
            Seus dados são totalmente protegidos.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButtonContainer: {
    width: 55,
    height: 55,

    borderRadius: 999,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,
  },

  backButton: {
    fontSize: 28,
    color: "#702516",
    fontWeight: "bold",
  },

  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#702516",
  },

  plusButton: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1.8,
    borderColor: "#702516",

    borderRadius: 28,

    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    tintColor: "#702516",
  },

  plusText: {
    color: "#702516",
    fontWeight: "700",
    fontSize: 16,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 500,

    backgroundColor: "#FFFFFF",

    borderRadius: 28,

    paddingVertical: 36,
    paddingHorizontal: 28,

    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 8,
    },
    shadowOpacity: 0.28,
    shadowRadius: 8,

    elevation: 12,
  },

  title: {
    fontSize: 36,
    textAlign: "center",

    color: "#702516",

    fontWeight: "bold",
    letterSpacing: 2,

    marginBottom: 16,
  },

  subtitle: {
    textAlign: "center",

    fontSize: 16,
    color: "#4A4A4A",

    lineHeight: 24,

    marginBottom: 32,

    maxWidth: 280,
  },

  input: {
    width: "100%",

    backgroundColor: "#F4F4F4",

    borderWidth: 1.8,
    borderColor: "#8A4A3B",

    borderRadius: 20,

    height: 72,

    paddingHorizontal: 18,

    fontSize: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,

    elevation: 4,
  },

  button: {
    width: "100%",

    marginTop: 28,

    backgroundColor: "#6B2416",

    height: 58,

    borderRadius: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,

    elevation: 8,
  },

  buttonText: {
    color: "#FFFFFF",

    fontSize: 19,
    fontWeight: "600",

    marginRight: 10,
  },

  sendIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },

  securityCard: {
    marginTop: 22,
    marginBottom: 25,

    borderWidth: 1.8,
    borderColor: "#8A4A3B",

    borderRadius: 22,

    paddingVertical: 18,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  securityIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  securityText: {
    color: "#4A4A4A",
    fontSize: 15,
  },
});
