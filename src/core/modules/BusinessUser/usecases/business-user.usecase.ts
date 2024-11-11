import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BusinessUserDetailsUsecase implements OnModuleInit {
  private businessUserService;
  constructor(@Inject('BUSINESS-USER-DETAILS') private client: ClientGrpc) {}
  onModuleInit() {
    this.businessUserService = this.client.getService('UsersService');
  }

  async getBusinessUser(uuid: string) {
    try {
      const result = await firstValueFrom(
        this.businessUserService.FindBusinessUser({ uuid }),
      );
      console.log({ result });
      return result;
    } catch (err: any) {
      console.log('Erro ao buscar usuário', err);
      throw new UnauthorizedException('error');
    }
  }
}
