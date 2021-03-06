import axios, {AxiosResponse} from 'axios';
import {stringify} from 'query-string';

export default class Stuart {

  client_id: string;
  api_scope: string;
  api_grant: string;
  client_secret: string;
  api_url: string;
  bearer: string;

  constructor(api_url: string = "https://api.stuart.com", credentials: { client_id: string, client_secret: string }) {

    if (!credentials.client_id) {
      throw new Error('API Client Id missing')
    }

    if (!credentials.client_secret) {
      throw new Error('API Client Secret missing')
    }

    this.api_scope = 'api';
    this.api_grant = 'client_credentials';
    this.api_url = api_url;
    this.client_id = credentials.client_id;
    this.client_secret = credentials.client_secret;
  }

  async authenticate(client_id: string, client_secret: string): Promise<void> {

    const response = await axios.post(`${this.api_url}/oauth/token`, {
      client_id: client_id,
      client_secret: client_secret,
      scope: this.api_scope,
      grant_type: this.api_grant
    }, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [(data) => {
        return stringify(data);
      }]
    });

    console.log(`Got a Bearer ${response.data.access_token}`);

    this.bearer = response.data.access_token;
  }

  async createJob(job: {
    transport_type: string,
    assignment_code: string,
    dropoffs: [
      {
        address: string
        contact: {
          company: string,
          email: string,
          firstname: string,
          lastname: string,
          phone: string
        }
      }
      ],
    pickups: [{
      address: string
      contact: {
        company: string,
        email: string,
        firstname: string,
        lastname: string,
        phone: string
      }
    }]
  }): Promise<AxiosResponse> {

    await this.authenticate(this.client_id, this.client_secret);

    return await axios.post(`${this.api_url}/v2/jobs`, {
      job: job
    }, {
      headers: {
        'Authorization': `Bearer ${this.bearer}`
      }
    });

  }
}

