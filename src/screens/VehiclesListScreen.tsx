import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FormButton } from "../components";
import { Vehicle } from "../models";

type VehiclesListScreenProps = {
  vehicles: Vehicle[];
  onRegisterAnother: () => void;
};

export const VehiclesListScreen = ({
  vehicles,
  onRegisterAnother,
}: VehiclesListScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehículos registrados</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerCell]}>Placa</Text>
        <Text style={[styles.cell, styles.headerCell]}>Dueño</Text>
        <Text style={[styles.cell, styles.headerCell]}>Marca</Text>
        <Text style={[styles.cell, styles.headerCell]}>Modelo</Text>
      </View>

      <ScrollView style={styles.tableBody}>
        {vehicles.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay vehículos registrados aún.
          </Text>
        ) : (
          vehicles.map((v) => (
            <View key={v.plate} style={styles.tableRow}>
              <Text style={styles.cell}>{v.plate}</Text>
              <Text style={styles.cell}>{v.ownerName}</Text>
              <Text style={styles.cell}>{v.brand}</Text>
              <Text style={styles.cell}>{v.model}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <FormButton label="Registrar otro" onPress={onRegisterAnother} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  headerCell: {
    fontWeight: "700",
  },
  tableBody: {
    flex: 1,
    marginBottom: 16,
  },
  emptyText: {
    marginTop: 16,
    textAlign: "center",
    color: "#6b7280",
  },
});
