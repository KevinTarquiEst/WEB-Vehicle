import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { FormButton } from "../components";
import { Vehicle } from "../models";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];

type VehiclesScreenProps = {
  vehicles: Vehicle[];
  onRegisterAnother: () => void;
  onDelete: (id: number) => void;
  onEdit: (vehicle: Vehicle) => void;

  pageIndex: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;

  onPageChange: (page: number) => void;

  onPageSizeChange: (size: number) => void;
};

export const VehiclesScreen = ({
  vehicles,
  onRegisterAnother,
  onDelete,
  onEdit,
  pageIndex,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: VehiclesScreenProps) => {
  const confirmDelete = (v: Vehicle) => {
    if (!v.id) return;

    Alert.alert(
      "Eliminar vehículo",
      `¿Seguro que deseas eliminar el vehículo con la placa ${v.plate}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onDelete(v.id!),
        },
      ]
    );
  };

  const start = totalElements === 0 ? 0 : pageIndex * pageSize + 1;
  const end = pageIndex * pageSize + vehicles.length;

  const getPagesToShow = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);
    const start = Math.max(0, Math.min(pageIndex - 3, totalPages - 7));
    return Array.from({ length: 7 }, (_, i) => start + i);
  };

  const pages = totalPages > 0 ? getPagesToShow() : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos registrados</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerCell]}>Placa</Text>
        <Text style={[styles.cell, styles.headerCell]}>Dueño</Text>
        <Text style={[styles.cell, styles.headerCell]}>Marca</Text>
        <Text style={[styles.cell, styles.headerCell]}>Acciones</Text>
      </View>

      <ScrollView style={styles.tableBody}>
        {vehicles.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay vehículos registrados aún.
          </Text>
        ) : (
          vehicles.map((v) => (
            <View key={String(v.id ?? v.plate)} style={styles.tableRow}>
              <Text style={styles.cell}>{v.plate}</Text>
              <Text style={styles.cell}>{v.ownerName}</Text>
              <Text style={styles.cell}>{v.brand}</Text>

              <View style={[styles.cell, styles.actionsCell]}>
                <Pressable
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() => onEdit(v)}
                >
                  <Text style={styles.actionText}>Editar</Text>
                </Pressable>

                <Pressable
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => confirmDelete(v)}
                >
                  <Text style={styles.actionText}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Text style={styles.pageInfo}>
        Mostrando {start}–{end} de {totalElements} · Página{" "}
        {totalPages === 0 ? 0 : pageIndex + 1} de {totalPages}
      </Text>

      <View style={styles.pageSizeRow}>
        <Text style={styles.pageSizeLabel}>Mostrar:</Text>

        <View style={styles.pageSizeOptions}>
          {PAGE_SIZE_OPTIONS.map((opt) => {
            const active = opt === pageSize;
            return (
              <Pressable
                key={opt}
                onPress={() => onPageSizeChange(opt)}
                disabled={active}
                style={[
                  styles.sizeChip,
                  active ? styles.sizeChipActive : styles.sizeChipInactive,
                ]}
              >
                <Text
                  style={[
                    styles.sizeChipText,
                    active && styles.sizeChipTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {totalPages >= 1 && (
        <View style={styles.pagination}>
          {pages.map((p) => {
            const active = p === pageIndex;
            return (
              <Pressable
                key={p}
                onPress={() => onPageChange(p)}
                disabled={active}
                style={[
                  styles.pageBtn,
                  active ? styles.pageBtnActive : styles.pageBtnInactive,
                ]}
              >
                <Text
                  style={[styles.pageText, active && styles.pageTextActive]}
                >
                  {p + 1}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <FormButton label="Registrar otro" onPress={onRegisterAnother} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 16 },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
  },
  cell: { flex: 1, fontSize: 14 },
  headerCell: { fontWeight: "700" },

  tableBody: { flex: 1, marginBottom: 10 },
  emptyText: { marginTop: 16, textAlign: "center", color: "#6b7280" },

  actionsCell: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  editBtn: { borderColor: "#2563eb" },
  deleteBtn: { borderColor: "#dc2626" },
  actionText: { fontSize: 12, fontWeight: "600" },

  pageInfo: {
    textAlign: "center",
    marginBottom: 8,
    color: "#6b7280",
    fontSize: 13,
  },

  pageSizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  pageSizeLabel: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },
  pageSizeOptions: {
    flexDirection: "row",
    gap: 8,
  },
  sizeChip: {
    minWidth: 40,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  sizeChipActive: {
    borderColor: "#111827",
  },
  sizeChipInactive: {
    borderColor: "#d1d5db",
  },
  sizeChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sizeChipTextActive: {
    fontWeight: "800",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  pageBtn: {
    minWidth: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  pageBtnActive: { borderColor: "#111827" },
  pageBtnInactive: { borderColor: "#d1d5db" },
  pageText: { fontSize: 13, fontWeight: "600" },
  pageTextActive: { fontWeight: "800" },
});
