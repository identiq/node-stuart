import {post} from 'request';
import {stringify} from 'querystring';

const API_SANDBOX_URL = 'https://sandbox-api.stuart.com';
const API_URL = API_SANDBOX_URL;
const API_CLIENT_ID = '20ac9b646042b6aeb8e9c5b7f676e89f44dbd710b5d3930ef8be9c800af79921';
const API_SECRET = '0801f1f36de83780071d0ccded2f5e111f5ed783983a6fe57e7b580fec4fa122';
const API_SCOPE = 'api';
const API_GRANT = 'client_credentials';
const API_CONTENT_TYPE = 'application/x-www-form-urlencoded';
const TRANSPORT_TYPES_PARIS = [{id: 2, name: 'Bike', details: 'Maximum capacity of 80L (60cm x 40cm x 26cm) and 12kg'}];

class Point {
  address: string;
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  placeId: number;

  constructor(address: string, company?: string, firstname?: string, lastname?: string, email?: string, phone?: string, placeId?: number) {
    this.address = address;
    this.company = company;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.placeId = placeId;
  };
}

class Job {
  transportTypeIds: number;
  origin: Point;
  destination: Point;

  constructor(transportTypeIds: number, origin: Point, destination: Point) {
    this.transportTypeIds = transportTypeIds;
    this.origin = origin;
    this.destination = destination;
  }

  async createJobQuote(): Promise<object> {

    const ACCESS_TOKEN: any = await auth();

    return new Promise<object>(resolve => {

      post({
        url: `${API_URL}/v1/jobs/quotes/types`,
        headers: {
          'Content-Type': API_CONTENT_TYPE,
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        },
        body: stringify({
          transportTypeIds: this.transportTypeIds,
          origin: this.origin.address,
          originContactCompany: this.origin.company,
          destination: this.destination.address,
          destinationContactCompany: this.destination.company,
        })
      }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        resolve(JSON.parse(body));
      });
    });

  }
}

function auth(): Promise<object> {

  return new Promise<object>(resolve => {

    post({
      url: `${API_URL}/oauth/token`,
      headers: {
        'Content-Type': API_CONTENT_TYPE
      },
      body: stringify({client_id: API_CLIENT_ID, client_secret: API_SECRET, scope: API_SCOPE, grant_type: API_GRANT})
    }, (error, response, body) => {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);

      resolve(JSON.parse(body).access_token);
    });
  });
}

export async function createQuote(jobQuoteId: number, clientInvoiceReference?: string, clientReference?: string, comment?: string, destinationComment?: string, originComment?: string, photo?: string, pickupAt?: string) {

  const ACCESS_TOKEN: any = await auth();

  return new Promise<object>(resolve => {

    post({
      url: `${API_URL}/v1/jobs`,
      headers: {
        'Content-Type': API_CONTENT_TYPE,
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: stringify({jobQuoteId: jobQuoteId})
    }, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
      resolve(JSON.parse(body));
    });
  });
}

/*
let origin = new Point("23, rue des chantereines 93100 Montreuil", "IDENTIQ");
let destination = new Point("5 place de la bataille de stalingrad 75019 Paris", "POPCHEF");
let job = new Job(2, origin, destination);

job.createJobQuote().then((res) => {
  console.log(res);
});
*/