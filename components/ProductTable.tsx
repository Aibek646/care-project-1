import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import ProductRow from "./ProductRow";
import { Item } from "@/types/item";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>
          {t("totalRows")}: {items.length}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>{t("nomenclature")}</Text>
            <Text style={styles.tableHeaderText}>{t("fact")}</Text>
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
  totalRow: { paddingHorizontal: 14, paddingVertical: 8 },
  totalText: { color: "#555", fontSize: 20 },
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    margin: 7,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 12,
    justifyContent: "space-between",
  },
  tableHeaderText: { fontWeight: "bold", color: "#333" },
});
