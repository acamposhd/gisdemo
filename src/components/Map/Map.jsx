import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
function Map() {
  let view;
  const MapElement = useRef(null);
  const MapRef = useRef(null);
  useEffect(() => {
    loadModules(
      ["esri/views/MapView", "esri/Map", "esri/config", "esri/widgets/Search"],
      {
        css: true,
      }
    ).then(([MapView, Map, esriConfig, Search]) => {
      esriConfig.apiKey =
        "AAPK9b5777dc768948a0a71a296f6c3d9f57HSIXJ24FHKtMt6XwPAH1fVjmVttqqE2gJQY3v6li1olYNczjABlYYGiCTypewCqT";
      const map = new Map({
        basemap: "dark-gray-vector",
        portalItem: {
          id: "d7e8cd6ae3854af6b2ed3a34609b8165",
        },
      });

      MapRef.current = map;

      view = new MapView({
        zoom: 14, //Zoom Level can be Between 0 to 23
        center: [-118.24, 34.05], //longitude, latitude
        container: MapElement.current,
        map: map, //map created above
      });
      const search = new Search({ view });

      view.ui.add(search, "top-right");

      console.log({ view });
    });
  }, []);

  const onChange = (value) => {
    MapRef.current.basemap = value;
  };

  useEffect(() => {
    console.log({ MapElement });
  }, [MapElement]);
  const map_types = [
    { name: "dark-gray" },
    { name: "dark-gray-vector" },
    { name: "topo-vector" },
    { name: "streets-navigation-vector" },
    { name: "hybrid" },
    { name: "topo" },
    { name: "oceans" },
    { name: "streets-relief-vector" },
    { name: "satellite" },
    { name: "streets" },
    { name: "gray-vector" },
    { name: "streets-night-vector" },
    { name: "osm" },
    { name: "streets-vector" },
    { name: "terrain" },
    { name: "national-geographic" },
    { name: "gray" },
  ];
  return (
    <>
      <select onChange={(e) => onChange(e.target.value)}>
        {map_types.map((map_type) => (
          <option key={map_type.name} value={map_type.name}>
            {map_type.name}
          </option>
        ))}
      </select>
      <div style={{ height: 690 }} ref={MapElement} />
    </>
  );
}
export default Map;
