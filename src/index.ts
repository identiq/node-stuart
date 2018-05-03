import Stuart from './stuart';

const API_SANDBOX_URL = 'https://sandbox-api.stuart.com';
const API_CLIENT_ID = '20ac9b646042b6aeb8e9c5b7f676e89f44dbd710b5d3930ef8be9c800af79921';
const API_SECRET = '0801f1f36de83780071d0ccded2f5e111f5ed783983a6fe57e7b580fec4fa122';
// const TRANSPORT_TYPES = ['bike', 'motorbike', 'car', 'cargobike', 'cargobikexl', 'motorbikexl'];

const stuart = new Stuart(API_SANDBOX_URL, {client_id: API_CLIENT_ID, client_secret: API_SECRET});

stuart.createJob({
  assignment_code: "",
  pickups: [{
    address: "1 Boulevard de Bonne Nouvelle, 75010 Paris, France",
    contact: {
      company: null,
      firstname: "Alexandre",
      lastname: "Rodriguez",
      phone: "+33627503308",
      email: "alexandre@identiq.net"
    }
  }],
  dropoffs: [{
    address: "1 Rue de Rivoli, 75004 Paris, France",
    contact: {
      company: "SASU IDENTIQ",
      firstname: "Alexandre",
      lastname: "Rodriguez",
      phone: "+33627503308",
      email: "alexandre@identiq.net"
    }
  }],
  transport_type: "bike"
})
  .then((res) => {
  //console.log(res.data);
  console.log(`Got a job for ${res.data.pricing.price_tax_included} ${res.data.pricing.currency}`);
}).catch((err) => {
  console.log(err.response.data);
});