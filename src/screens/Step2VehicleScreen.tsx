import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormInput, FormButton } from "../components";
import { Vehicle } from "../models";

type Step2VehicleScreenProps = {
  vehicle: Vehicle;
  onChange: (field: keyof Vehicle, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onMain: () => void;
};

export const Step2VehicleScreen = ({
  vehicle,
  onChange,
  onNext,
  onBack,
  onMain,
}: Step2VehicleScreenProps) => {
  const [showErrors, setShowErrors] = useState(false);
  const plateEmpty = vehicle.plate.trim() === "";
  const ownerEmpty = vehicle.ownerName.trim() === "";
  const yearEmpty = vehicle.year.trim() === "";
  const fuelEmpty = vehicle.fuelType.trim() === "";
  const isValid = !plateEmpty && !ownerEmpty && !yearEmpty && !fuelEmpty;

  const handleNext = () => {
    if (isValid) onNext();
    setShowErrors(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de un vehículo – Paso 2 de 3</Text>

      <FormInput
        label="Placa"
        required
        placeholder="ABC-1234"
        autoCapitalize="characters"
        value={vehicle.plate}
        onChangeText={(value) => onChange("plate", value)}
        smsError={
          showErrors && plateEmpty ? "La placa es obligatoria" : undefined
        }
      />

      <FormInput
        label="Nombre del dueño"
        required
        placeholder="Juan Pérez"
        value={vehicle.ownerName}
        onChangeText={(value) => onChange("ownerName", value)}
        smsError={
          showErrors && ownerEmpty
            ? "El nombre del dueño es obligatorio"
            : undefined
        }
      />

      <FormInput
        label="Año"
        required
        typeInput="integer"
        placeholder="2020"
        keyboardType="numeric"
        value={vehicle.year}
        onChangeText={(value) => onChange("year", value)}
        smsError={showErrors && yearEmpty ? "El año es obligatorio" : undefined}
      />

      <FormInput
        label="Tipo de gasolina"
        required
        placeholder="Extra / Súper / Diésel"
        value={vehicle.fuelType}
        onChangeText={(value) => onChange("fuelType", value)}
        smsError={
          showErrors && fuelEmpty
            ? "El tipo de gasolina es obligatorio"
            : undefined
        }
      />

      <FormButton label="Continuar" onPress={handleNext} />
      <FormButton label="Regresar" onPress={onBack} />
      <FormButton label="Volver al menú principal" onPress={onMain} />
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
});
