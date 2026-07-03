import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { products } from "@/data/prodcuts";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
          <Appbar.BackAction color="#fff" onPress={() => router.back()} />
          <Appbar.Content title="Товар" titleStyle={{ color: "#fff" }} />
        </Appbar.Header>
        <Text style={styles.notFound}>Товар не найден</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content title="Toвар" titleStyle={{ color: "#fff" }} />
      </Appbar.Header>
      <ScrollView>
        <Image source={product.image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.barcode}>{product.barcode}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Цена:</Text>
            <Text style={styles.price}>{product.price} р.</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Остаток:</Text>
            <Text style={styles.stock}>{product.stock} шт</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  info: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 10,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 },
  barcode: { fontSize: 13, color: "#999", marginBottom: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  label: { fontSize: 15, color: "#555" },
  price: { fontSize: 15, fontWeight: "bold", color: "#b71c1c" },
  stock: { fontSize: 15, fontWeight: "bold", color: "#4caf50" },
  notFound: { textAlign: "center", padding: 20, color: "#555" },
});
