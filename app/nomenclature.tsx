import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { router } from "expo-router";
import { products } from "@/data/prodcuts";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

export default function Nomenclature() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search),
  );
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content title="Номенклатура" titleStyle={{ color: "#fff" }} />
      </Appbar.Header>
      <Searchbar
        placeholder="Пойск по названию или штрихкоду"
        value={search}
        onChangeText={setSearch}
        style={{ margin: 12, borderRadius: 10 }}
      />
      <ScrollView>
        {filtered?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
});
