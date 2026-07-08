import { View, Image, StyleSheet, Animated } from "react-native";
import { Text, Button } from "react-native-paper";
import { Item } from "@/types/item";
import { useEffect, useRef } from "react";

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
        : "#ffffff";

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [baseColor, "#ec64a9"],
  });

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
            {item.totalWeight?.toFixed(3)} кг
          </Text>
        ) : (
          <Text style={styles.tableCell}>{item.count} шт</Text>
        )}
        <View style={{ flexDirection: "row", gap: 4 }}>
          <Button
            mode="outlined"
            compact
            textColor="#4CAF50"
            style={styles.actionBtnEdit}
            onPress={onEdit}
          >
            Изменить
          </Button>
          <Button
            mode="outlined"
            compact
            textColor="#b71c1c"
            style={styles.actionBtn}
            onPress={onDelete}
          >
            Удалить
          </Button>
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
  tableCell: { color: "#333", fontSize: 20 },
  productImage: { width: 40, height: 40, borderRadius: 4, marginRight: 8 },
  barcodeText: { fontSize: 20, color: "#999" },
  actionBtn: { borderColor: "#b71c1c", backgroundColor: "#FCE4EC" },
  actionBtnEdit: { borderColor: "#4CAF50", backgroundColor: "#E8F5E9" },
  actionBtnLabel: { fontSize: 11, marginVertical: 4, marginHorizontal: 8 },
  priceText: { fontSize: 12, color: "#b71c1c", marginTop: 2 },
  stockText: { fontSize: 11, color: "#4caf50", marginTop: 2 },
});
