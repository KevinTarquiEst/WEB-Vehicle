import { Platform } from "react-native";
import type { Vehicle } from "../models";

const BASE_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:8080"
        : "http://localhost:8080";

const API_PREFIX = "/v1/vehicles";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
};

type VehicleDto = Vehicle & { id: number };
type VehicleCreateDto = Omit<Vehicle, "id">;
type VehiclePatchDto = Partial<Omit<Vehicle, "id">>;

async function request<T>(
    path: string,
    method: HttpMethod,
    body?: unknown
): Promise<T> {
    const res = await fetch(`${BASE_URL}${API_PREFIX}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    // Manejo simple de errores
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
    }

    if (method === "DELETE") return undefined as T;

    return (await res.json()) as T;
}

export const vehicleService = {
    // GET ALL (lista)
    getAllList: () => request<VehicleDto[]>("/list", "GET"),

    // GET ALL (paginado)
    getAllPage: (params?: { page?: number; size?: number; sort?: string }) => {
        const page = params?.page ?? 0;
        const size = params?.size ?? 5;
        const sort = params?.sort ? `&sort=${encodeURIComponent(params.sort)}` : "";
        return request<Page<VehicleDto>>(`?page=${page}&size=${size}${sort}`, "GET");
    },


    // GET BY ID
    getById: (id: number) => request<VehicleDto>(`/${id}`, "GET"),

    // POST
    create: (payload: VehicleCreateDto) => request<VehicleDto>("", "POST", payload),

    // PATCH
    patch: (id: number, payload: VehiclePatchDto) => request<VehicleDto>(`/${id}`, "PATCH", payload),

    // DELETE
    remove: (id: number) => request<void>(`/${id}`, "DELETE"),
};
