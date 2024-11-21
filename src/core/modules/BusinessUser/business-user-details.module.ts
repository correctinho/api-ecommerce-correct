import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BusinessUserDetailsUsecase } from './usecases/business-user.usecase';

@Module({
  controllers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'BUSINESS-USER-DETAILS',
        transport: Transport.GRPC,
        options: {
          package: 'user_management',
          protoPath: join(process.cwd(), 'src/protos/users.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  providers: [BusinessUserDetailsUsecase],
  exports: [BusinessUserDetailsUsecase],
})
export class BusinessUserDetailsModule {}
