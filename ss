warning: in the working copy of 'ProjetoVerates-main/app.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'ProjetoVerates-main/package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'ProjetoVerates-main/package.json', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/ProjetoVerates-main/app.json b/ProjetoVerates-main/app.json[m
[1mindex fae4cf0..9f727ff 100644[m
[1m--- a/ProjetoVerates-main/app.json[m
[1m+++ b/ProjetoVerates-main/app.json[m
[36m@@ -38,7 +38,8 @@[m
             "backgroundColor": "#000000"[m
           }[m
         }[m
[31m-      ][m
[32m+[m[32m      ],[m
[32m+[m[32m      "expo-sqlite"[m
     ],[m
     "experiments": {[m
       "typedRoutes": true,[m
[1mdiff --git a/ProjetoVerates-main/hooks/use-theme-color.ts b/ProjetoVerates-main/hooks/use-theme-color.ts[m
[1mindex 0cbc3a6..2f2982e 100644[m
[1m--- a/ProjetoVerates-main/hooks/use-theme-color.ts[m
[1m+++ b/ProjetoVerates-main/hooks/use-theme-color.ts[m
[36m@@ -10,12 +10,13 @@[m [mexport function useThemeColor([m
   props: { light?: string; dark?: string },[m
   colorName: keyof typeof Colors.light & keyof typeof Colors.dark[m
 ) {[m
[31m-  const theme = useColorScheme() ?? 'light';[m
[32m+[m[32m  const theme = (useColorScheme() ?? 'light') as 'light' | 'dark';[m
[32m+[m
   const colorFromProps = props[theme];[m
 [m
   if (colorFromProps) {[m
     return colorFromProps;[m
[31m-  } else {[m
[31m-    return Colors[theme][colorName];[m
   }[m
[31m-}[m
[32m+[m
[32m+[m[32m  return Colors[theme][colorName];[m
[32m+[m[32m}[m
\ No newline at end of file[m
[1mdiff --git a/ProjetoVerates-main/package-lock.json b/ProjetoVerates-main/package-lock.json[m
[1mindex fbc4d0f..7b838eb 100644[m
[1m--- a/ProjetoVerates-main/package-lock.json[m
[1m+++ b/ProjetoVerates-main/package-lock.json[m
[36m@@ -20,6 +20,7 @@[m
         "expo-linking": "~8.0.11",[m
         "expo-router": "~6.0.23",[m
         "expo-splash-screen": "~31.0.13",[m
[32m+[m[32m        "expo-sqlite": "~16.0.10",[m
         "expo-status-bar": "~3.0.9",[m
         "expo-symbols": "~1.0.8",[m
         "expo-system-ui": "~6.0.9",[m
[36m@@ -4311,6 +4312,12 @@[m
         "url": "https://github.com/sponsors/ljharb"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/await-lock": {[m
[32m+[m[32m      "version": "2.2.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/await-lock/-/await-lock-2.2.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-aDczADvlvTGajTDjcjpJMqRkOF6Qdz3YbPZm/PyW6tKPkx2hlYBzxMhEywM/tU72HrVZjgl5VCdRuMlA7pZ8Gw==",[m
[32m+[m[32m      "license": "MIT"[m
[32m+[m[32m    },[m
     "node_modules/babel-jest": {[m
       "version": "29.7.0",[m
       "resolved": "https://registry.npmjs.org/babel-jest/-/babel-jest-29.7.0.tgz",[m
[36m@@ -6494,6 +6501,20 @@[m
         "expo": "*"[m
       }[m
     },[m
[32m+[m[32m    "node_modules/expo-sqlite": {[m
[32m+[m[32m      "version": "16.0.10",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/expo-sqlite/-/expo-sqlite-16.0.10.tgz",[m
[32m+[m[32m      "integrity": "sha512-tUOKxE9TpfneRG3eOfbNfhN9236SJ7IiUnP8gCqU7umd9DtgDGB/5PhYVVfl+U7KskgolgNoB9v9OZ9iwXN8Eg==",[m
[32m+[m[32m      "license": "MIT",[m
[32m+[m[32m      "dependencies": {[m
[32m+[m[32m        "await-lock": "^2.2.2"[m
[32m+[m[32m      },[m
[32m+[m[32m      "peerDependencies": {[m
[32m+[m[32m        "expo": "*",[m
[32m+[m[32m        "react": "*",[m
[32m+[m[32m        "react-native": "*"[m
[32m+[m[32m      }[m
[32m+[m[32m    },[m
     "node_modules/expo-status-bar": {[m
       "version": "3.0.9",[m
       "resolved": "https://registry.npmjs.org/expo-status-bar/-/expo-status-bar-3.0.9.tgz",[m
[1mdiff --git a/ProjetoVerates-main/package.json b/ProjetoVerates-main/package.json[m
[1mindex b3fb9e1..121433a 100644[m
[1m--- a/ProjetoVerates-main/package.json[m
[1m+++ b/ProjetoVerates-main/package.json[m
[36m@@ -23,6 +23,7 @@[m
     "expo-linking": "~8.0.11",[m
     "expo-router": "~6.0.23",[m
     "expo-splash-screen": "~31.0.13",[m
[32m+[m[32m    "expo-sqlite": "~16.0.10",[m
     "expo-status-bar": "~3.0.9",[m
     "expo-symbols": "~1.0.8",[m
     "expo-system-ui": "~6.0.9",[m
[36m@@ -31,17 +32,17 @@[m
     "react-dom": "19.1.0",[m
     "react-native": "0.81.5",[m
     "react-native-gesture-handler": "~2.28.0",[m
[31m-    "react-native-worklets": "0.5.1",[m
     "react-native-reanimated": "~4.1.1",[m
     "react-native-safe-area-context": "~5.6.0",[m
     "react-native-screens": "~4.16.0",[m
[31m-    "react-native-web": "~0.21.0"[m
[32m+[m[32m    "react-native-web": "~0.21.0",[m
[32m+[m[32m    "react-native-worklets": "0.5.1"[m
   },[m
   "devDependencies": {[m
     "@types/react": "~19.1.0",[m
[31m-    "typescript": "~5.9.2",[m
     "eslint": "^9.25.0",[m
[31m-    "eslint-config-expo": "~10.0.0"[m
[32m+[m[32m    "eslint-config-expo": "~10.0.0",[m
[32m+[m[32m    "typescript": "~5.9.2"[m
   },[m
   "private": true[m
 }[m
[1mdiff --git a/ProjetoVerates-main/src/app/Layout.tsx b/ProjetoVerates-main/src/app/Layout.tsx[m
[1mdeleted file mode 100644[m
[1mindex ccaef3b..0000000[m
[1m--- a/ProjetoVerates-main/src/app/Layout.tsx[m
[1m+++ /dev/null[m
[36m@@ -1,26 +0,0 @@[m
[31m-import { Stack } from "expo-router";[m
[31m-import { SQLiteProvider } from "expo-sqlite";[m
[31m-import { initializeDatabase } from "../database/databaseInit";[m
[31m-import { useEffect } from "react";[m
[31m-[m
[31m-export default function Layout() {[m
[31m-  // Dispara a inicialização e cópia do banco logo na abertura do App[m
[31m-  useEffect(() => {[m
[31m-    initializeDatabase().catch((err) => {[m
[31m-      console.error("Erro ao inicializar banco de dados:", err);[m
[31m-    });[m
[31m-  }, []);[m
[31m-[m
[31m-  return ([m
[31m-    // Passamos apenas o nome do arquivo. O Expo SQLite se encarrega de abrir[m
[31m-    // o arquivo "database.db" que a função acima já preparou e salvou no aparelho.[m
[31m-    <SQLiteProvider databaseName="database.db">[m
[31m-      <Stack[m
[31m-        screenOptions={{[m
[31m-          headerShown: false,[m
[31m-          animation: "fade",[m
[31m-        }}[m
[31m-      />[m
[31m-    </SQLiteProvider>[m
[31m-  );[m
[31m-}[m
\ No newline at end of file[m
[1mdiff --git a/ProjetoVerates-main/src/app/analisarLink.tsx b/ProjetoVerates-main/src/app/analisarLink.tsx[m
[1mindex 130fce3..a96ae91 100644[m
[1m--- a/ProjetoVerates-main/src/app/analisarLink.tsx[m
[1m+++ b/ProjetoVerates-main/src/app/analisarLink.tsx[m
[36m@@ -1,10 +1,11 @@[m
 import { router } from "expo-router";[m
 import { useState } from "react";[m
[31m-import { useSQLiteContext } from "expo-sqlite";[m
[31m-import { dbInsertAnalise, dbIncrementarUsoDiario } from "../database/databaseInit";[m
[32m+[m[32mimport { useDatabase } from "../database/sqlite";[m
[32m+[m
 import {[m
   Image,[m
   ImageBackground,[m
[32m+[m[32m  Platform,[m
   StyleSheet,[m
   Text,[m
   TextInput,[m
[36m@@ -12,357 +13,727 @@[m [mimport {[m
   View,[m
 } from "react-native";[m
 [m
[32m+[m[32mimport {[m
[32m+[m[32m  dbInsertAnalise,[m
[32m+[m[32m  dbIncrementarUsoDiario,[m
[32m+[m[32m} from "../database/databaseInit";[m
[32m+[m
[32m+[m
[32m+[m[32m// ==============================[m
[32m+[m[32m// TELA PRINCIPAL[m
[32m+[m[32m// ==============================[m
[32m+[m
 export default function AnalisarLink() {[m
[31m-  const db = useSQLiteContext();[m
[32m+[m
[32m+[m[32mconst db = Platform.OS !== "web"[m
[32m+[m[32m    ? useDatabase()[m
[32m+[m[32m    : null;[m
[32m+[m
[32m+[m
   const [link, setLink] = useState("");[m
 [m
[31m-const analisarNoticia = async () => {[m
[31m-  if (!link.trim()) return;[m
[31m-[m
[31m-  console.log(link);[m
[31m-  const scoreAleatorio = Math.floor(Math.random() * 100);[m
[31m-  [m
[31m-  // Define o resultado textua