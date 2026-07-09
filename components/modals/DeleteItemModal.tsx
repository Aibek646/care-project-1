import { Modal, View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteItemModal({
  visible,
  onCancel,
  onConfirm,
}: Props) {
  const { t } = useTranslation();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{t("deleteTitle")}</Text>
          <Text style={styles.subtitle}>{t("deleteSubtitle")}</Text>
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
              onPress={onConfirm}
            >
              {t("delete")}
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
  title: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#888", marginBottom: 20 },
  buttons: { flexDirection: "row", gap: 8 },
});
