import { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const PockmonDetail = ({ route }: any) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 10 }}># {item.id}</Text>
          <Text style={{ fontWeight: 700 }}>
            {item.names.find((name) => name.language.name === "ko").name}
          </Text>
        </View>
        <Text>{item.genera.find((a) => a.language.name === "ko").genus}</Text>
        <Image
          source={{ uri: item.sprites.front_default }}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
        <Text>
          {
            item.flavor_text_entries.find((a) => a.language.name === "ko")
              .flavor_text
          }
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <View style={{ marginRight: 12 }}>
            <Text style={styles.label}>신장</Text>
            <Text style={{ textAlign: "center" }}>{item.height / 10}m</Text>
          </View>
          <View>
            <Text style={styles.label}>무게</Text>
            <Text style={{ textAlign: "center" }}>{item.weight / 10}kg</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PockmonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
  },
  wrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    boxShadow:
      "#00000033 0 2px 1px -1px, #00000024 0 1px 1px 0, #0000001f 0 1px 3px 0",
  },
  list: {
    padding: 20,
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: 10,
    boxShadow:
      "#00000033 0 2px 1px -1px, #00000024 0 1px 1px 0, #0000001f 0 1px 3px 0",
  },

  label: {
    width: 100,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#f5f7fa",
    borderColor: "#CDD7E1",
    textAlign: "center",
  },
});
