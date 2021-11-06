//fetch 버전

export default class HttpClient {
    constructor(baseURL, authErrorEventBus, getCsrfToken) {
      this.baseURL = baseURL;
      this.authErrorEventBus = authErrorEventBus;
      this.getCsrfToken = getCsrfToken;
    }
  
    async fetch(url, options) {
      const res = await fetch(`${this.baseURL}${url}`, {
      
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          'school-csrf-token': this.getCsrfToken(),
        },
        credentials:'include',
      });
      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.error(error);
      }
  
      if (res.status > 299 || res.status < 200) {
        const message =
          data && data.message ? data.message : '뭔가 잘못됐어';
        const error = new Error(message);
        if(res.status === 401) {
            this.authErrorEventBus.notify(error);
            return;
        }

        throw error;
      }
      return data;
    }
  }
  