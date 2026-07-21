import { Modal, View, StyleSheet, Text, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PendingScan } from "@/types/pendingScan";

type Props = {
  pending: PendingScan | null;
  onConfirm: (value: number) => void;
  onCancel: () => void;
};

export default function ConfirmScanModal({
  pending,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  useEffect(() => {
    if (pending) {
      setValue(
        pending.type === "weight"
          ? pending.value.toFixed(3)
          : String(pending.value),
      );
    }
  }, [pending]);
  const isWeight = pending?.type === "weight";
  return (
    <Modal visible={pending !== null} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          {pending?.image && (
            <Image source={pending.image} style={styles.image} />
          )}
          <Text style={styles.title}>{pending?.name}</Text>
          <Text style={styles.barcode}>{pending?.fullBarcode}</Text>
          <TextInput
            label={isWeight ? t("weight") : t("quantity")}
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            mode="outlined"
            style={{ marginBottom: 16, backgroundColor: "#fff" }}
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
              {t("cancel")}
            </Button>
            <Button
              mode="contained"
              buttonColor="#b71c1c"
              textColor="#fff"
              style={{ flex: 1 }}
              disabled={!(parseFloat(value) > 0)}
              onPress={() => onConfirm(parseFloat(value))}
            >
              {t("add")}
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
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    elevation: 5,
  },
  image: { width: 64, height: 64, borderRadius: 8, marginBottom: 12 },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 4,
  },
  barcode: { fontSize: 13, color: "#9e9e9e", marginBottom: 16 },
  buttons: { flexDirection: "row", gap: 8 },
});
