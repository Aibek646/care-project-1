import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Product } from "@/data/prodcuts";
import { router } from "expo-router";

type Props = {
  item: Product;
};

export default function ProductCard({ item }: Props) {
  return (
    <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.barcode}>{item.barcode}</Text>
          <Text style={styles.stock}>
            Наличие : <Text style={styles.stockValue}>{item.stock} шт</Text>
          </Text>
          <Text style={styles.price}>
            Цена: <Text style={styles.priceValue}>{item.price} p.</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 12,
    marginBottom: 0,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 4 },
  barcode: { fontSize: 11, color: "#999", marginBottom: 4 },
  stock: { fontSize: 13, color: "#555" },
  stockValue: { color: "#333", fontWeight: "bold" },
  price: { fontSize: 13, color: "#555", marginTop: 2 },
  priceValue: { color: "#b71c1c", fontWeight: "bold" },
});
