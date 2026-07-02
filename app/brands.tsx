import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { router } from "expo-router";
import { useBrands } from "../hooks/useBrands";

export default function Brands() {
  const { data, isLoading, isError } = useBrands();
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content
          title="Brands"
          titleStyle={{ color: "#fff" }}
        ></Appbar.Content>
      </Appbar.Header>
      <ScrollView>
        {isLoading && <Text style={styles.status}>Загрузка...</Text>}
        {isError && <Text style={styles.status}>Ошибка загрузки</Text>}
        {data?.map((brand: any) => (
          <View key={brand.id} style={styles.card}>
            <Text style={styles.name}>{brand.name}</Text>
            <Text style={styles.code}>{brand.code}</Text>
            <Text style={styles.description}>{brand.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  status: { textAlign: "center", padding: 20, color: "#555" },
  card: {
    backgroundColor: "#fff",
    margin: 12,
    marginBottom: 0,
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "bold", color: "#333" },
  code: { fontSize: 12, color: "#b71c1c", marginTop: 2 },
  description: { fontSize: 13, color: "#666", marginTop: 4 },
});
