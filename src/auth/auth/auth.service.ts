import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        `http://host.docker.internal:8080/auth/realms/${this.configService.get(
          'REALM',
        )}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: this.configService.get('CLIENT_ID'),
          client_secret: this.configService.get('CLIENT_SECRET'),
          grant_type: this.configService.get('GRANT_TYPE'),
          username,
          password,
        }),
      ),
    );

    return data;
  }
}
