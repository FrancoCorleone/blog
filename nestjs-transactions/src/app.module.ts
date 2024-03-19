import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from "./database/database.module";
import {AccountModule} from "./account/account.module";
import {AccountService} from "./account/account.service";

@Module({
    imports: [
        DatabaseModule,
        AccountModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
