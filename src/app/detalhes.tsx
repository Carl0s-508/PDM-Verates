import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Detalhes() {
  const router = useRouter();

  const { data } = useLocalSearchParams();

  const analise = data ? JSON.parse(data as string) : null;

  if (!analise) {
    return (
      <View style={styles.center}>
        <Text>Nenhuma análise encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🔍 Detalhes da Análise</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Resumo</Text>
        <Text style={styles.text}>{analise.resumo}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Veracidade</Text>
        <Text style={styles.text}>
          {String(analise.veracidade)}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Confiabilidade</Text>
        <Text style={styles.text}>
          {analise.confiabilidade}
        </Text>
      </View>

      {Array.isArray(analise.alertas) && (
        <View style={styles.card}>
          <Text style={styles.label}>Alertas</Text>

          {analise.alertas.length === 0 ? (
            <Text style={styles.text}>Nenhum alerta</Text>
          ) : (
            analise.alertas.map((a: string, i: number) => (
              <Text key={i} style={styles.text}>
                • {a}
              </Text>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  back: {
    fontSize: 18,
    marginBottom: 20,
    color: "#702516",
    fontWeight: "bold",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#702516",
  },

  text: {
    color: "#333",
    lineHeight: 20,
  },
});