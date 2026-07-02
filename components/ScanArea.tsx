import { View, StyleSheet } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { CameraView } from "expo-camera";

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
  return (
    <View style={styles.scanArea}>
      {scanning ? (
        <View style={{ flex: 1, width: "100%" }}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={scanned ? undefined : onBarcodeScanned}
          />
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
});
