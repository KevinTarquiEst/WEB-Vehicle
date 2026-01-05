import { StyleSheet, View } from "react-native";
import { useVehicleForm } from "./src/state/useVehicleForm";
import {
  Step1VehicleScreen,
  Step2VehicleScreen,
  Step3SummaryScreen,
  VehiclesScreen,
} from "./src/screens";

export default function App() {
  const {
    vehicle,
    vehicles,
    step,
    mode,
    updateField,
    goToStep,
    nextStep,
    prevStep,
    submitVehicle,
    deleteVehicle,
    startEdit,
    startNew,
    pageIndex,
    pageSize,
    totalElements,
    totalPages,
    setPage,
    setPageSize,
  } = useVehicleForm();

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <Step1VehicleScreen
            vehicle={vehicle}
            onChange={updateField}
            onNext={nextStep}
            onMain={() => goToStep(3)}
          />
        );

      case 1:
        return (
          <Step2VehicleScreen
            vehicle={vehicle}
            onChange={updateField}
            onBack={prevStep}
            onNext={nextStep}
            onMain={() => goToStep(3)}
          />
        );

      case 2:
        return (
          <Step3SummaryScreen
            vehicle={vehicle}
            onBack={prevStep}
            submitVehicle={submitVehicle}
            mode={mode}
          />
        );

      case 3:
        return (
          <VehiclesScreen
            vehicles={vehicles}
            onRegisterAnother={startNew}
            onDelete={deleteVehicle}
            onEdit={startEdit}
            pageIndex={pageIndex}
            totalPages={totalPages}
            totalElements={totalElements}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        );

      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
