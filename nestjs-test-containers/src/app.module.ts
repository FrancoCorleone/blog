import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./database/database.module";
import {AccountModule} from "./account/account.module";

@Module({
    imports: [
        DatabaseModule,
        AccountModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
