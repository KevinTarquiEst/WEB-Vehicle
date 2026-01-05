import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormInput, FormButton } from "../components";
import { Vehicle } from "../models";

type Step1VehicleScreenProps = {
  vehicle: Vehicle;
  onChange: (field: keyof Vehicle, value: string) => void;
  onNext: () => void;
  onMain: () => void;
};

export const Step1VehicleScreen = ({
  vehicle,
  onChange,
  onNext,
  onMain,
}: Step1VehicleScreenProps) => {
  const [showErrors, setShowErrors] = useState(false);
  const brandEmpty = vehicle.brand.trim() === "";
  const modelEmpty = vehicle.model.trim() === "";
  const isValid = !brandEmpty && !modelEmpty;

  const handleNext = () => {
    setShowErrors(true);
    if (isValid) onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de un vehículo – Paso 1 de 3</Text>

      <FormInput
        label="Marca"
        placeholder="Toyota"
        value={vehicle.brand}
        onChangeText={(value) => onChange("brand", value)}
        required
        smsError={
          showErrors && brandEmpty ? "La marca es obligatoria" : undefined
        }
      />

      <FormInput
        label="Modelo"
        placeholder="Corolla"
        value={vehicle.model}
        onChangeText={(value) => onChange("model", value)}
        required
        smsError={
          showErrors && modelEmpty ? "El modelo es obligatorio" : undefined
        }
      />

      <FormButton label="Continuar" onPress={handleNext} />
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
