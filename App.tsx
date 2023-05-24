import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Switch, Text, View } from 'react-native';

export default function App() {
  const [isDay, setIsDay] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [isDay, isSmall]);

  async function setData() {
    await AsyncStorage.setItem('isDay', String(isDay));
    await AsyncStorage.setItem('isSmall', String(isSmall));
  }

  async function getData() {
    const day = await AsyncStorage.getItem('isDay');
    const small = await AsyncStorage.getItem('isSmall');

    setIsDay(day === 'true' && true);
    setIsSmall(small === 'true' && true);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Frases</Text>
      </View>

      <View style={styles.top}>
        <View style={styles.topSide}>
          <Text style={styles.topText}>Dia</Text>
          <Switch style={styles.switch}
            value={isDay} onValueChange={() => setIsDay(prev => !prev)} />
        </View>
        <View style={styles.topSide}>
          <Text style={styles.topText}>Pequeno</Text>
          <Switch style={styles.switch}
            value={isSmall} onValueChange={() => setIsSmall(prev => !prev)} />
        </View>
      </View>

      <View style={[styles.box, isDay && styles["bg-light"]]}>
        <Text style={[styles.boxText, isDay && styles["text-dark"], isSmall && styles.small]}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero libero explicabo nulla odit modi dignissimos qui temporibus eius, et, debitis eveniet voluptates at odio labore reprehenderit ad incidunt delectus, est iure aperiam tempora in impedit accusamus. Fuga in sequi sapiente excepturi eveniet quis eaque, modi veritatis dolor aperiam possimus fugiat sit minus dolorem magnam repellendus unde pariatur nemo rerum eum odit iste? Error totam dignissimos cupiditate assumenda, iure sunt, accusantium aliquam fugit saepe excepturi suscipit in voluptas eaque ipsa quis! Sequi et, alias cum tenetur voluptas rem quo id dolorum!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 48
  },
  header: {},
  headerText: {
    fontSize: 48,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    textAlign: "center",
    paddingBottom: 16,
    color: "#000"
  },
  top: {
    flexDirection: "row",
    gap: 32,
    width: "100%",
    justifyContent: "space-around",
    paddingVertical: 16
  },
  topSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  topText: {
    fontSize: 24
  },
  switch: {
    transform: [{ scale: 1.5 }]
  },
  "bg-light": {
    backgroundColor: "#fff"
  },
  "text-dark": {
    color: "#000"
  },
  box: {
    padding: 16,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#000",
    flex: 1
  },
  boxText: {
    color: "#fff",
    fontSize: 18,
  },
  small: {
    fontSize: 12
  }
});
