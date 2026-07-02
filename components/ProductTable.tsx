import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import ProductRow from "./ProductRow";

type Item = {
  barcode: string;
  name: string | null;
  image: any;
  count: number;
};

type Props = {
  items: Item[];
  onDelete: (index: number) => void;
  onIncrement: (index: number) => void;
  onDecrement: (index: number) => void;
};

export default function ProductTable({
  items,
  onDelete,
  onIncrement,
  onDecrement,
}: Props) {
  return (
    <>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Всего строк: {items.length}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Номенклатура</Text>
          <Text style={styles.tableHeaderText}>Факт</Text>
        </View>
        {items.map((item, index) => (
          <ProductRow
            key={index}
            item={item}
            onDelete={() => onDelete(index)}
            onDecrement={() => onDecrement(index)}
            onIncrement={() => onIncrement(index)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  totalRow: { paddingHorizontal: 16, paddingVertical: 8 },
  totalText: { color: "#555", fontSize: 14 },
  table: {
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 12,
    justifyContent: "space-between",
  },
  tableHeaderText: { fontWeight: "bold", color: "#333" },
});
