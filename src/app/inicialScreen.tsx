import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
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
const isVerySmallDevice = height < 620;

export default function Verificar() {
  const router = useRouter();

  const sidebarAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const [open, setOpen] = useState(false);

  const openSidebar = () => {
    setOpen(true);

    Animated.parallel([
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),

      Animated.timing(overlayOpacity, {
        toValue: 0.4,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarAnim, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: false,
      }),

      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => setOpen(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/Background.png")}
        style={styles.background}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity onPress={openSidebar}>
                <Text style={styles.menuIcon}>☰</Text>
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
            <View style={styles.centerWrapper}>
              <View style={styles.card}>
                <Text style={styles.title}>Como deseja verificar?</Text>

                <Text style={styles.subtitle}>
                  Escolha o tipo de conteúdo para analisarmos a veracidade.
                </Text>

                {/* LINK */}
                <TouchableOpacity
                  style={styles.optionCard}
                  onPress={() => router.push("/analisarLink" as any)}
                >
                  <Image
                    source={require("../assets/paperclip.png")}
                    style={styles.icon}
                  />

                  <View style={styles.optionTextContainer}>
                    <Text style={styles.cardTitle}>Analisar link</Text>

                    <Text style={styles.cardSubtitle}>
                      Cole o link de uma notícia{"\n"}ou página
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* TEXTO */}
                <TouchableOpacity style={styles.optionCard}>
                  <Image
                    source={require("../assets/textT.png")}
                    style={styles.icon}
                  />

                  <View style={styles.optionTextContainer}>
                    <Text style={styles.cardTitle}>Analisar texto</Text>

                    <Text style={styles.cardSubtitle}>
                      Cole ou digite o conteúdo
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* IMAGEM */}
                <TouchableOpacity style={styles.optionCard}>
                  <Image
                    source={require("../assets/image.png")}
                    style={styles.icon}
                  />

                  <View style={styles.optionTextContainer}>
                    <Text style={styles.cardTitle}>Analisar imagem</Text>

                    <Text style={styles.cardSubtitle}>
                      Envie ou cole uma imagem
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* FOOTER */}
              <View style={styles.footerCard}>
                <Image
                  source={require("../assets/shield-check.png")}
                  style={styles.footerIcon}
                />

                <Text style={styles.footerText}>
                  Nossa IA verifica múltiplas fontes confiáveis no mundo todo
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      {/* OVERLAY */}
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={closeSidebar} />
      </Animated.View>

      {/* SIDEBAR */}
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[styles.sidebar, { left: sidebarAnim }]}
      >
        {/* FECHAR */}
        <TouchableOpacity onPress={closeSidebar}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>

        {/* PERFIL */}
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => {
            closeSidebar();
            router.push("/perfil" as any);
          }}
        >
          <Image
            source={require("../assets/profile.png")}
            style={styles.profileImage}
          />

          <View>
            <Text style={styles.profileName}>Afonso Filho</Text>

            <Text style={styles.profilePlan}>Plano Gratuito</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sidebarTitle}>Menu</Text>

        {/* HISTÓRICO */}
        <TouchableOpacity
          style={styles.sidebarCard}
          onPress={() => {
            closeSidebar();
            router.push("/historico" as any);
          }}
        >
          <Image
            source={require("../assets/history.png")}
            style={styles.sidebarImageIcon}
          />

          <Text style={styles.sidebarText}>Histórico</Text>
        </TouchableOpacity>

        {/* VERIFICAÇÕES */}
        <TouchableOpacity
          style={styles.sidebarCard}
          onPress={() => {
            closeSidebar();
            router.push("/verificadas" as any);
          }}
        >
          <Image
            source={require("../assets/verified.png")}
            style={styles.sidebarImageIcon}
          />

          <Text style={styles.sidebarText}>Verificações</Text>
        </TouchableOpacity>

        {/* CONFIGURAÇÕES */}
        <TouchableOpacity
          style={styles.sidebarCard}
          onPress={() => {
            closeSidebar();
            router.push("/configuracoes" as any);
          }}
        >
          <Image
            source={require("../assets/settings.png")}
            style={styles.sidebarImageIcon}
          />

          <Text style={styles.sidebarText}>Configurações</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: isVerySmallDevice ? 16 : 24,
    paddingTop: isVerySmallDevice ? 18 : 32,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuIcon: {
    fontSize: isSmallDevice ? 30 : 34,
    color: "#702516",
  },

  plusButton: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1.5,
    borderColor: "#702516",

    borderRadius: 28,

    paddingHorizontal: isSmallDevice ? 16 : 20,
    paddingVertical: isSmallDevice ? 8 : 10,
  },

  plusIcon: {
    width: isSmallDevice ? 18 : 20,
    height: isSmallDevice ? 18 : 20,
    marginRight: 6,
    tintColor: "#702516",
  },

  plusText: {
    color: "#702516",
    fontWeight: "bold",
    fontSize: isSmallDevice ? 14 : 16,
  },

  centerWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: isVerySmallDevice ? 18 : 28,
  },

  card: {
    width: "100%",
    maxWidth: 480,

    backgroundColor: "#ffffff",

    borderRadius: 24,

    paddingVertical: isVerySmallDevice ? 22 : 32,
    paddingHorizontal: isVerySmallDevice ? 18 : 24,

    elevation: 8,

    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },

    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  title: {
    fontSize: isVerySmallDevice ? 22 : 26,
    color: "#702516",
    textAlign: "center",

    marginBottom: 12,

    fontWeight: "bold",

    letterSpacing: 1.5,
  },

  subtitle: {
    fontSize: isVerySmallDevice ? 14 : 16,
    color: "#666",

    textAlign: "center",

    marginBottom: isVerySmallDevice ? 20 : 28,

    letterSpacing: 0.5,

    lineHeight: isVerySmallDevice ? 22 : 24,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#d9d9d98d",

    borderRadius: 20,

    padding: isVerySmallDevice ? 16 : 20,

    marginBottom: 18,

    borderWidth: 1.5,
    borderColor: "#702516aa",

    width: "100%",
  },

  optionTextContainer: {
    flex: 1,
  },

  icon: {
    width: isVerySmallDevice ? 36 : 44,
    height: isVerySmallDevice ? 36 : 44,
    marginRight: 16,
  },

  cardTitle: {
    fontSize: isVerySmallDevice ? 16 : 18,
    fontWeight: "bold",
    color: "#702516",
    letterSpacing: 1,
  },

  cardSubtitle: {
    fontSize: isVerySmallDevice ? 13 : 15,
    color: "#444",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  footerCard: {
    marginTop: 20,

    backgroundColor: "#ffffff",

    borderRadius: 20,

    paddingVertical: isVerySmallDevice ? 12 : 14,
    paddingHorizontal: isVerySmallDevice ? 14 : 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1.5,
    borderColor: "#8B3A2E",

    width: "100%",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },

    shadowOpacity: 0.25,
    shadowRadius: 5,
  },

  footerIcon: {
    width: isVerySmallDevice ? 18 : 22,
    height: isVerySmallDevice ? 18 : 22,
    marginRight: 8,
    tintColor: "#282828",
  },

  footerText: {
    fontSize: isVerySmallDevice ? 12 : 14,
    color: "#555",

    textAlign: "center",

    letterSpacing: 0.5,

    maxWidth: 260,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "#000",

    zIndex: 5,
  },

  sidebar: {
    position: "absolute",

    top: 0,
    bottom: 0,

    width: width * 0.8,

    backgroundColor: "#fff",

    padding: isVerySmallDevice ? 20 : 28,

    zIndex: 10,
  },

  close: {
    fontSize: 28,
    alignSelf: "flex-end",
  },

  sidebarTitle: {
    fontSize: isVerySmallDevice ? 22 : 26,
    fontWeight: "bold",

    marginVertical: 28,

    color: "#702516",
  },

  sidebarCard: {
    flexDirection: "row",
    alignItems: "center",

    padding: isVerySmallDevice ? 14 : 16,

    borderRadius: 16,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: "#ddd",
  },

  sidebarText: {
    fontSize: isVerySmallDevice ? 15 : 17,
    color: "#333",
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 10,
    marginBottom: 30,

    paddingBottom: 20,

    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  profileImage: {
    width: isVerySmallDevice ? 52 : 60,
    height: isVerySmallDevice ? 52 : 60,

    borderRadius: 30,

    marginRight: 12,
  },

  profileName: {
    fontSize: isVerySmallDevice ? 16 : 18,
    fontWeight: "bold",
    color: "#702516",
  },

  profilePlan: {
    fontSize: isVerySmallDevice ? 12 : 14,
    color: "#777",
  },

  sidebarImageIcon: {
    width: isVerySmallDevice ? 20 : 24,
    height: isVerySmallDevice ? 20 : 24,

    marginRight: 12,

    resizeMode: "contain",
  },
});
