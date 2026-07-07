import { View, StyleSheet, Modal, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { useCameraPermissions } from "expo-camera";
import ScanArea from "@/components/ScanArea";
import ProductTable from "@/components/ProductTable";
import { products } from "@/data/prodcuts";
import { parseBarcode } from "@/utils/barcode";

export default function Receiving() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const isScanning = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [items, setItems] = useState<
    {
      barcode: string;
      plu?: string;
      name: string | null;
      image: any;
      count: number;
      totalWeight?: number;
      price?: number;
      stock?: number;
      type: "unit" | "weight" | "pieceWeight";
    }[]
  >([]);
  const [pendingBarcode, setPendingBarcode] = useState<string | null>(null);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (isScanning.current) return;
    isScanning.current = true;
    setScanning(false);

    const parsed = parseBarcode(data);
    if (parsed.type === "weight") {
      setItems((prev) => {
        const existing = prev.findIndex((item) => item.plu === parsed.plu);
        if (existing !== -1) {
          return prev.map((item, i) =>
            i === existing
              ? {
                  ...item,
                  count: item.count + 1,
                  totalWeight: (item.totalWeight ?? 0) + parsed.weight,
                }
              : item,
          );
        }
        return [
          ...prev,
          {
            barcode: data,
            plu: parsed.plu,
            name: null,
            image: null,
            count: 1,
            totalWeight: parsed.weight,
            type: "weight" as const,
          },
        ];
      });
    } else if (parsed.type === "pieceWeight") {
      setItems((prev) => {
        const existing = prev.findIndex((item) => item.plu === parsed.plu);
        if (existing !== -1) {
          return prev.map((item, i) =>
            i === existing ? { ...item, count: (item.count ?? 0) + 1 } : item,
          );
        }
        return [
          ...prev,
          {
            barcode: data,
            plu: parsed.plu,
            name: null,
            image: null,
            count: 1,
            type: "pieceWeight" as const,
          },
        ];
      });
    } else {
      setPendingBarcode(data);
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
                ? {
                    ...it,
                    count: Math.max(1, it.count - 1),
                    totalWeight: it.weightPerUnit
                      ? it.weightPerUnit * Math.max(1, it.count - 1)
                      : it.totalWeight,
                  }
                : it,
            ),
          )
        }
        onIncrement={(index) =>
          setItems(
            items.map((it, i) =>
              i === index
                ? {
                    ...it,
                    count: it.count + 1,
                    totalWeight: it.weightPerUnit
                      ? it.weightPerUnit * (it.count + 1)
                      : it.totalWeight,
                  }
                : it,
            ),
          )
        }
      />
      <Modal visible={!!pendingBarcode} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Отсканирован штрихкод:</Text>
            <Text style={styles.modalBarcode}>{pendingBarcode}</Text>
            <Text style={styles.modalQuestion}>Добавить в таблицу?</Text>
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                buttonColor="#b71c1c"
                textColor="#ffffff"
                onPress={() => {
                  setPendingBarcode(null);
                  isScanning.current = false;
                }}
              >
                Отмена
              </Button>
              <Button
                mode="contained"
                buttonColor="#4caf50"
                textColor="#ffffff"

                onPress={() => {
                  if (!pendingBarcode) return;
                  const product = products.find(
                    (p) => p.barcode === pendingBarcode,
                  );
                  if (product) {
                    setItems((prev) => [
                      ...prev,
                      {
                        barcode: pendingBarcode,
                        name: product.name,
                        image: product.image,
                        count: 1,
                        price: product.price,
                        stock: product.stock,
                        type: "unit" as const,
                      },
                    ]);
                  } else {
                    setItems((prev) => [
                      ...prev,
                      {
                        barcode: pendingBarcode,
                        name: null,
                        image: null,
                        count: 1,
                        type: "unit" as const,
                      },
                    ]);
                  }
                  setPendingBarcode(null);
                  isScanning.current = false;
                }}
              >
                Добавить
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
