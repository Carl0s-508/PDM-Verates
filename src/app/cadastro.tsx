import SocialButton from "./componentes/socialButton";

import {
  Alert,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { dbInsertUser } from "../database/databaseInit";

const { width, height } = Dimensions.get("window");

const isSmallDevice = height < 700;
const isVerySmallDevice = height < 620;

export default function Cadastro() {
  const db = useSQLiteContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const [scrollEnabled, setScrollEnabled] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    senha: "",
    confirmSenha: "", 
  });

async function handleCadastro() {
  let newErrors = {
    username: "",
    email: "",
    senha: "",
    confirmSenha: "",
  };

  if (!username.trim()) newErrors.username = "Nome obrigatório";
  if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "E-mail inválido";
  if (senha.length < 6) newErrors.senha = "Mínimo de 6 caracteres";
  if (senha !== confirmSenha) newErrors.confirmSenha = "As senhas não coincidem";

  setErrors(newErrors);

  if (Object.values(newErrors).every((x) => x === "")) {
    try {
      // Cria um ID único simulado para o banco de dados (ex: usar timestamp)
      const userId = "usr_" + Date.now();

      // Salva os dados na tabela 'users' do SQLite
      await dbInsertUser(db, userId, username, email);

      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        {
          text: "OK",
          onPress: () => router.replace("/inicialScreen" as any),
        },
      ]);
    } catch (error) {
      console.error("Erro ao salvar usuário no banco:", error);
      Alert.alert("Erro", "Não foi possível salvar o usuário localmente.");
    }
  }
}

  const hasErrors = Object.values(errors).some((e) => e);

  const isDisabled =
    !username || !email || !senha || !confirmSenha || hasErrors;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingVertical: isVerySmallDevice ? 25 : 40,
        }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={(w, h) => {
          setScrollEnabled(h > Dimensions.get("window").height);
        }}
        keyboardShouldPersistTaps="handled"
      >
        <ImageBackground
          source={require("../assets/Background.png")}
          style={styles.background}
        >
          <View style={styles.card}>
            <Image source={require("../assets/Logo.png")} style={styles.logo} />

            <Text style={styles.title}>VERATES.IA</Text>

            <View style={styles.forms}>
              <Text style={styles.label}>Nome de Usuário</Text>

              <TextInput
                placeholder="Digite seu nome"
                placeholderTextColor="#777"
                style={[styles.input, errors.username && styles.inputError]}
                value={username}
                onChangeText={(t) => {
                  setUsername(t);
                  setErrors({ ...errors, username: "" });
                }}
              />

              {!!errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <Text style={styles.label}>E-mail</Text>

              <TextInput
                placeholder="Digite seu e-mail"
                placeholderTextColor="#777"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  setErrors({ ...errors, email: "" });
                }}
              />

              {!!errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Senha</Text>

              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor="#777"
                secureTextEntry
                style={[styles.input, errors.senha && styles.inputError]}
                value={senha}
                onChangeText={(t) => {
                  setSenha(t);
                  setErrors({ ...errors, senha: "" });
                }}
              />

              {!!errors.senha && (
                <Text style={styles.errorText}>{errors.senha}</Text>
              )}

              <Text style={styles.label}>Confirmar Senha</Text>

              <TextInput
                placeholder="Confirme sua senha"
                placeholderTextColor="#777"
                secureTextEntry
                style={[styles.input, errors.confirmSenha && styles.inputError]}
                value={confirmSenha}
                onChangeText={(t) => {
                  setConfirmSenha(t);
                  setErrors({ ...errors, confirmSenha: "" });
                }}
              />

              {!!errors.confirmSenha && (
                <Text style={styles.errorText}>{errors.confirmSenha}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, isDisabled && styles.buttonDisabled]}
                onPress={handleCadastro}
                disabled={isDisabled}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push("/")}>
                <Text style={styles.loginText}>
                  Já possui uma conta? Faça seu login.
                </Text>
              </TouchableOpacity>

              <View style={styles.separatorContainer}>
                <View style={styles.line} />

                <Text style={styles.separatorText}>OU</Text>

                <View style={styles.line} />
              </View>

              <View style={styles.socialContainer}>
                <SocialButton
                  source={require("../assets/Google.png")}
                  text="Google"
                  onPress={() => Alert.alert("Google")}
                />

                <SocialButton
                  source={require("../assets/Apple.png")}
                  text="Apple"
                  onPress={() => Alert.alert("Apple")}
                />

                <SocialButton
                  source={require("../assets/Facebook.png")}
                  text="Facebook"
                  onPress={() => Alert.alert("Facebook")}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,

    resizeMode: "cover",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 14,
  },

  card: {
    width: "100%",
    maxWidth: 400,

    backgroundColor: "#ffffff",

    borderRadius: isSmallDevice ? 18 : 22,

    paddingVertical: isVerySmallDevice ? 18 : 25,
    paddingHorizontal: isVerySmallDevice ? 12 : 15,

    elevation: 5,

    alignItems: "center",

    borderWidth: 2,
    borderColor: "#702516e4",

    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  logo: {
    width: isVerySmallDevice ? 65 : 80,
    height: isVerySmallDevice ? 65 : 80,

    resizeMode: "contain",
  },

  title: {
    fontSize: width < 380 ? 20 : 22,

    fontWeight: "900",

    color: "#702516",

    letterSpacing: 2,

    marginBottom: isSmallDevice ? 10 : 15,
  },

  forms: {
    width: "100%",

    gap: isVerySmallDevice ? 6 : 10,
  },

  label: {
    width: "90%",

    alignSelf: "center",

    fontSize: width < 380 ? 13 : 14,

    color: "#702516",
  },

  input: {
    width: "90%",

    height: isVerySmallDevice ? 46 : 50,

    backgroundColor: "#F5F5F5",

    borderRadius: 8,

    paddingHorizontal: 10,

    borderWidth: 1.5,
    borderColor: "#702516e4",

    fontSize: width < 380 ? 14 : 16,

    alignSelf: "center",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",

    fontSize: 12,

    width: "90%",

    alignSelf: "center",

    marginTop: -3,
    marginBottom: 2,
  },

  button: {
    backgroundColor: "#702516",

    borderRadius: 8,

    paddingVertical: isVerySmallDevice ? 12 : 14,

    width: "90%",

    alignItems: "center",

    marginTop: 10,

    alignSelf: "center",

    borderWidth: 1.5,
    borderColor: "#702516e4",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#fff",

    fontWeight: "bold",

    fontSize: width < 380 ? 15 : 16,
  },

  loginText: {
    padding: 10,

    marginTop: 8,

    color: "#702516",

    fontSize: width < 380 ? 13 : 14,

    textAlign: "center",
  },

  separatorContainer: {
    flexDirection: "row",

    alignItems: "center",

    marginVertical: 10,

    width: "90%",

    alignSelf: "center",

    paddingHorizontal: 10,
  },

  line: {
    flex: 1,

    height: 1,

    backgroundColor: "#ccc",
  },

  separatorText: {
    marginHorizontal: 10,

    color: "#888",

    fontWeight: "bold",

    fontSize: width < 380 ? 12 : 14,
  },

  socialContainer: {
    flexDirection: "row",

    justifyContent: "center",

    flexWrap: "wrap",

    gap: width < 380 ? 8 : 10,

    marginTop: 10,
  },
});
