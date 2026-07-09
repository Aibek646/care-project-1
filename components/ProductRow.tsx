import { View, Image, StyleSheet, Animated } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { Item } from "@/types/item";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  item: Item;
  onDelete: () => void;
  onEdit: () => void;
  isNew: boolean;
};

export default function ProductRow({ item, onDelete, onEdit, isNew }: Props) {
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isNew) {
      bgAnim.setValue(1);
      Animated.timing(bgAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    }
  }, [isNew]);

  const baseColor =
    item.type === "weight"
      ? "#e3f2fd"
      : item.type === "pieceWeight"
        ? "#e8f5e9"
        : "#fff9e6";

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [baseColor, "#ec64a9"],
  });

  const { t } = useTranslation();

  return (
    <Animated.View style={[styles.tableRow, { backgroundColor }]}>
      {item.image && <Image source={item.image} style={styles.productImage} />}
      <View style={{ flex: 1 }}>
        <Text style={styles.tableCell}>{item.name ?? item.barcode}</Text>
        {item.name && (
          <Text style={styles.barcodeText}>{item.fullBarcode}</Text>
        )}
        {item.price && (
          <Text style={styles.priceText}>Цена: {item.price} т</Text>
        )}
        {item.stock && (
          <Text style={styles.stockText}>Остаток: {item.stock} шт</Text>
        )}
      </View>
      <View style={{ alignItems: "flex-end", gap: 4 }}>
        {item.type === "weight" ? (
          <Text style={styles.tableCell}>
            {item.totalWeight?.toFixed(3)} {t("kg")}
          </Text>
        ) : (
          <Text style={styles.tableCell}>
            {item.count} {t("pcs")}
          </Text>
        )}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            icon="pencil-outline"
            onPress={onEdit}
            size={24}
            iconColor="#4CAF50"
            style={{ borderWidth: 1, borderColor: "#4CAF50" }}
          />
          <IconButton
            icon="trash-can-outline"
            iconColor="#b71c1c"
            onPress={onDelete}
            style={{ borderWidth: 1, borderColor: "red" }}
          />
        </View>
      </View>
    </Animated.View>
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
    marginBottom: 4,
  },
  tableCell: { color: "#212121", fontSize: 20, fontWeight: "600" },
  productImage: { width: 56, height: 56, borderRadius: 8, marginRight: 15 },
  barcodeText: { fontSize: 18, color: "#9e9e9e" },
  actionBtn: { borderColor: "#b71c1c", backgroundColor: "#FCE4EC" },
  priceText: { fontSize: 12, color: "#b71c1c", marginTop: 2 },
  stockText: { fontSize: 11, color: "#4caf50", marginTop: 2 },
});
