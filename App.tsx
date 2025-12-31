import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useVehicleForm } from './src/state/useVehicleForm';
import { Step1VehicleScreen, Step2VehicleScreen, Step3SummaryScreen, VehiclesListScreen } from './src/screens';

export default function App() {
  const {
    vehicle,
    vehicles,
    step,
    updateField,
    nextStep,
    prevStep,
    registerVehicle,
    startNew,
  } = useVehicleForm();

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <Step1VehicleScreen
            vehicle={vehicle}
            onChange={updateField}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <Step2VehicleScreen
            vehicle={vehicle}
            onChange={updateField}
            onBack={prevStep}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step3SummaryScreen
            vehicle={vehicle}
            onBack={prevStep}
            onRegister={registerVehicle}
          />
        );
      case 3:
        return (
          <VehiclesListScreen
            vehicles={vehicles}
            onRegisterAnother={startNew}
          />
        );
      default:
        return null;
    }
  };

  return (
      <View style={styles.container}>{renderContent()}</View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
