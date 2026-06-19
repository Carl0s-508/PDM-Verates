import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { dbSelectUserAnalises, Analise } from "../database/databaseInit";

export default function Verificacoes() {
  const db = useSQLiteContext();
  const [historico, setHistorico] = useState<Analise[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const mockUserId = "user_logado_id"; 
        const dados = await dbSelectUserAnalises(db, mockUserId);
        setHistorico(dados);
      } catch (error) {
        console.error("Erro ao buscar histórico do banco:", error);
      }
    }
    carregarDados();
  }, [db]);

  // Usamos 'any' aqui para que o TypeScript aceite o resultado do banco sem travar a tipagem
  function getStatusColor(status: any) {
    const statusStr = String(status || "");
    if (statusStr.includes("Alta")) return "#28A745";
    if (statusStr.includes("Moderada")) return "#FFC107";
    return "#DC3545";
  }

  return (
    <ImageBackground source={require("../assets/Background.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => router.back()}>
            <Text style={styles.backButton}>{"<"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Suas verificações{"\n"}recentes</Text>

          <FlatList
            data={historico}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", color: "#666", marginTop: 20 }}>
                Nenhuma análise encontrada no histórico.
              </Text>
            }
renderItem={({ item }: { item: any }) => (
              <View style={styles.newsCard}>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  {item.link || item.resultado || "Análise de Texto Sem Link"}
                </Text>

                <View style={styles.statusRow}>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.result || item.resultado) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(item.result || item.resultado) }]}>
                    {item.result || item.resultado || "Pendente"}
                  </Text>
                </View>

                <Text style={styles.dateText}>
                  {item.created_at ? new Date(item.created_at).toLocaleDateString("pt-BR") : ""}
                </Text> 
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButtonContainer: {
    padding: 10,
    width: 40,
  },
  backButton: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  newsCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#edf2f7",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#a0aec0",
  },
});