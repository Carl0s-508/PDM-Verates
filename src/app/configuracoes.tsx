import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { router } from "expo-router";

const PRIMARY = "#702516";

export default function Configuracoes() {
  const { width, height } = useWindowDimensions();

  const isSmall = height < 700;
  const isVerySmall = height < 620;

  const scale = (size: number) => {
    const base = width / 390; // base iPhone padrão
    return Math.round(size * base);
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.close, { fontSize: scale(22) }]}>✕</Text>
        </TouchableOpacity>

        <Text style={[styles.title, { fontSize: scale(18) }]}>
          Configurações
        </Text>

        <View style={{ width: scale(24) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scale(30) }}
      >

        {/* CARD */}
        <View style={styles.card}>
          <Text style={[styles.section, { fontSize: scale(12) }]}>
            CONTA
          </Text>

          <Item label="Perfil" onPress={() => router.push("/perfil")} scale={scale} />
          <Item label="Segurança e login" scale={scale} />
          <Item label="Contato confiável" scale={scale} />
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={[styles.section, { fontSize: scale(12) }]}>
            APLICATIVO
          </Text>

          <Item label="Aparência" value="Sistema" scale={scale} />
          <Item label="Idioma" value="Automático" scale={scale} />
          <Item label="Notificações" scale={scale} />
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={[styles.section, { fontSize: scale(12) }]}>
            PRIVACIDADE
          </Text>

          <Item label="Controles de dados" scale={scale} />
          <Item label="Proteções" scale={scale} />
          <Item label="Controles parentais" scale={scale} />
        </View>

        {/* PREMIUM */}
        <View style={styles.premium}>
          <Text style={[styles.premiumTitle, { fontSize: scale(16) }]}>
            VERATES PLUS
          </Text>

          <Text style={[styles.premiumDesc, { fontSize: scale(12) }]}>
            Tenha acesso a recursos avançados e experiência completa.
          </Text>

          <TouchableOpacity
            style={styles.premiumButton}
            onPress={() => router.push("/planos")}
          >
            <Text style={[styles.premiumButtonText, { fontSize: scale(14) }]}>
              Assinar agora
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

/* ITEM RESPONSIVO */
function Item({ label, value, onPress, scale }: any) {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          paddingVertical: scale(12),
          paddingHorizontal: scale(12),
          borderRadius: scale(10),
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.itemText, { fontSize: scale(14) }]}>
        {label}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {value && (
          <Text style={[styles.value, { fontSize: scale(12) }]}>
            {value}
          </Text>
        )}
        <Text style={[styles.arrow, { fontSize: scale(18) }]}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  close: {
    color: PRIMARY,
    fontWeight: "900",
  },

  title: {
    fontWeight: "900",
    color: PRIMARY,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 2,
    borderColor: "#7025168f",
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  section: {
    color: PRIMARY,
    fontWeight: "900",
    marginBottom: 10,
    letterSpacing: 1,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    marginBottom: 8,
  },

  itemText: {
    color: "#333",
    fontWeight: "600",
  },

  arrow: {
    color: PRIMARY,
    fontWeight: "900",
  },

  value: {
    color: "#777",
    marginRight: 6,
    fontWeight: "600",
  },

  premium: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    marginBottom: 30,
  },

  premiumTitle: {
    color: PRIMARY,
    fontWeight: "900",
    marginBottom: 6,
  },

  premiumDesc: {
    color: "#666",
    marginBottom: 12,
  },

  premiumButton: {
    backgroundColor: PRIMARY,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  premiumButtonText: {
    color: "#FFF",
    fontWeight: "900",
  },
});