/* eslint-env browser */

import React from 'react';
import DeckGL from '@deck.gl/react';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { Toolbox } from '@nebula.gl/editor';
import { ViewMode } from '@nebula.gl/edit-modes';
import { Map } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = process.env.MapboxAccessToken;
const initialViewState = {
  longitude: -122.43,
  latitude: 37.775,
  zoom: 12,
};

export function Example() {
  const [geoJson, setGeoJson] = React.useState({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-122.46212548792364, 37.79026033616934],
              [-122.48435831844807, 37.77160302698496],
              [-122.45884849905971, 37.74414218845571],
              [-122.42863676726826, 37.76266965836386],
              [-122.46212548792364, 37.79026033616934],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-122.4136573004723, 37.78826678755718],
              [-122.44875601708893, 37.782670574261324],
              [-122.43793598592286, 37.74322062447909],
              [-122.40836932539945, 37.75125290412125],
              [-122.4136573004723, 37.78826678755718],
            ],
          ],
        },
      },
    ],
  });
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = React.useState([0]);
  const [mode, setMode] = React.useState(() => ViewMode);
  const [modeConfig, setModeConfig] = React.useState({});

  const layer = new EditableGeoJsonLayer({
    data: geoJson,
    mode,
    modeConfig,
    selectedFeatureIndexes,
    onEdit: ({ updatedData }) => {
      setGeoJson(updatedData);
    },
  });

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={{
          doubleClickZoom: false,
        }}
        layers={[layer]}
        getCursor={layer.getCursor.bind(layer)}
        onClick={(info) => {
          if (mode === ViewMode)
            if (info) {
              setSelectedFeatureIndexes([info.index]);
            } else {
              setSelectedFeatureIndexes([]);
            }
        }}
      >
        <Map mapboxAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>

      <Toolbox
        geoJson={geoJson}
        mode={mode}
        modeConfig={modeConfig}
        onSetMode={setMode}
        onSetModeConfig={setModeConfig}
        onImport={(imported) =>
          setGeoJson({
            ...geoJson,
            features: [...geoJson.features, ...imported.features],
          })
        }
        onSetGeoJson={setGeoJson}
      />
    </>
  );
}
