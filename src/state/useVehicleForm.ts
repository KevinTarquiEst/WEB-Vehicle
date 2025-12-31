import { useEffect, useState } from "react";
import { Vehicle, emptyVehicle } from "../models";
import { vehicleService } from "../services";

export const TOTAL_STEPS = 3;

export const useVehicleForm = () => {
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [step, setStep] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof Vehicle, value: string) => {
    setVehicle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const goToStep = (target: number) => setStep(target);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : 0));

  const loadVehicles = async () => {
    try {
      setError(null);
      setLoading(true);
      const list = await vehicleService.getAllList();
      setVehicles(list);
    } catch (e: any) {
      setError(e?.message ?? "Error cargando vehículos");
    } finally {
      setLoading(false);
    }
  };

  // Cargar lista al iniciar (para que cuando vayas al listado ya esté)
  useEffect(() => {
    loadVehicles();
  }, []);

  const registerVehicle = async () => {
    try {
      setError(null);
      setLoading(true);

      // POST al backend
      await vehicleService.create({
        brand: vehicle.brand,
        model: vehicle.model,
        plate: vehicle.plate,
        ownerName: vehicle.ownerName,
        year: vehicle.year,
        fuelType: vehicle.fuelType,
      });

      // refrescar lista desde backend
      await loadVehicles();

      // ir al "paso 3" (tu pantalla de listado)
      setStep(3);
    } catch (e: any) {
      setError(e?.message ?? "Error registrando vehículo");
    } finally {
      setLoading(false);
    }
  };

  const startNew = () => {
    setVehicle(emptyVehicle);
    setStep(0);
  };

  return {
    vehicle,
    vehicles,
    step,
    loading,
    error,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    registerVehicle,
    startNew,
    reloadVehicles: loadVehicles,
  };
};
