import { View, StyleSheet, Modal } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { CameraView } from "expo-camera";
import { useState } from "react";

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
  const handleBarcodeScanned = (result: any) => {
    const { bounds } = result;
    const barcodeCenter = {
      x: bounds.origin.x + bounds.size.width / 2,
      y: bounds.origin.y + bounds.size.height / 2,
    };

    const crosshairLeft = (cameraSize.width - 220) / 2;
    const crosshairTop = 20;
    const crosshairRight = crosshairLeft + 220;
    const crosshairBottom = crosshairTop + 120;

    const isInside =
      barcodeCenter.x >= crosshairLeft &&
      barcodeCenter.x <= crosshairRight &&
      barcodeCenter.y >= crosshairTop &&
      barcodeCenter.y <= crosshairBottom;

    if (isInside) {
      onBarcodeScanned(result);
    }
  };

  return (
    <>
      <Modal visible={scanning} animationType="slide">
        <View style={styles.fullScreen}>
          {scanning ? (
            <View style={{ flex: 1, width: "100%" }}>
              <CameraView
                style={styles.camera}
                onLayout={(e) => setCameraSize(e.nativeEvent.layout)}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              />
              <View style={styles.overlay}>
                <View style={styles.crosshair}></View>
              </View>
              <TouchableRipple onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>✕ Закрыть</Text>
              </TouchableRipple>
            </View>
          ) : (
            <TouchableRipple onPress={onScan} style={styles.scanButton}>
              <Text style={styles.scanText}>СКАНИРОВАТЬ</Text>
            </TouchableRipple>
          )}
        </View>
      </Modal>
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
    backgroundColor: "rgba(0,0,0,0.4)",
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
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  scanButton: {
    backgroundColor: "#b71c1c",
    margin: 16,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    elevation: 4,
  },
  scanText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
