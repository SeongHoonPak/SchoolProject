export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async signup(username, password, name, email, number) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        number,
      }),
    });
    return data;
  }

  async update(usernamed, username, password, name, email, number) {
    const data = await this.http.fetch('/auth/update', {
      method: 'POST',
      body: JSON.stringify({
        usernamed,
        username,
        password,
        name,
        email,
        number,
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

  async getUser(username) {
    const query = `?username=${username}`
    return this.http.fetch(`/auth/${query}`, {
      method: 'GET',
    });
  }
  async postUsermanner(username, count) {
    return this.http.fetch(`/auth/`, {
      method: 'POST',
      body: JSON.stringify({username, count})
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