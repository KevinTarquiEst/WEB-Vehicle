export type Vehicle = {
  id?: number;
  brand: string;
  model: string;
  plate: string;
  ownerName: string;
  year: string;
  fuelType: string;
};

export const emptyVehicle: Vehicle = {
  brand: "",
  model: "",
  plate: "",
  ownerName: "",
  year: "",
  fuelType: "",
};
