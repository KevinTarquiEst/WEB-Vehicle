import { StyleSheet, Text, View } from "react-native";
import { FormButton } from "../components";
import { Vehicle } from "../models";

type Step3SummaryScreenProps = {
  vehicle: Vehicle;
  onBack: () => void;
  submitVehicle: () => void;
  mode: "create" | "edit";
};

export const Step3SummaryScreen = ({
  vehicle,
  onBack,
  submitVehicle,
  mode,
}: Step3SummaryScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de un vehículo – Paso 3 de 3</Text>
      <View style={styles.card}>
        <Text style={styles.row}>Marca: {vehicle.brand}</Text>
        <Text style={styles.row}>Modelo: {vehicle.model}</Text>
        <Text style={styles.row}>Placa: {vehicle.plate}</Text>
        <Text style={styles.row}>Nombre del dueño: {vehicle.ownerName}</Text>
        <Text style={styles.row}>Año: {vehicle.year}</Text>
        <Text style={styles.row}>Tipo de gasolina: {vehicle.fuelType}</Text>
      </View>

      <FormButton
        label={mode === "create" ? "Registrar vehículo" : "Actualizar vehículo"}
        onPress={submitVehicle}
      />
      <FormButton label="Regresar" onPress={onBack} />
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
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#fff",
  },
  row: {
    fontSize: 16,
    marginBottom: 8,
    color: "#111827",
  },
});
