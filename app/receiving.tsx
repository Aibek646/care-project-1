import { View, StyleSheet, Image } from "react-native";
import { Appbar, Text, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

const products = [
  {
    barcode: "9785977518185",
    name: "Python на практике",
    image: require("../assets/images/python.jpg"),
  },
  {
    barcode: "9785943872716",
    name: "JavaScript для FrontEnd-разработчиков",
    image: require("../assets/images/javascript.jpg"),
  },
];

export default function Receiving() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const isScanning = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState<
    {
      barcode: string;
      name: string | null;
      image: any;
      count: number;
    }[]
  >([]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (isScanning.current) return;
    isScanning.current = true;
    setScanned(true);
    setScanning(false);
    const product = products.find((p) => p.barcode === data);
    if (product) {
      setItems((prev) => [
        ...prev,
        { barcode: data, name: product.name, image: product.image, count: 1 },
      ]);
    } else {
      setItems((prev) => [
        ...prev,
        { barcode: data, name: null, image: null, count: 1 },
      ]);
    }
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
              isScanning.current = false;
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
            {item.image && (
              <Image source={item.image} style={styles.productImage} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.tableCell}>{item.name ?? item.barcode}</Text>
              {item.name && (
                <Text style={styles.barcodeText}>{item.barcode}</Text>
              )}
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <TouchableRipple
                onPress={() =>
                  setItems(
                    items.map((it, i) =>
                      i === index
                        ? { ...it, count: Math.max(1, it.count - 1) }
                        : it,
                    ),
                  )
                }
              >
                <Text style={styles.countBtn}>-</Text>
              </TouchableRipple>
              <Text style={styles.tableCell}>{item.count}</Text>
              <TouchableRipple
                onPress={() =>
                  setItems(
                    items.map((it, i) =>
                      i === index
                        ? { ...it, count: Math.max(1, it.count + 1) }
                        : it,
                    ),
                  )
                }
              >
                <Text style={styles.countBtn}>+</Text>
              </TouchableRipple>
            </View>
            <TouchableRipple
              onPress={() => setItems(items.filter((_, i) => i !== index))}
              rippleColor="rgba(0,0,0,0.1)"
            >
              <Text
                style={{
                  color: "red",
                  paddingHorizontal: 9,
                  marginTop: 0,
                  fontSize: 18,
                }}
              >
                x
              </Text>
            </TouchableRipple>
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
    fontSize: 18,
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
    alignItems: "center",
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
  countBtn: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: "#b71c1c",
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8,
  },
  barcodeText: {
    fontSize: 11,
    color: "#999",
  },
});
