import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppUserDetailsUsecase } from './usecases/app-user.usecase';

@Module({
  controllers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'APP-USER-DETAILS',
        transport: Transport.GRPC,
        options: {
          package: 'user_management',
          protoPath: join(process.cwd(), 'src/protos/users.proto'),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
  providers: [AppUserDetailsUsecase],
  exports: [AppUserDetailsUsecase],
})
export class AppUserDetailsModule {}
