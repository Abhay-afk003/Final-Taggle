import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import { useSpring, animated } from 'react-spring';

const geoUrl =
  'https://raw.githubusercontent.com/d3/d3.github.com/master/world-110m.json';

const markers: { name: string; coordinates: [number, number] }[] = [
  { name: 'Guntur', coordinates: [80.43, 16.3] },
  { name: 'Incirlik', coordinates: [35.3213, 37.0017] },
  { name: 'Norway', coordinates: [8.4689, 60.472] },
  { name: 'Hundorp', coordinates: [9.9905, 61.555] },
  { name: 'Cubix', coordinates: [-99.1332, 19.4326] },
];

const lines = [
  { from: 'Guntur', to: 'Incirlik' },
  { from: 'Incirlik', to: 'Norway' },
  { from: 'Norway', to: 'Hundorp' },
  { from: 'Hundorp', to: 'Cubix' },
];

const Airplane = ({ from, to }: { from: [number, number]; to: [number, number] }) => {
  const { x } = useSpring({
    from: { x: from[0] },
    to: { x: to[0] },
    config: { duration: 2000 },
    loop: true,
  });

  return (
    <animated.g transform={x.to((x: number) => `translate(${x}, ${to[1]})`)}>
      <Marker coordinates={to}>
        <text fontSize="24" textAnchor="middle" fill="#fff">
          ✈️
        </text>
      </Marker>
    </animated.g>
  );
};


const WorldMap = () => {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 100,
        center: [0, 40],
      }}
      style={{
        width: '100%',
        height: '250px',
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#374151"
              stroke="#4B5563"
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={3} fill="#60A5FA" stroke="#fff" strokeWidth={1} />
        </Marker>
      ))}
      {lines.map((line, i) => {
        const fromMarker = markers.find((m) => m.name === line.from);
        const toMarker = markers.find((m) => m.name === line.to);
        if (!fromMarker || !toMarker) return null;
        return (
          <g key={i}>
            <Line
              from={fromMarker.coordinates}
              to={toMarker.coordinates}
              stroke="#60A5FA"
              strokeWidth={1}
            />
            <Airplane from={fromMarker.coordinates} to={toMarker.coordinates} />
          </g>
        );
      })}
    </ComposableMap>
  );
};

export default WorldMap;
