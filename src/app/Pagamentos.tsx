import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useRef, useState } from "react";

// Imports do banco de dados SQLite
import { useSQLiteContext } from "expo-sqlite";
import { dbUpdateUserPlano } from "../database/databaseInit";

// Tipo das animações que o TypeScript precisa reconhecer
type AnimMap = {
  [key: string]: Animated.Value;
};

const { width, height } = Dimensions.get("window");
const isSmallDevice = width < 380;
const isVerySmallHeight = height < 700;

// 3. SEU COMPONENTE COMEÇA AQUI
export default function Pagamentos() {
  const [selected, setSelected] = useState<string>("Cartão");
  
const { plano, preco } = useLocalSearchParams();

  const animations = useRef<AnimMap>({}).current;
  
  const db = useSQLiteContext();
  
  async function handleConfirmarPagamento() {
    try {
      const mockUserId = "user_logado_id"; // O mesmo ID que você usou no cadastro
      
      // Valida se o parâmetro veio como Array e converte para string
      const planoString = Array.isArray(plano) ? plano[0] : plano;
      const novoPlanoSelecionado = planoString || "Plus";
      
      // Atualiza o plano no banco SQLite de verdade
      await dbUpdateUserPlano(db, mockUserId, novoPlanoSelecionado);
      
      Alert.alert("Sucesso", `Assinatura do plano ${novoPlanoSelecionado} ativada com sucesso!`, [
        { text: "OK", onPress: () => router.replace("/inicialScreen" as any) }
      ]);
    } catch (error) {
      console.error("Erro ao atualizar o plano no banco:", error);
      Alert.alert("Erro", "Não foi possível processar a alteração do plano.");
    }
  }

  const pagamentos = [
    {
      nome: "Cartão de crédito",
      key: "Cartão",
      descricao: "Parcelado em até 6x vezes sem juros.",
      icon: require("../assets/Visa.png"),
      extra: require("../assets/Nubank.png"),
    },
    {
      nome: "PIX",
      key: "Pix",
      descricao: "Pagamento instantâneo via agência.",
      icon: require("../assets/Pix.png"),
    },
    {
      nome: "Pix parcelado",
      key: "PixParcelado",
      descricao: "Pagamento instantâneo via agência, parcelado",
      icon: require("../assets/Pix-Parcelado.png"),
    },
    {
      nome: "Boleto",
      key: "Boleto",
      descricao: "Forma de boleto, para imprimir e pagar.",
      icon: require("../assets/Boleto.png"),
    },
  ];

  function getAnim(nome: string) {
    if (!animations[nome]) {
      animations[nome] = new Animated.Value(nome === selected ? 1 : 0);
    }
    return animations[nome];
  }

  function selecionar(nome: string) {
    if (nome === selected) return;

    setSelected(nome);

    Object.keys(animations).forEach((key) => {
      Animated.timing(animations[key], {
        toValue: key === nome ? 1 : 0,
        duration: 220,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  }

  function escolherPagamento() {
    router.replace("/inicialScreen");
  }

  return (
    <ImageBackground
      source={require("../assets/Background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              <Image
                source={require("../assets/Logo.png")}
                style={styles.logo}
              />

              <Text style={styles.title}>Forma de pagamento</Text>

              <View style={styles.resumo}>
                <Text style={styles.resumoText}>
                  {plano ?? "Plano"} • {preco ?? ""}
                </Text>
              </View>

              <View style={styles.lista}>
                {pagamentos.map((item) => {
                  const anim = getAnim(item.key);
                  const isActive = selected === item.key;

                  const scale = anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.02],
                  });

                  const bgColor = anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["#f2f2f2", "#f7d64363"],
                  });

                  return (
                    <TouchableOpacity
                      key={item.key}
                      activeOpacity={0.9}
                      onPress={() => selecionar(item.key)}
                    >
                      <Animated.View
                        style={[
                          styles.item,
                          {
                            transform: [{ scale }],
                            backgroundColor: bgColor,
                            borderColor: isActive ? "#3d120a" : "#702516",
                          },
                        ]}
                      >
                        <View
                          style={[styles.radio, isActive && styles.radioActive]}
                        />

                        <View style={styles.info}>
                          <Text style={styles.nome}>{item.nome}</Text>

                          <Text style={styles.descricao}>{item.descricao}</Text>
                        </View>

                        <View style={styles.icons}>
                          {item.extra && (
                            <Image
                              source={item.extra}
                              style={styles.iconSmall}
                            />
                          )}

                          <Image source={item.icon} style={styles.icon} />
                        </View>
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.botao}
                onPress={escolherPagamento}
              >
                <Text style={styles.botaoTexto}>Continuar</Text>
              </TouchableOpacity>

              <Text style={styles.footer}>VERATES.IA</Text>
            </View>
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
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: isVerySmallHeight ? 20 : 30,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  card: {
    width: "100%",
    maxWidth: 420,

    backgroundColor: "#fff",

    borderRadius: 20,

    paddingVertical: isSmallDevice ? 18 : 24,
    paddingHorizontal: isSmallDevice ? 14 : 18,

    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 6,
  },

  logo: {
    width: isSmallDevice ? 58 : 70,
    height: isSmallDevice ? 58 : 70,

    resizeMode: "contain",

    marginBottom: 10,
  },

  title: {
    fontSize: isSmallDevice ? 20 : 22,

    fontWeight: "900",

    color: "#702516",

    marginBottom: 12,

    textAlign: "center",
  },

  resumo: {
    backgroundColor: "#f7d64330",

    paddingVertical: 7,
    paddingHorizontal: 14,

    borderRadius: 10,

    marginBottom: 18,
  },

  resumoText: {
    color: "#702516",

    fontWeight: "600",

    fontSize: isSmallDevice ? 12 : 13,

    textAlign: "center",
  },

  lista: {
    width: "100%",
    gap: 12,
  },

  item: {
    flexDirection: "row",

    borderRadius: 14,

    paddingVertical: isSmallDevice ? 12 : 14,
    paddingHorizontal: isSmallDevice ? 10 : 14,

    borderWidth: 1.5,

    alignItems: "center",
  },

  radio: {
    width: 20,
    height: 20,

    borderRadius: 10,

    borderWidth: 2,
    borderColor: "#702516",

    marginRight: 10,
  },

  radioActive: {
    backgroundColor: "#702516",
    borderColor: "#f2c200",
  },

  info: {
    flex: 1,
    paddingRight: 8,
  },

  nome: {
    fontSize: isSmallDevice ? 14 : 16,

    fontWeight: "bold",

    color: "#222",
  },

  descricao: {
    fontSize: isSmallDevice ? 11 : 12,

    color: "#333",

    marginTop: 2,

    lineHeight: isSmallDevice ? 16 : 18,
  },

  icons: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: isSmallDevice ? 28 : 32,
    height: isSmallDevice ? 28 : 32,

    resizeMode: "contain",
  },

  iconSmall: {
    width: isSmallDevice ? 22 : 26,
    height: isSmallDevice ? 22 : 26,

    resizeMode: "contain",

    marginRight: 6,
  },

  botao: {
    backgroundColor: "#702516",

    borderRadius: 14,

    paddingVertical: isSmallDevice ? 14 : 16,

    width: "100%",

    alignItems: "center",

    marginTop: 22,

    borderWidth: 1.5,
    borderColor: "#3d120a",
  },

  botaoTexto: {
    color: "#fff",

    fontWeight: "bold",

    fontSize: isSmallDevice ? 15 : 16,
  },

  footer: {
    marginTop: 18,

    fontSize: isSmallDevice ? 14 : 16,

    color: "#702516",

    fontWeight: "bold",
  },
});
