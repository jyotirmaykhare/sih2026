"use client";

// NER GIS map engine — MapLibre GL with data-driven status styling.
// Client-only (loaded via next/dynamic with ssr:false in map-panel.tsx).

import maplibregl, { Map as MlMap, NavigationControl, ScaleControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { MAP_MAX_BOUNDS, NER_BOUNDS, NER_CENTER } from "@/lib/constants";
import { NER_BASE_STYLE } from "@/components/map/map-style";
import { addBaseLayers } from "@/components/map/map-layers-base";
import { addOverlayLayers } from "@/components/map/map-layers-overlays";
import {
  applyData,
  applySelection,
  applyVisibility,
  type MapDataBundle,
} from "@/components/map/map-state";
import type { LayerId } from "@/types";

export interface NerMapProps {
  data: MapDataBundle;
  layerVisibility: Record<LayerId, boolean>;
  selectedRoadId: string | null;
  selectedVehicleId: string | null;
  onSelectRoad: (roadId: string) => void;
  onSelectVehicle: (vehicleId: string) => void;
  className?: string;
}

export default function NerMap({
  data,
  layerVisibility,
  selectedRoadId,
  selectedVehicleId,
  onSelectRoad,
  onSelectVehicle,
  className,
}: NerMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MlMap | null>(null);
  const dataRef = useRef(data);
  const visRef = useRef(layerVisibility);
  const selRef = useRef({ selectedRoadId, selectedVehicleId });
  const cbRef = useRef({ onSelectRoad, onSelectVehicle });
  cbRef.current = { onSelectRoad, onSelectVehicle };

  // ---- init map once ---------------------------------------------------------
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new MlMap({
      container: containerRef.current,
      style: NER_BASE_STYLE as maplibregl.StyleSpecification,
      center: NER_CENTER,
      zoom: 4.8,
      maxBounds: MAP_MAX_BOUNDS as maplibregl.LngLatBoundsLike,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(
      new NavigationControl({ showCompass: false, visualizePitch: false }),
      "bottom-right",
    );
    map.addControl(new ScaleControl({ maxWidth: 96, unit: "metric" }), "bottom-left");

    map.on("load", () => {
      map.fitBounds(NER_BOUNDS as maplibregl.LngLatBoundsLike, { padding: 42, duration: 900 });
      addBaseLayers(map);
      addOverlayLayers(map);
      applyData(map, dataRef.current);
      applyVisibility(map, visRef.current);
      applySelection(map, selRef.current.selectedRoadId, selRef.current.selectedVehicleId);

      const roadLayers = ["roads-line", "corridors-line", "corridors-glow"];
      const vehicleLayers = ["vehicles-halo", "vehicles-dot"];
      for (const layer of roadLayers) {
        map.on("click", layer, (e) => {
          const id = e.features?.[0]?.properties?.roadId as string | undefined;
          if (id) cbRef.current.onSelectRoad(id);
        });
      }
      for (const layer of vehicleLayers) {
        map.on("click", layer, (e) => {
          const id = e.features?.[0]?.properties?.vehicleId as string | undefined;
          if (id) cbRef.current.onSelectVehicle(id);
        });
      }
      for (const layer of [...roadLayers, ...vehicleLayers]) {
        map.on("mouseenter", layer, () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", layer, () => (map.getCanvas().style.cursor = ""));
      }
    });

    const ro = new ResizeObserver(() => map.resize());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- data updates ------------------------------------------------------------
  useEffect(() => {
    dataRef.current = data;
    if (mapRef.current?.isStyleLoaded()) applyData(mapRef.current, data);
  }, [data]);

  // ---- visibility updates --------------------------------------------------------
  useEffect(() => {
    visRef.current = layerVisibility;
    if (mapRef.current?.isStyleLoaded()) applyVisibility(mapRef.current, layerVisibility);
  }, [layerVisibility]);

  // ---- selection highlight ---------------------------------------------------------
  useEffect(() => {
    selRef.current = { selectedRoadId, selectedVehicleId };
    if (mapRef.current?.isStyleLoaded())
      applySelection(mapRef.current, selectedRoadId, selectedVehicleId);
  }, [selectedRoadId, selectedVehicleId]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="NER regional map"
      role="application"
    />
  );
}
