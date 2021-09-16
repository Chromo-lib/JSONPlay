import axios from 'axios'
import LocalSettings from '../utils/LocalSettings';

export default class AirService {
  static async save ({ url, data, method, headers, date }) {
    
    const air_url = LocalSettings.getOne('air_url')
    const token = LocalSettings.getOne('air_token')

    if (token && air_url.length > 0 && token.length > 0) {

      const fields = {
        url,
        data: JSON.stringify(data),
        method,
        headers: JSON.stringify(headers || ''),
        date
      };

      const resp = await axios({
        url: air_url,
        method: 'POST',
        data: { fields },
        headers: { Authorization: 'Bearer ' + token, "Content-Type": "application/json" }
      });

      return resp.data.createdTime
    }
  }
}