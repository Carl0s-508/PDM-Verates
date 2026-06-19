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

  const { score } = useLocalSearchParams();

  const porcentagem = Number(score) || 92;

  const getResultData = () => {
    if (porcentagem >= 80) {
      return {
        titulo: "ALTA CONFIABILIDADE",
        descricao:
          "Nossa IA não encontrou indícios significativos de desinformação. O conteúdo é corroborado em diversas fontes confiáveis.",
        cor: "#2F8F2F",
        icon: require("../assets/shield-check.png"),
      };
    }

    if (porcentagem >= 50) {
      return {
        titulo: "CONFIABILIDADE MODERADA",
        descricao:
          "Nossa IA encontrou alguns indícios de inconsistência. O conteúdo possui confirmação parcial em fontes confiáveis.",
        cor: "#C46A00",
        icon: require("../assets/Shield.png"),
      };
    }

    return {
      titulo: "BAIXA CONFIABILIDADE",
      descricao:
        "Nossa IA encontrou fortes indícios de desinformação. O conteúdo não é corroborado em diversas fontes confiáveis.",
      cor: "#A00000",
      icon: require("../assets/X.png"),
    };
  };

  const result = getResultData();

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
          {/* BACK */}
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>

          {/* CARD */}
          <View style={styles.card}>
            {/* TITLE */}
            <Text style={styles.title}>Analise Concluída</Text>

            <Text style={styles.subtitle}>
              Verificamos esta informação em múltiplas fontes confiáveis.
            </Text>

            {/* RESULT */}
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

              <Text style={styles.resultDescription}>{result.descricao}</Text>
            </View>

            {/* SCORE */}
            <View style={styles.scoreArea}>
              <View style={styles.scoreHeader}>
                <Text style={styles.confidenceText}>Nível de confiança</Text>

                <Text style={[styles.scorePercentage, { color: result.cor }]}>
                  {porcentagem}%
                </Text>
              </View>

              <View style={styles.progressWrapper}>
                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${porcentagem}%`,
                        backgroundColor: result.cor,
                      },
                    ]}
                  >
                    <View style={styles.progressGlow} />
                  </View>
                </View>
              </View>
            </View>

            {/* SOURCES */}
            <View style={styles.sourcesCard}>
              <Text style={styles.sourcesTitle}>Fontes Consultadas</Text>

              <View style={styles.sourcesRow}>
                <Image
                  source={require("../assets/image.png")}
                  style={styles.sourceIcon}
                />

                <Image
                  source={require("../assets/arrowLeft.png")}
                  style={styles.arrowIcon}
                />

                <Image
                  source={require("../assets/image.png")}
                  style={styles.sourceIcon}
                />

                <Image
                  source={require("../assets/arrowLeft.png")}
                  style={styles.arrowIcon}
                />

                <Image
                  source={require("../assets/image.png")}
                  style={styles.sourceIcon}
                />
              </View>
            </View>

            {/* BUTTON */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Ver detalhes da análise</Text>

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

    alignSelf: "flex-start",

    marginBottom: isSmallDevice ? 14 : 18,
  },

  backButton: {
    fontSize: isVerySmallDevice ? 24 : 28,
    color: "#702516",
    fontWeight: "bold",
  },

  card: {
    width: "100%",
    maxWidth: 480,

    backgroundColor: "#FFFFFF",

    borderRadius: width < 380 ? 22 : 28,

    paddingHorizontal: width < 380 ? 14 : 20,
    paddingVertical: width < 380 ? 18 : 24,

    borderWidth: 2,
    borderColor: "#702516ab",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 5,

    elevation: 8,
  },

  title: {
    fontSize: isVerySmallDevice ? 22 : width < 380 ? 28 : 32,
    textAlign: "center",

    color: "#702516",

    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  subtitle: {
    marginTop: 12,

    textAlign: "center",

    color: "#555",

    fontSize: isVerySmallDevice ? 12 : width < 380 ? 13 : 15,

    lineHeight: isVerySmallDevice ? 20 : 24,
  },

  resultCard: {
    width: "100%",

    marginTop: isSmallDevice ? 20 : 28,

    backgroundColor: "#F5F5F5",

    borderRadius: width < 380 ? 18 : 24,

    borderWidth: 1.5,
    borderColor: "#702516ab",

    paddingVertical: width < 380 ? 18 : 26,
    paddingHorizontal: width < 380 ? 14 : 20,

    alignItems: "center",
  },

  iconCircle: {
    width: isSmallDevice ? 84 : 96,
    height: isSmallDevice ? 84 : 96,

    borderRadius: 999,

    borderWidth: 2,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,
  },

  resultIcon: {
    width: isSmallDevice ? 38 : 46,
    height: isSmallDevice ? 38 : 46,

    resizeMode: "contain",
  },

  resultTitle: {
    fontSize: width < 380 ? 18 : 20,
    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 10,
  },

  resultDescription: {
    fontSize: width < 380 ? 14 : 16,

    color: "#444",

    textAlign: "center",

    lineHeight: 24,
  },

  scoreArea: {
    marginTop: 28,
  },

  scoreHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },

  confidenceText: {
    fontSize: width < 380 ? 14 : 16,

    color: "#444",

    fontWeight: "600",
  },

  scorePercentage: {
    fontSize: width < 380 ? 18 : 20,

    fontWeight: "bold",
  },

  progressWrapper: {
    width: "100%",
  },

  progressBackground: {
    width: "100%",

    height: 16,

    backgroundColor: "#E0E0E0",

    borderRadius: 999,

    overflow: "hidden",

    borderWidth: 1,
    borderColor: "#D2D2D2",
  },

  progressFill: {
    height: "100%",

    borderRadius: 999,

    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 3,
  },

  progressGlow: {
    position: "absolute",

    right: 0,
    top: 0,
    bottom: 0,

    width: 18,

    backgroundColor: "rgba(255,255,255,0.35)",

    borderRadius: 999,
  },

  sourcesCard: {
    width: "100%",

    marginTop: 28,

    backgroundColor: "#F5F5F5",

    borderRadius: 22,

    borderWidth: 1.5,
    borderColor: "#702516ab",

    padding: 20,
  },

  sourcesTitle: {
    fontSize: width < 380 ? 15 : 17,

    fontWeight: "bold",

    color: "#444",

    marginBottom: 22,
  },

  sourcesRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  sourceIcon: {
    width: isVerySmallDevice ? 28 : width < 380 ? 34 : 40,
    height: isVerySmallDevice ? 28 : width < 380 ? 34 : 40,

    resizeMode: "contain",
  },

  arrowIcon: {
    width: isVerySmallDevice ? 14 : 20,
    height: isVerySmallDevice ? 14 : 20,

    resizeMode: "contain",

    marginHorizontal: isVerySmallDevice ? 6 : 10,

    tintColor: "#222",
  },

  button: {
    width: "100%",

    marginTop: isSmallDevice ? 22 : 30,

    backgroundColor: "#8B3A2E",

    borderRadius: 999,

    paddingVertical: isVerySmallDevice ? 14 : 18,
    paddingHorizontal: 14,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",

    fontSize: isVerySmallDevice ? 14 : width < 380 ? 16 : 18,

    fontWeight: "600",

    marginRight: 8,

    textAlign: "center",
  },

  buttonArrowIcon: {
    width: isVerySmallDevice ? 18 : 22,
    height: isVerySmallDevice ? 18 : 22,

    resizeMode: "contain",

    tintColor: "#FFF",
  },
});
