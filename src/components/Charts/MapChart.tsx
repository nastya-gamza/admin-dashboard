import { useGetCustomersQuery } from '@/redux';
import { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

const geoUrl = 'https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json';

export const MapChart = () => {
  const {data} = useGetCustomersQuery('');
  const countriesToHighlight = [...new Set(data?.map(i => i.location))];
  
  const getColor = (countryName: string) => {
    return countriesToHighlight.includes(countryName) ? '#3056D3' : '#A9BDFF';
  };

  interface Position {
    coordinates: [number, number];
    zoom: number;
  }

  const [position, setPosition] = useState<Position>({ coordinates: [0, 0], zoom: 1 });

  const handleMoveEnd = (position: Position) => {
    setPosition(position)
  }

  return (
    <ComposableMap
      className='h-[325px] w-full'
      projectionConfig={{ rotate: [-50, 0, 0], scale: 200 }}>
      <ZoomableGroup zoom={position.zoom} center={position.coordinates} onMoveEnd={handleMoveEnd}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const countryName = geo.properties.name;
              const fillColor = getColor(countryName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: fillColor,
                      stroke: '#fff',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#3056D3',
                      stroke: '#fff',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#3056D3',
                      stroke: '#fff',
                      strokeWidth: 0.75,
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};
