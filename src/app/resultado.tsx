import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const isSmallDevice = height < 700;
const isVerySmallDevice = width < 360;

export default function ResultadoAnalise() {
  const router = useRouter();

  const { resultado } = useLocalSearchParams();

  // 🔥 CONVERTE JSON VINDO DO FRONT
  const data = resultado ? JSON.parse(resultado as string) : null;

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sem dados de análise</Text>
      </View>
    );
  }

  // 🔥 NORMALIZA CAMPOS DA IA
  const confianca =
    typeof data.confiabilidade === "number"
      ? data.confiabilidade
      : 70;

  const isAlta = data.veracidade === true || data.veracidade === "true";

  const result = {
    titulo: isAlta
      ? "ALTA CONFIABILIDADE"
      : "VERIFICAÇÃO NECESSÁRIA",

    descricao: data.resumo || "Sem resumo disponível.",

    cor: isAlta ? "#2F8F2F" : "#C46A00",

    icon: isAlta
      ? require("../assets/shield-check.png")
      : require("../assets/Shield.png"),
  };

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
    >
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* BACK BUTTON */}
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>

          {/* CARD PRINCIPAL */}
          <View style={styles.card}>
            <Text style={styles.title}>Análise Concluída</Text>

            <Text style={styles.subtitle}>
              Resultado baseado na análise da IA
            </Text>

            {/* RESULTADO */}
            <View style={styles.resultCard}>
              <View
                style={[
                  styles.iconCircle,
                  {
                    borderColor: result.cor,
                    backgroundColor: `${result.cor}20`,
                  },
                ]}
              >
                <Image
                  source={result.icon}
                  style={[styles.resultIcon, { tintColor: result.cor }]}
                />
              </View>

              <Text style={[styles.resultTitle, { color: result.cor }]}>
                {result.titulo}
              </Text>

              <Text style={styles.resultDescription}>
                {result.descricao}
              </Text>
            </View>

            {/* CONFIANÇA */}
            <View style={styles.scoreArea}>
              <View style={styles.scoreHeader}>
                <Text style={styles.confidenceText}>
                  Nível de confiança
                </Text>

                <Text style={[styles.scorePercentage, { color: result.cor }]}>
                  {confianca}%
                </Text>
              </View>

              <View style={styles.progressWrapper}>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${confianca}%`,
                        backgroundColor: result.cor,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* ALERTAS */}
            {Array.isArray(data.alertas) && data.alertas.length > 0 && (
              <View style={styles.sourcesCard}>
                <Text style={styles.sourcesTitle}>Alertas da IA</Text>

                {data.alertas.map((item: string, index: number) => (
                  <Text key={index} style={styles.alertText}>
                    • {item}
                  </Text>
                ))}
              </View>
            )}

            {/* BOTÃO */} 
           <TouchableOpacity
  style={styles.button}
  onPress={() =>
    router.push({
      pathname: "/detalhes",
      params: {
        data: JSON.stringify(data),
      },
    })
  }
>
              <Text style={styles.buttonText}>
                Ver detalhes da análise
              </Text>

              <Image
                source={require("../assets/send.png")}
                style={styles.buttonArrowIcon}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  scroll: {
    paddingHorizontal: width < 380 ? 14 : 20,
    paddingTop: isSmallDevice ? 12 : 18,
    paddingBottom: 40,
    alignItems: "center",
  },

  backButtonContainer: {
    width: isVerySmallDevice ? 48 : 55,
    height: isVerySmallDevice ? 48 : 55,
    borderRadius: 999,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#702516",
    alignSelf: "flex-start",
    marginBottom: 18,
  },

  backButton: {
    fontSize: 28,
    color: "#702516",
    fontWeight: "bold",
  },

  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 20,
    borderWidth: 2,
    borderColor: "#702516aa",
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    color: "#702516",
    fontWeight: "bold",
  },

  subtitle: {
    textAlign: "center",
    color: "#555",
    marginTop: 10,
    marginBottom: 20,
  },

  resultCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 999,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  resultIcon: {
    width: 42,
    height: 42,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  resultDescription: {
    textAlign: "center",
    color: "#444",
  },

  scoreArea: {
    marginTop: 25,
  },

  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  confidenceText: {
    fontSize: 15,
    fontWeight: "600",
  },

  scorePercentage: {
    fontSize: 18,
    fontWeight: "bold",
  },

  progressWrapper: {
    marginTop: 10,
  },

  progressBackground: {
    height: 14,
    backgroundColor: "#ddd",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
  },

  sourcesCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },

  sourcesTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  alertText: {
    color: "#333",
    marginBottom: 5,
  },

  button: {
    marginTop: 25,
    backgroundColor: "#8B3A2E",
    padding: 15,
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 8,
  },

  buttonArrowIcon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
});