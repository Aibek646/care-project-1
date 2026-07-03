import { View, StyleSheet, Modal } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { router } from "expo-router";
import { useState, useRef } from "react";
import { useCameraPermissions } from "expo-camera";
import ScanArea from "@/components/ScanArea";
import ProductTable from "@/components/ProductTable";
import { products } from "@/data/prodcuts";

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
  const [pendingBarcode, setPendingBarcode] = useState<string | null>(null);

  // const handleBarCodeScanned = ({ data }: { data: string }) => {
  //   if (isScanning.current) return;
  //   isScanning.current = true;
  //   setScanned(true);
  //   setScanning(false);
  //   const product = products.find((p) => p.barcode === data);
  //   if (product) {
  //     setItems((prev) => [
  //       ...prev,
  //       {
  //         barcode: data,
  //         name: product.name,
  //         image: product.image,
  //         count: 1,
  //         price: product.price,
  //         stock: product.stock,
  //       },
  //     ]);
  //   } else {
  //     setItems((prev) => [
  //       ...prev,
  //       { barcode: data, name: null, image: null, count: 1 },
  //     ]);
  //   }
  // };
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (isScanning.current) return;
    isScanning.current = true;
    setScanning(false);
    setPendingBarcode(data);
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
              i === index ? { ...it, count: Math.max(1, it.count - 1) } : it,
            ),
          )
        }
        onIncrement={(index) =>
          setItems(
            items.map((it, i) =>
              i === index ? { ...it, count: it.count + 1 } : it,
            ),
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
});
