import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';

@Injectable()
export class AuthGuardAppUser implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    //chamar api de autenticação
    // try {
    //   const response = await api.post("/api/v1/jwt/decode", {
    //     token
    //   })

    //   request['user'] = response.data
    // } catch (err: any) {
    //   console.log({err})
    //   throw new UnauthorizedException()
    // }

    //chamar api local
    const TOKEN_SECRET = process.env.SECRET_KEY_TOKEN_APP_USER as string;
    const TOKEN_SECRET_CRYPTO = createHmac('sha256', TOKEN_SECRET).digest(
      'base64',
    );
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: TOKEN_SECRET_CRYPTO,
      });
      request['user'] = payload.appUser;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' || type === 'bearer' ? token : undefined;
  }
}
