import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Item } from "@/types/item";

export async function saveAndShare(items: Item[], title: string | null) {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 5).replace(":", "-");

  const fileName = `${title ?? "inventory"}_${date}_${time}.json`;

  const data = {
    title: title,
    date: new Date().toISOString(),
    items: items.map((it) => ({
      name: it.name,
      barcode: it.fullBarcode,
      type: it.type,
      totalWeight: it.totalWeight ?? null,
      count: it.count ?? null,
    })),
  };
  const json = JSON.stringify(data, null, 2);

  const file = new FileSystem.File(FileSystem.Paths.cache, fileName);
  file.write(json);

  await Sharing.shareAsync(file.uri);
}
