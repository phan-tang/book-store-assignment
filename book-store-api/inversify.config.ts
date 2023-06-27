import { Container } from 'inversify';
import { TYPES } from './config/types';

import { IBookController } from './interfaces/controller';
import { BookControlller } from './controllers';

import { IBookService } from './interfaces/service';
import { BookService } from './services';

const appContainer = new Container();
appContainer.bind<IBookService>(TYPES.IBookService).to(BookService);
appContainer.bind<IBookController>(TYPES.IBookController).to(BookControlller);

export default appContainer;