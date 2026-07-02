import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import { router } from "expo-router";
import { products, Product } from "@/data/prodcuts";
import ProductCard from "@/components/ProductCard";

export default function Nomenclature() {
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content title="Номенклатура" titleStyle={{ color: "#fff" }} />
      </Appbar.Header>
      <ScrollView>
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
});
