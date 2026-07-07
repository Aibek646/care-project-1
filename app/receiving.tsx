import { View, StyleSheet, Modal, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { useCameraPermissions } from "expo-camera";
import ScanArea from "@/components/ScanArea";
import ProductTable from "@/components/ProductTable";
import { useProducts } from "@/hooks/useProducts";
import { handleScan } from "@/utils/handleScan";
import { Item } from "@/types/item";

export default function Receiving() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const isScanning = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [notFoundBarcode, setNotFoundBarcode] = useState<string | null>(null);
  const { data: apiProducts } = useProducts();

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    handleScan({
      data,
      apiProducts,
      setItems,
      setNotFoundBarcode,
      setScanning,
      isScanning,
    });
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

      <ScanArea
        scanning={scanning}
        scanned={scanned}
        onScan={async () => {
          if (!permission?.granted) await requestPermission();
          isScanning.current = false;
          setScanned(false);
          setScanning(true);
        }}
        onClose={() => setScanning(false)}
        onBarcodeScanned={handleBarCodeScanned}
      />

      <ProductTable
        items={items}
        onDelete={(index) => setItems(items.filter((_, i) => i !== index))}
        onDecrement={(index) =>
          setItems(
            items.map((it, i) =>
              i === index
                ? { ...it, count: Math.max(1, (it.count ?? 1) - 1) }
                : it,
            ),
          )
        }
        onIncrement={(index) =>
          setItems(
            items.map((it, i) =>
              i === index ? { ...it, count: (it.count ?? 0) + 1 } : it,
            ),
          )
        }
      />
      <Modal visible={!!notFoundBarcode} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Товар не найден</Text>
            <Text style={styles.modalBarcode}>{notFoundBarcode}</Text>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                buttonColor="#b71c1c"
                textColor="#ffffff"
                style={{ flex: 1 }}
                onPress={() => {
                  setNotFoundBarcode(null);
                  isScanning.current = false;
                }}
              >
                Закрыть
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    elevation: 5,
  },
  modalTitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  modalBarcode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  modalQuestion: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
