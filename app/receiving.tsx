import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Text, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Receiving() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState<{ barcode: string; count: number }[]>([]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScanning(false);
    setItems((prev) => [...prev, { barcode: data, count: 1 }]);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content
          title="Поступление"
          titleStyle={{
            color: "#fff",
          }}
        />
      </Appbar.Header>
      <View style={styles.scanArea}>
        {scanning ? (
          <View style={{ flex: 1, width: "100%" }}>
            <CameraView
              style={styles.camera}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <TouchableRipple
              onPress={() => setScanning(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>✕ Закрыть</Text>
            </TouchableRipple>
          </View>
        ) : (
          <TouchableRipple
            onPress={async () => {
              if (!permission?.granted) {
                await requestPermission();
              }
              setScanned(false);
              setScanning(true);
            }}
            style={styles.scanButton}
          >
            <Text style={styles.scanText}>СКАНИРУЙТЕ ШК</Text>
          </TouchableRipple>
        )}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Всего строк: {items.length}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Номенклатура</Text>
          <Text style={styles.tableHeaderText}>Факт</Text>
        </View>
        {items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.barcode}</Text>
            <Text style={styles.tableCell}>{item.count}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scanArea: {
    backgroundColor: "#fff",
    margin: 12,
    borderRadius: 10,
    elevation: 2,
    height: 200,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
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
  closeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  table: {
    margin: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e0e0e0",
    padding: 12,
    justifyContent: "space-between",
  },
  tableHeaderText: {
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  tableCell: {
    color: "#333",
    fontSize: 14,
  },
  totalRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  totalText: {
    color: "#555",
    fontSize: 14,
  },
});
