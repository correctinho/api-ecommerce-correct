import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CorrectAdminDetailsUsecase } from './usecases/correct-admin.usecase';

@Module({
  controllers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'CORRECT-ADMIN-DETAILS',
        transport: Transport.GRPC,
        options: {
          package: 'user_management',
          protoPath: join(process.cwd(), 'src/protos/users.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  providers: [CorrectAdminDetailsUsecase],
  exports: [CorrectAdminDetailsUsecase],
})
export class CorrectAdminDetailsModule {}
