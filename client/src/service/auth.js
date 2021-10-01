export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url,
      }),
    });
    return data;
  }

  async login(username, password) {
    
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    console.log('로그인 데이터',data)
    return data;
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
    });
  }

  async logout() {
    return this.http.fetch('/auth/logout', {
      method: 'POST',
    });
  }
  async csrfToken() {
    const resp = await this.http.fetch('/auth/csrf-token', {
      method: 'GET',
    });
    console.log('csrf 실행한다', resp);
    return resp.csrfToken;
  }
}