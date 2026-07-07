import { View, StyleSheet } from "react-native";
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
    <View style={styles.scanArea}>
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
          <Text style={styles.scanText}>СКАНИРУЙТЕ ШК</Text>
        </TouchableRipple>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scanArea: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 10,
    elevation: 2,
    height: 200,
    overflow: "hidden",
  },
  camera: { flex: 1 },
  scanButton: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scanText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  closeButton: {
    backgroundColor: "#b71c1c",
    padding: 12,
    alignItems: "center",
  },
  closeText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    paddingTop: 20,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  crosshair: {
    width: 220,
    height: 120,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
});
