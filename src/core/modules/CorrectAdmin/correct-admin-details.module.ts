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
          package: 'correct_admin',
          protoPath: join(__dirname, '../../../../protos/correct-admin.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  providers: [CorrectAdminDetailsUsecase],
  exports: [CorrectAdminDetailsUsecase],
})
export class CorrectAdminDetailsModule {}
