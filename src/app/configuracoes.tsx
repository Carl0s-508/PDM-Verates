
import { router } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type SidebarProps = {
  onClose: () => void;
  username?: string;
  email?: string;
  /** Rota atualmente ativa, para destacar o item correspondente */
  activeRoute?: "historico" | "verificadas";
};

export default function Sidebar({
  onClose,
  username = "UserName",
  email = "user1@gmail.com",
  activeRoute = "historico",
}: SidebarProps) {
  function irPara(rota: string) {
    onClose();
    router.push(rota as any);
  }

  return (
    <View style={styles.sidebar}>
      {/* TOPO: FECHAR + PLUS */}
      <View style={styles.topRow}>
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => irPara("/planos")}
        >
          <Text style={styles.crown}>♛</Text>
          <Text style={styles.plusText}>Plus</Text>
        </TouchableOpacity>
      </View>

      {/* HISTÓRICO */}
      <TouchableOpacity
        style={[
          styles.menuButton,
          activeRoute === "historico" && styles.menuButtonActive,
        ]}
        activeOpacity={0.85}
        onPress={() => irPara("/historico")}
      >
        <Text
          style={[
            styles.menuButtonText,
            activeRoute === "historico" && styles.menuButtonTextActive,
          ]}
        >
          Histórico
        </Text>

        <Text
          style={[
            styles.menuIcon,
            activeRoute === "historico" && styles.menuIconActive,
          ]}
        >
          📶
        </Text>
      </TouchableOpacity>

      {/* VERIFICADAS */}
      <TouchableOpacity
        style={[
          styles.menuButton,
          activeRoute === "verificadas" && styles.menuButtonActive,
        ]}
        activeOpacity={0.85}
        onPress={() => irPara("/verificadas")}
      >
        <Text
          style={[
            styles.menuButtonText,
            activeRoute === "verificadas" && styles.menuButtonTextActive,
          ]}
        >
          Verificadas
        </Text>

        <View style={styles.checkbox}>
          <Text style={styles.checkboxMark}>✓</Text>
        </View>
      </TouchableOpacity>

      {/* ESPAÇO FLEXÍVEL */}
      <View style={{ flex: 1 }} />

      {/* PERFIL */}
      <TouchableOpacity
        style={styles.profileSection}
        activeOpacity={0.85}
        onPress={() => irPara("/perfil")}
      >
        <View style={styles.avatarBox}>
          <Text style={styles.avatarIcon}>⛉</Text>
        </View>

        <View style={styles.fieldsColumn}>
          <View style={styles.fieldBox}>
            <Text style={styles.fieldText}>{username}</Text>
          </View>

          <View style={styles.fieldBox}>
            <Text style={styles.fieldText}>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const GOLD = "#f2c200";
const DARK_GOLD_BORDER = "#8a6d1a";
const SIDEBAR_BG = "#5c5c5c";

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    width: "100%",

    backgroundColor: SIDEBAR_BG,

    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 24,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 22,
  },

  closeIcon: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },

  plusButton: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1.5,
    borderColor: GOLD,

    borderRadius: 20,

    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  crown: {
    fontSize: 13,
    color: GOLD,
    marginRight: 5,
  },

  plusText: {
    color: GOLD,
    fontWeight: "bold",
    fontSize: 13,
  },

  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#3a3a3a",

    borderRadius: 18,

    borderWidth: 1.5,
    borderColor: DARK_GOLD_BORDER,

    paddingVertical: 14,
    paddingHorizontal: 18,

    marginBottom: 14,
  },

  menuButtonActive: {
    backgroundColor: GOLD,
    borderColor: "#9c7a00",
  },

  menuButtonText: {
    color: GOLD,
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },

  menuButtonTextActive: {
    color: "#3a2a00",
  },

  menuIcon: {
    fontSize: 16,
  },

  menuIconActive: {
    opacity: 0.85,
  },

  checkbox: {
    width: 22,
    height: 22,

    borderRadius: 4,

    backgroundColor: GOLD,

    justifyContent: "center",
    alignItems: "center",
  },

  checkboxMark: {
    color: "#3a2a00",
    fontWeight: "bold",
    fontSize: 13,
  },

  profileSection: {
    flexDirection: "row",
    alignItems: "flex-end",

    gap: 10,
  },

  avatarBox: {
    width: 46,
    height: 46,

    borderRadius: 8,

    backgroundColor: "#3a3a3a",

    borderWidth: 1.5,
    borderColor: GOLD,

    justifyContent: "center",
    alignItems: "center",
  },

  avatarIcon: {
    fontSize: 20,
    color: GOLD,
  },

  fieldsColumn: {
    flex: 1,
    gap: 8,
  },

  fieldBox: {
    backgroundColor: "#3a3a3a",

    borderRadius: 8,

    borderWidth: 1.5,
    borderColor: "#8a392c",

    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  fieldText: {
    color: GOLD,
    fontSize: 13,
  },
});