export interface Profile {
  address: Address;
  email: string;
  firstName: string;
  lastName: string;
  maxJobDistance: number;
  phoneNumber: string;
  workerId: string;
}

export interface Address {
  formattedAddress: string;
  zoneId: string;
}
