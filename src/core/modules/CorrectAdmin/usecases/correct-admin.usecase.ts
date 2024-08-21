import {
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CorrectAdminDetailsUsecase implements OnModuleInit {
  private correctAdminService;
  constructor(@Inject('CORRECT-ADMIN-DETAILS') private client: ClientGrpc) {}
  onModuleInit() {
    this.correctAdminService = this.client.getService('CorrectAdminService');
  }

  async getCorrectAdmin(uuid: string) {
    try {
      const result = await firstValueFrom(
        this.correctAdminService.findCorrectAdmin({ uuid }),
      );
      return result;
    } catch (err: any) {
      console.log('Erro ao buscar usuário', err);
      throw new UnauthorizedException('error');
    }
  }
}
