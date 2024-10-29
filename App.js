
import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import { useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

export default function App() {
  const [movie, setMovie] = useState(""); 
  const [movieName, setMovieName] = useState(null); 
  const [error, setError] = useState(""); 

  async function handleSearch() {
    if (!movieName) return; 
    setError(""); 
    try {
      const response = await axios.get(`https://www.omdbapi.com/?t=${movieName}&apikey=a3cc98dc`); 
      if (response.data.Response === "False") {
        setError('Película no econtrada'); 
        setMovie(null); 
      } else {
        setMovie(response.data); 
      }
    } catch (error) {
      setError("Error buscando la película solicitada")
    }
  }; 

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Búsqueda de películas</Text>
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Ingresa una película...'
            style = {styles.input}
            value = {movieName}
            onChangeText= {setMovieName}
          />
          <Pressable style={styles.inputButton} onPress={handleSearch}>
            <Icon style={styles.buttonText} name="search"></Icon>
          </Pressable>
        </View>
        {error && (
          <View style={styles.warningContainer}> 
            <Icon name="warning" style={styles.warning}></Icon>
            <Text style={styles.warningText}>{error}</Text>
          </View>
        )}
        {movie && (
          <View style={styles.movieContainer}>
            <Image source={{uri: movie.Poster}} style={styles.image}/>
            <Text style={styles.movieTitle}>{movie.Title}</Text>
            <Text style={styles.description}>{movie.Plot}</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F3',
    alignItems: 'center'
  },
  title: {
    fontSize: 40, 
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20
  }, 
  inputContainer: {
    flexDirection: "row",
    width: "90%", 
    gap: 10, 
    marginBottom: 20
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    fontFamily: 'Times New Roman',
    textAlign: 'center'
  }, 
  inputButton: {
    backgroundColor: "#FF758F",
    padding: 10,
    fontSize: 20,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold"
  }, 
  movieContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center"
  }, 
  image: {
    minWidth: "50%",
    minHeight: "35%"
  }, 
  movieTitle: {
    fontFamily: "Times New Roman",
    fontWeight: "bold", 
    fontSize: 35,
    color: "#A4133C",
    marginTop: 20
  }, 
  description: {
    fontFamily: "Times New Roman", 
    fontSize: 18,
    marginTop: 10
  },
  warningContainer: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#800F2F",
    padding: 15,
    borderRadius: 15,
    marginTop: "50%"
  }, 
  warning: {
    color: "white",
    fontSize: 20
  }, 
  warningText: {
    color: "white",
    fontFamily: "Times New Roman",
    fontSize: 20,
  }
});
