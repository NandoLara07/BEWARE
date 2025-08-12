export const formatAddress = (address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}) => {
  const complement = address.complement ? `, ${address.complement}` : "";

  return `${address.recipientName} • ${address.street}, ${address.number}${complement}, ${address.neighborhood}, ${address.city} - ${address.state} • CEP: ${address.zipCode}`;
};
