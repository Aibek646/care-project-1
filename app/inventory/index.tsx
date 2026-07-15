import { View, StyleSheet, FlatList, Pressable } from "react-native";
import {
  Appbar,
  Text,
  TouchableRipple,
  IconButton,
  Button,
} from "react-native-paper";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReceivingStore } from "@/store/receivingStore";
import TitleModal from "@/components/modals/TitleModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function ReceivingList() {
  const { t } = useTranslation();
  const { documents, createDocument, deleteDocument } = useReceivingStore();
  const [createVisible, setCreateVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const isSwiping = useRef(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#b71c1c" }}>
        <Appbar.BackAction color="#fff" onPress={() => router.back()} />
        <Appbar.Content
          title={t("menuInventory")}
          titleStyle={{ color: "#fff" }}
        />
      </Appbar.Header>

      <FlatList
        data={documents}
        keyExtractor={(doc) => doc.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t("noDocuments")}</Text>
        }
        renderItem={({ item: doc }) => (
          <ReanimatedSwipeable
            friction={1}
            rightThreshold={40}
            overshootFriction={4}
            onSwipeableOpenStartDrag={() => (isSwiping.current = true)}
            onSwipeableClose={() => (isSwiping.current = false)}
            renderRightActions={() => (
              <TouchableRipple
                style={styles.deleteAction}
                onPress={() => setDeleteId(doc.id)}
                rippleColor="rgba(0,0,0,0.1)"
              >
                <IconButton
                  icon="trash-can-outline"
                  iconColor="#fff"
                  size={28}
                />
              </TouchableRipple>
            )}
          >
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && { backgroundColor: "#ececec" },
              ]}
              unstable_pressDelay={250}
              onPress={() => {
                if (isSwiping.current) return;
                router.push(`/inventory/${doc.id}`);
              }}
            >
              <View style={styles.cardInner}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{doc.title}</Text>
                  <Text style={styles.cardSub}>
                    {new Date(doc.createdAt).toLocaleDateString()}{" "}
                    {new Date(doc.createdAt).toLocaleTimeString().slice(0, 5)}
                  </Text>
                  <Text
                    style={[
                      styles.badge,
                      doc.status === "sent"
                        ? styles.badgeSent
                        : styles.badgeDraft,
                    ]}
                  >
                    {doc.status === "sent" ? t("statusSent") : t("statusDraft")}
                  </Text>
                </View>

                <Text style={styles.cardCount}>
                  {doc.items.length} {t("rows")}
                </Text>
                <IconButton icon="chevron-right" iconColor="#999" />
              </View>
            </Pressable>
          </ReanimatedSwipeable>
        )}
      />

      <Button
        mode="contained"
        buttonColor="#b71c1c"
        textColor="#fff"
        style={styles.createButton}
        contentStyle={{ paddingVertical: 8 }}
        onPress={() => setCreateVisible(true)}
      >
        + {t("createDocument")}
      </Button>

      <TitleModal
        visible={createVisible}
        currentTitle={null}
        onConfirm={(title) => {
          const id = createDocument(title);
          setCreateVisible(false);
          router.push(`/inventory/${id}`);
        }}
        onCancel={() => setCreateVisible(false)}
      />
      <DeleteItemModal
        visible={deleteId !== null}
        onConfirm={() => {
          if (deleteId) deleteDocument(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  list: { padding: 12, gap: 8 },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    overflow: "hidden",
  },
  cardInner: { flexDirection: "row", alignItems: "center", padding: 16 },
  cardTitle: { fontSize: 17, fontWeight: "600", color: "#212121" },
  cardSub: { fontSize: 13, color: "#9e9e9e", marginTop: 2 },
  cardCount: { fontSize: 15, color: "#555", marginRight: 4 },
  createButton: { margin: 16, marginBottom: 40, borderRadius: 12 },
  badge: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  badgeDraft: { backgroundColor: "#fff3e0", color: "#e65100" },
  badgeSent: { backgroundColor: "#e8f5e9", color: "#2e7d32" },
  deleteAction: {
    backgroundColor: "#b71c1c",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginLeft: 8,
  },
});
