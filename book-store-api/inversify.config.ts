import { Container } from 'inversify';
import { SERVICE_TYPES, CONTROLLER_TYPES } from './config/types';

import { IBookController, IUserController, ICategoryController } from './interfaces/controller';
import { BookController, UserController, CategoryController } from './controllers';

import { IBookService, IUserService, ICategoryService } from './interfaces/service';
import { BookService, UserService, CategoryService } from './services';

const appContainer = new Container();

appContainer.bind<IBookService>(SERVICE_TYPES.IBookService).to(BookService);
appContainer.bind<IBookController>(CONTROLLER_TYPES.IBookController).to(BookController);

appContainer.bind<IUserService>(SERVICE_TYPES.IUserService).to(UserService);
appContainer.bind<IUserController>(CONTROLLER_TYPES.IUserController).to(UserController);

appContainer.bind<ICategoryService>(SERVICE_TYPES.ICategoryService).to(CategoryService);
appContainer.bind<ICategoryController>(CONTROLLER_TYPES.ICategoryController).to(CategoryController);

export default appContainer;