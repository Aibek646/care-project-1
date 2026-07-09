import { View, StyleSheet, Modal } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { CameraView } from "expo-camera";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  scanning: boolean;
  scanned: boolean;
  onScan: () => void;
  onClose: () => void;
  onBarcodeScanned: (data: { data: string }) => void;
};

export default function ScanArea({
  scanning,
  scanned,
  onScan,
  onClose,
  onBarcodeScanned,
}: Props) {
  const [cameraSize, setCameraSize] = useState({ width: 0, height: 0 });
  const { t } = useTranslation();

  const handleBarcodeScanned = (result: any) => {
    const { bounds } = result;
    const barcodeCenter = {
      x: bounds.origin.x + bounds.size.width / 2,
      y: bounds.origin.y + bounds.size.height / 2,
    };
    const crosshairLeft = (cameraSize.width - 260) / 2;
    const crosshairTop = (cameraSize.height - 160) / 2;
    const crosshairRight = crosshairLeft + 260;
    const crosshairBottom = crosshairTop + 160;

    const isInside =
      barcodeCenter.x >= crosshairLeft &&
      barcodeCenter.x <= crosshairRight &&
      barcodeCenter.y >= crosshairTop &&
      barcodeCenter.y <= crosshairBottom;

    if (isInside) onBarcodeScanned(result);
  };

  return (
    <>
      <Modal visible={scanning} animationType="slide">
        <View style={styles.fullScreen}>
          <CameraView
            autofocus="on"
            style={styles.camera}
            onLayout={(e) => setCameraSize(e.nativeEvent.layout)}
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            zoom={0.1}
          />
          <View style={styles.overlay}>
            <View style={styles.crosshair} />
          </View>
          <TouchableRipple onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕ {t("close")}</Text>
          </TouchableRipple>
        </View>
      </Modal>

      <TouchableRipple onPress={onScan} style={styles.scanButton}>
        <Text style={styles.scanText}>📷 {t("scan").toUpperCase()}</Text>
      </TouchableRipple>
    </>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgba(0,0,0,0.0)",
  },
  crosshair: {
    width: 260,
    height: 160,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  closeButton: {
    backgroundColor: "#b71c1c",
    padding: 16,
    marginBottom: 40,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  closeText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  scanButton: {
    backgroundColor: "#b71c1c",
    margin: 16,
    borderRadius: 12,
    padding: 18,
    marginBottom: 40,
    alignItems: "center",
    elevation: 4,
  },
  scanText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
