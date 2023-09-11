import { Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, SetStateAction } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const STORAGE_KEY = "@toDos";

const Todos = () => {
  const [text, setText] = useState<any>("");
  const [toDos, setToDos] = useState<any>({});

  useEffect(() => {
    loadToDos();
  }, []);

  const onChangeText = (payload: SetStateAction<string>) => setText(payload);

  const setItemInStorage = async (key: string, value: any) =>
    await AsyncStorage.setItem(key, JSON.stringify(value));

  const getItemInStorage = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  };

  const saveToDos = async (toSave: {}) => {
    setItemInStorage(STORAGE_KEY, toSave);
  };
  const loadToDos = async () => {
    const s = await getItemInStorage(STORAGE_KEY);
    s !== null ? setToDos(s) : null;
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: text,
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteToDo = (key: string) => {
    Alert.alert("삭제하시겠습니까?", "", [
      { text: "취소" },
      {
        text: "확인",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          onChangeText={onChangeText}
          returnKeyType="done"
          value={text}
          placeholder={"입력하세요."}
          style={styles.input}
        />
        <ScrollView>
          {Object.keys(toDos).map((key) => (
            <View key={key} style={styles.toDo}>
              <Text style={styles.toDoText}>{toDos[key]}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={18} color={"#3A3D40"} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
