import { View, Image, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { Item } from "@/types/item";

type Props = {
  item: Item;
  onDelete: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function ProductRow({
  item,
  onDelete,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <View style={styles.tableRow}>
      {item.image && <Image source={item.image} style={styles.productImage} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.tableCell}>{item.name ?? item.barcode}</Text>
        {item.name && <Text style={styles.barcodeText}>{item.barcode}</Text>}
        {item.price && (
          <Text style={styles.priceText}>Цена: {item.price} т</Text>
        )}
        {item.stock && (
          <Text style={styles.stockText}>Остаток: {item.stock} шт</Text>
        )}
        {item.totalWeight && (
          <Text style={styles.weightText}>
            Вес: {item.totalWeight.toFixed(3)} кг
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {item.type === "weight" ? (
          <Text style={styles.tableCell}>
            {item.totalWeight?.toFixed(3)} кг
          </Text>
        ) : (
          <>
            <TouchableRipple onPress={onDecrement}>
              <Text style={styles.countBtn}>-</Text>
            </TouchableRipple>
            <Text style={styles.tableCell}>{item.count}</Text>
            <TouchableRipple onPress={onIncrement}>
              <Text style={styles.countBtn}>+</Text>
            </TouchableRipple>
          </>
        )}
      </View>
      <TouchableRipple onPress={onDelete} rippleColor="rgba(0,0,0,0.1)">
        <Text style={{ color: "red", paddingHorizontal: 9, fontSize: 18 }}>
          x
        </Text>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  tableCell: { color: "#333", fontSize: 14 },
  productImage: { width: 40, height: 40, borderRadius: 4, marginRight: 8 },
  barcodeText: { fontSize: 11, color: "#999" },
  countBtn: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#b71c1c",
  },
  priceText: { fontSize: 11, color: "#b71c1c", marginTop: 2 },
  stockText: { fontSize: 11, color: "#4caf50", marginTop: 2 },
  weightText: { fontSize: 11, color: "#1565c0", marginTop: 2 },
});
