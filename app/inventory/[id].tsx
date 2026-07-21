import { View, StyleSheet, Modal, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";
import { useCameraPermissions } from "expo-camera";
import ScanArea from "@/components/ScanArea";
import ProductTable from "@/components/ProductTable";
import { useProducts } from "@/hooks/useProducts";
import { handleScan } from "@/utils/handleScan";
import EditItemModal from "@/components/modals/EditItemModal";
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import { useTranslation } from "react-i18next";
import { saveAndShare } from "@/utils/saveReceiving";
import { useReceivingStore } from "@/store/receivingStore";
import TitleModal from "@/components/modals/TitleModal";
import { Item } from "@/types/item";
import ConfirmScanModal from "@/components/modals/ConfirmScanModal";
import { PendingScan } from "@/types/pendingScan";

export default function Id() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const isScanning = useRef(false);
  const [scanned, setScanned] = useState(false);
  const [pendingScan, setPendingScan] = useState<PendingScan | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [notFoundBarcode, setNotFoundBarcode] = useState<string | null>(null);
  const [lastAddedBarcode, setLastAddedBarcode] = useState<string | null>(null);
  const [titleModalVisible, setTitleModalVisible] = useState(false);
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: apiProducts } = useProducts();

  const {
    documents,
    setItems: setDocItems,
    renameDocument,
    markSent,
  } = useReceivingStore();

  const doc = documents.find((d) => d.id === id);
  const items = doc?.items ?? [];
  const title = doc?.title ?? null;

  const setItems = (fn: (prev: Item[]) => Item[]) => setDocItems(id, fn);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    handleScan({
      data,
      apiProducts,
      setNotFoundBarcode,
      setScanning,
      isScanning,
      onFound: (pending) => setPendingScan(pending),
    });
  };

  const handleConfirmScan = (value: number) => {
    if (!pendingScan) return;
    const p = pendingScan;

    setItems((prev) => {
      const existing = prev.findIndex((item) => item.barcode === p.barcode);
      if (existing !== -1) {
        return prev.map((item, i) => {
          if (i !== existing) return item;
          return p.type === "weight"
            ? { ...item, totalWeight: (item.totalWeight ?? 0) + value }
            : { ...item, count: (item.count ?? 0) + value };
        });
      }
      const newItem: Item =
        p.type === "weight"
          ? {
              barcode: p.barcode,
              fullBarcode: p.fullBarcode,
              name: p.name,
              image: p.image,
              totalWeight: value,
              type: "weight",
            }
          : {
              barcode: p.barcode,
              fullBarcode: p.fullBarcode,
              name: p.name,
              image: p.image,
              count: value,
              type: p.type,
            };
      return [...prev, newItem];
    });

    setLastAddedBarcode(p.barcode);
    setTimeout(() => setLastAddedBarcode(null), 1500);

    setPendingScan(null);
    isScanning.current = false;
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content
          title={title ? `${t("menuInventory")}: ${title}` : t("menuInventory")}
          titleStyle={{
            color: "#fff",
          }}
        />
        <Appbar.Action
          icon="pencil"
          color="#fff"
          onPress={() => setTitleModalVisible(true)}
        />
        <Appbar.Action
          icon="content-save"
          color="#fff"
          onPress={async () => {
            await saveAndShare(items, title);
            markSent(id);
          }}
        />
      </Appbar.Header>

      <ProductTable
        items={items}
        onDelete={(index) => setDeleteIndex(index)}
        onEdit={(index) => setEditIndex(index)}
        lastAddedBarcode={lastAddedBarcode}
      />
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
      <DeleteItemModal
        visible={deleteIndex !== null}
        onConfirm={() => {
          setItems((prev) => prev.filter((_, i) => i !== deleteIndex));
          setDeleteIndex(null);
        }}
        onCancel={() => setDeleteIndex(null)}
      />
      <EditItemModal
        visible={editIndex !== null}
        item={editIndex !== null ? items[editIndex] : null}
        onConfirm={(value) => {
          setItems((prev) =>
            prev.map((it, i) => {
              if (i !== editIndex) return it;
              return it.type === "weight"
                ? { ...it, totalWeight: value }
                : { ...it, count: value };
            }),
          );
          setEditIndex(null);
        }}
        onCancel={() => setEditIndex(null)}
      />
      <Modal visible={!!notFoundBarcode} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{t("notFound")}</Text>
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
                {t("close")}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <TitleModal
        visible={titleModalVisible}
        currentTitle={title}
        onConfirm={(newTitle) => {
          renameDocument(id, newTitle);
          setTitleModalVisible(false);
        }}
        onCancel={() => setTitleModalVisible(false)}
      />
      <ConfirmScanModal
        pending={pendingScan}
        onConfirm={handleConfirmScan}
        onCancel={() => {
          setPendingScan(null);
          isScanning.current = false;
        }}
      />
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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
});
