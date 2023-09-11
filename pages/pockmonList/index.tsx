import axios from "axios";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@favoritList";
const LIMIT = 20;

const PockmonList = ({ navigation }: any) => {
  const [list, setList] = useState<any[]>([]);
  const [favoritList, setFavoritList] = useState<any[]>([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    call();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setFavoritList(JSON.parse(value));
      }
    } catch (e) {
      Alert.alert("에러가 났습니다");
    }
  };

  const call = async () => {
    const allList = [];

    try {
      setLoading(true);

      for (let i = offset; i < LIMIT + offset; i++) {
        const promise1 = await axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
          .then((res) => ({
            id: res.data.id,
            names: res.data.names,
            flavor_text_entries: res.data.flavor_text_entries,
            genera: res.data.genera,
          }));
        const promise2 = await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((res) => ({
            sprites: res.data.sprites,
            height: res.data.height,
            weight: res.data.weight,
          }));
        allList.push({ ...promise1, ...promise2 });
      }

      setList([...list, ...allList]);
      setOffset(offset + LIMIT);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("에러가 났습니다");
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.list}
        onPress={() => navigation.navigate("Detail", { item })}
      >
        <Text># {item.id}</Text>
        <Text>
          {item.names.find((name) => name.language.name === "ko").name}
        </Text>
        {/* <TouchableOpacity onPress={() => saveFaviritPockmon(item)}>
          <AntDesign
            name={geHeart(item.id) ? "heart" : "hearto"}
            size={24}
            color="black"
          />
        </TouchableOpacity> */}
        <Image
          source={{ uri: item.sprites.front_default }}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />
      </TouchableOpacity>
    );
  };

  const onEndReached = () => {
    if (!loading) {
      call();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={!loading && <ActivityIndicator size="large" />}
        contentContainerStyle={{
          margin: 30,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      />
    </SafeAreaView>
  );
};

export default PockmonList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6f9",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 140,
    height: 160,
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: 10,
    boxShadow:
      "#00000033 0 2px 1px -1px, #00000024 0 1px 1px 0, #0000001f 0 1px 3px 0",
  },
});
