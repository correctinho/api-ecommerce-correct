import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppUserDetailsUsecase implements OnModuleInit {
  private appUserService;
  constructor(@Inject('APP-USER-DETAILS') private client: ClientGrpc) {}
  onModuleInit() {
    this.appUserService = this.client.getService('UsersService');
  }
  async getAppUser(uuid: string) {
    try {
      console.log('chatmou');
      const result = await firstValueFrom(
        this.appUserService.FindAppUser({ uuid }),
      );
      return result;
    } catch (err: any) {
      console.log('Erro ao buscar usuário', err);
      throw new UnauthorizedException('error');
    }
  }
}
