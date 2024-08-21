/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { api } from "../axios/axios.config";

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException()


    try {
      const response = await api.post("/api/v1/jwt/decode", {
        token
      })

      request['user'] = response.data
    } catch (err: any) {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" || type === "bearer" ? token : undefined
  }

}
