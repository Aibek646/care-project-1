import { Modal, View, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  currentTitle: string | null;
  onConfirm: (title: string) => void;
  onCancel: () => void;
};

export default function TitleModal({
  visible,
  currentTitle,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (visible) {
      setValue(currentTitle ?? "");
    }
  }, [visible, currentTitle]);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>{t("docTitle")}</Text>
          <TextInput
            label={t("docTitleLabel")}
            value={value}
            onChangeText={setValue}
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
              disabled={value.trim().length === 0}
              onPress={() => onConfirm(value.trim())}
            >
              {t("save")}
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
  title: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 16 },
  buttons: { flexDirection: "row", gap: 8 },
});
