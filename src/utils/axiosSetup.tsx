import axios from "./axios";

interface reqTypeInterface {
    reqType : String;
    data : any;
}

const apiHelper = async(reqType : string, endpoint : string, data? : any, token? : boolean)  => {
    let headersData : any= {
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
      }
      if (token) {
        headersData = {
            headers : {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
          }
      }
    let result;
    switch(reqType) {
        case "get" : {
            let response = await axios.get(endpoint);
            console.log(response)
            result = response;
            break;
        }
        case "post" : {
            let response = await axios.post(endpoint, data, headersData);
            console.log(response)
            result = response;
            break;
        }
    }
    return result;
}

export default apiHelper;