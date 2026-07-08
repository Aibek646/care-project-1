import { Modal, View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { Item } from "@/types/item";

type Props = {
  visible: boolean;
  item: Item | null;
  onConfirm: (value: number) => void;
  onCancel: () => void;
};

export default function EditItemModal({
  visible,
  item,
  onConfirm,
  onCancel,
}: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (item) {
      setValue(
        item.type === "weight"
          ? (item.totalWeight ?? 0).toFixed(3)
          : String(item.count ?? 1),
      );
    }
  }, [item]);
  const [isWeight, setIsWeight] = useState(false);

  useEffect(() => {
    if (item) {
      setIsWeight(item.type === "weight");
      setValue(
        item.type === "weight"
          ? (item.totalWeight ?? 0).toFixed(3)
          : String(item.count ?? 1),
      );
    }
  }, [item]);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.subTitle}>{item?.barcode}</Text>
          <TextInput
            label={isWeight ? "Вес (кг)" : "Количество (шт)"}
            value={value}
            onChangeText={setValue}

            keyboardType="numeric"
            mode="outlined"
            style={{
              marginBottom: 16,
              backgroundColor: "#fff",
            }}
            activeOutlineColor="#b71c1c"
            theme={{ colors: { onSurface: "#333", background: "#fff" } }}
          />
          <View style={styles.buttons}>
            <Button
              mode="outlined"
              textColor="#333"
              style={{ flex: 1 }}
              onPress={onCancel}
            >
              Отмена
            </Button>
            <Button
              mode="contained"
              buttonColor="#b71c1c"
              textColor="#fff"
              style={{ flex: 1 }}
              onPress={() => onConfirm(parseFloat(value) || 0)}
            >
              Сохранить
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#b71c1c",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    elevation: 5,
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 16 },
  subTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    marginBottom: 16,
  },
  buttons: { flexDirection: "row", gap: 8 },
});
