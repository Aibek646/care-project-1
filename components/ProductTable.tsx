import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import ProductRow from "./ProductRow";
import { Item } from "@/types/item";

type Props = {
  items: Item[];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  lastAddedBarcode: string | null;
};

export default function ProductTable({
  items,
  onDelete,
  onEdit,
  lastAddedBarcode,
}: Props) {
  return (
    <>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Всего строк: {items.length}</Text>
      </View>
      <ScrollView>
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
              onEdit={() => onEdit(index)}
              isNew={item.barcode === lastAddedBarcode}
            />
          ))}
        </View>
      </ScrollView>
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
