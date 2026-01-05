import { useEffect, useState } from "react";
import { Vehicle, emptyVehicle } from "../models";
import { vehicleService } from "../services";

const PAGE_SIZES = [5, 10, 15, 20] as const;

export const useVehicleForm = () => {
  const [vehicle, setVehicle] = useState<Vehicle>(emptyVehicle);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [step, setStep] = useState(0);

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSizeState] = useState<(typeof PAGE_SIZES)[number]>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof Vehicle, value: string) => {
    setVehicle((prev) => ({ ...prev, [field]: value }));
  };

  const goToStep = (target: number) => setStep(target);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : 0));

  const loadVehiclesPage = async (targetPage = pageIndex, targetSize = pageSize) => {
    try {
      setError(null);
      setLoading(true);

      const page = await vehicleService.getAllPage({
        page: targetPage,
        size: targetSize,
      });

      setVehicles(page.content);
      setTotalPages(page.totalPages);
      setTotalElements(page.totalElements);
      setPageIndex(page.number);
    } catch (e: any) {
      setError(e?.message ?? "Error cargando vehículos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehiclesPage(0, pageSize);
  }, []);

  const setPage = (p: number) => {
    const safe = Math.max(0, Math.min(p, Math.max(totalPages - 1, 0)));
    loadVehiclesPage(safe, pageSize);
  };

  const setPageSize = (size: number) => {
    const safe = (PAGE_SIZES.includes(size as any) ? size : 5) as (typeof PAGE_SIZES)[number];
    setPageSizeState(safe);
    loadVehiclesPage(0, safe);
  };

  const submitVehicle = async () => {
    try {
      setError(null);
      setLoading(true);

      const payload = {
        brand: vehicle.brand,
        model: vehicle.model,
        plate: vehicle.plate,
        ownerName: vehicle.ownerName,
        year: vehicle.year,
        fuelType: vehicle.fuelType,
      };

      if (mode === "create") {
        await vehicleService.create(payload);
      } else {
        if (!editingId) throw new Error("No se pudo actualizar: falta el id");
        await vehicleService.patch(editingId, payload);
      }

      await loadVehiclesPage(pageIndex, pageSize);
      setStep(3);
    } catch (e: any) {
      setError(e?.message ?? "Error guardando vehículo");
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      setError(null);
      setLoading(true);

      await vehicleService.remove(id);

      const page = await vehicleService.getAllPage({
        page: pageIndex,
        size: pageSize,
      });

      if (page.content.length === 0 && pageIndex > 0) {
        await loadVehiclesPage(pageIndex - 1, pageSize);
      } else {
        setVehicles(page.content);
        setTotalPages(page.totalPages);
        setTotalElements(page.totalElements);
        setPageIndex(page.number);
      }
    } catch (e: any) {
      setError(e?.message ?? "Error eliminando vehículo");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (v: Vehicle) => {
    if (!v.id) {
      setError("No se puede editar: el vehículo no tiene id");
      return;
    }
    setVehicle(v);
    setMode("edit");
    setEditingId(v.id);
    setStep(0);
  };

  const startNew = () => {
    setVehicle(emptyVehicle);
    setMode("create");
    setEditingId(null);
    setStep(0);
  };

  return {
    vehicle,
    vehicles,
    step,
    mode,
    loading,
    error,

    pageIndex,
    totalPages,
    totalElements,
    pageSize,
    setPage,
    setPageSize,

    updateField,
    nextStep,
    prevStep,
    goToStep,

    submitVehicle,
    deleteVehicle,
    startEdit,

    startNew,
    reloadVehicles: () => loadVehiclesPage(pageIndex, pageSize),
  };
};
