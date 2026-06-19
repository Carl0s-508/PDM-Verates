import { router } from "expo-router";
import { useState } from "react";
import { useDatabase } from "../database/sqlite";

import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  dbInsertAnalise,
  dbIncrementarUsoDiario,
} from "../database/databaseInit";


// ==============================
// TELA PRINCIPAL
// ==============================

export default function AnalisarLink() {

const db = Platform.OS !== "web"
    ? useDatabase()
    : null;


  const [link, setLink] = useState("");



  async function analisarNoticia() {


    if (!link.trim()) return;



    try {


      const score = gerarScore();

      const resultado = definirResultado(score);


      const userId = "user_logado_id";

      const analiseId = `anl_${Date.now()}`;



      if (db) {


        await dbInsertAnalise(

          db,

          analiseId,

          userId,

          link,

          "Conteúdo extraído do link analisado.",

          score,

          resultado,

          "Geral"

        );



        await dbIncrementarUsoDiario(

          db,

          userId

        );


      }



      router.push({

        pathname: "/resultado",

        params: {

          score: String(score),

        },

      });



    } catch(error) {


      console.error(
        "Erro ao salvar análise:",
        error
      );


    }


  }





  if (Platform.OS === "web") {

    return <WebMessage />;

  }





  return (

    <ImageBackground

      source={require("../assets/Background.png")}

      style={styles.background}

    >



      <Header />



      <View style={styles.content}>


        <View style={styles.card}>


          <Text style={styles.title}>

            Insira o link

          </Text>



          <Text style={styles.subtitle}>

            Cole o link da notícia que deseja verificar.

          </Text>




          <TextInput

            style={styles.input}

            placeholder="https://exemplo.com/noticia"

            placeholderTextColor="#666"

            value={link}

            onChangeText={setLink}

            autoCapitalize="none"

          />




          <TouchableOpacity

            style={styles.button}

            onPress={analisarNoticia}

          >



            <Text style={styles.buttonText}>

              Analisar a notícia

            </Text>




            <Image

              source={require("../assets/send.png")}

              style={styles.icon}

            />



          </TouchableOpacity>




        </View>




        <SecurityCard />



      </View>




    </ImageBackground>

  );

}





// ==============================
// COMPONENTES
// ==============================


function Header(){


  return (

    <View style={styles.header}>


      <TouchableOpacity

        style={styles.backButton}

        onPress={() => router.back()}

      >

        <Text style={styles.backText}>

          ←

        </Text>


      </TouchableOpacity>





      <TouchableOpacity

        style={styles.plusButton}

        onPress={() => router.push("/planos" as any)}

      >



        <Image

          source={require("../assets/Plus.png")}

          style={styles.icon}

        />



        <Text style={styles.plusText}>

          Plus

        </Text>



      </TouchableOpacity>



    </View>

  );


}





function SecurityCard(){


  return (

    <View style={styles.securityCard}>


      <Image

        source={require("../assets/lock.png")}

        style={styles.securityIcon}

      />



      <Text style={styles.securityText}>

        Seus dados são totalmente protegidos.

      </Text>



    </View>

  );


}





function WebMessage(){


  return (

    <View style={styles.webMessage}>


      <Text>

        SQLite disponível somente no aplicativo.

      </Text>


    </View>


  );


}





// ==============================
// FUNÇÕES AUXILIARES
// ==============================


function gerarScore(){

  return Math.floor(Math.random() * 100);

}



function definirResultado(score:number){


  if(score >= 80)

    return "Alta confiabilidade";



  if(score >= 50)

    return "Confiabilidade moderada";



  return "Baixa confiabilidade";


}





// ==============================
// ESTILOS
// ==============================


const styles = StyleSheet.create({


  background:{

    flex:1,

    paddingHorizontal:24,

    paddingTop:55,

  },



  header:{


    flexDirection:"row",

    justifyContent:"space-between",

    alignItems:"center",


  },



  backButton:{


    width:55,

    height:55,

    borderRadius:999,

    backgroundColor:"#FFF",

    justifyContent:"center",

    alignItems:"center",

    borderWidth:2,

    borderColor:"#702516",


  },



  backText:{


    fontSize:28,

    color:"#702516",

    fontWeight:"bold",


  },



  plusButton:{


    flexDirection:"row",

    alignItems:"center",

    borderWidth:2,

    borderColor:"#702516",

    borderRadius:30,

    paddingHorizontal:20,

    paddingVertical:10,


  },



  plusText:{


    color:"#702516",

    fontWeight:"700",

    marginLeft:6,


  },



  content:{


    flex:1,

    justifyContent:"center",


  },



  card:{


    backgroundColor:"#FFF",

    borderRadius:28,

    padding:30,

    alignItems:"center",

    borderWidth:2,

    borderColor:"#702516",


  },



  title:{


    fontSize:36,

    fontWeight:"bold",

    color:"#702516",

    marginBottom:15,


  },



  subtitle:{


    fontSize:16,

    textAlign:"center",

    color:"#444",

    marginBottom:30,


  },



  input:{


    width:"100%",

    height:72,

    backgroundColor:"#F4F4F4",

    borderRadius:20,

    borderWidth:2,

    borderColor:"#8A4A3B",

    paddingHorizontal:18,


  },



  button:{


    marginTop:25,

    height:58,

    width:"100%",

    backgroundColor:"#6B2416",

    borderRadius:18,

    flexDirection:"row",

    justifyContent:"center",

    alignItems:"center",


  },



  buttonText:{


    color:"#FFF",

    fontSize:18,

    fontWeight:"600",

    marginRight:10,


  },



  icon:{


    width:22,

    height:22,


  },



  securityCard:{


    marginTop:22,

    backgroundColor:"#FFF",

    borderRadius:20,

    borderWidth:2,

    borderColor:"#8A4A3B",

    padding:18,

    flexDirection:"row",

    alignItems:"center",


  },



  securityIcon:{


    width:24,

    height:24,

    marginRight:12,


  },



  securityText:{


    color:"#4A4A4A",


  },



  webMessage:{


    flex:1,

    justifyContent:"center",

    alignItems:"center",


  },


});