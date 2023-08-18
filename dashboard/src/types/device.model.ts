export interface Device {
  name: string;
  lat: string;
  long: string;
  device_type: string;
  comments: string;
  deviceSize: number;
  numberOfOccupants: number;
  solarRadiationFactor: number;
  powerOutputOfSolarPanel: number;
  region: string;
  registered_against: string;
}
