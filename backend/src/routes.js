import { Router } from 'express';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import CompanyController from './app/controllers/CompanyController';
import CompanyAdressController from './app/controllers/CompanyAddressController';
import EventsController from './app/controllers/EventsController';
import CompanyEventsController from './app/controllers/CompanyEventsController';
import LabelsController from './app/controllers/LabelsController';

import authMiddleweare from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleweare);

routes.get('/users', UsersController.index);
routes.put('/users', UsersController.update);

routes.get('/companies', CompanyController.index);
routes.post('/companies', CompanyController.store);

routes.get('/companies/:id', CompanyAdressController.index);
routes.post('/companies/:id', CompanyAdressController.store);

routes.get('/events', EventsController.index);
routes.post('/events', EventsController.store);
routes.put('/events/:id', EventsController.update);

routes.get('/events/:id', CompanyEventsController.show);
routes.post('/events/associate', CompanyEventsController.store);

routes.get('/labels', LabelsController.index);
routes.post('/labels', LabelsController.store);
routes.put('/labels/:id', LabelsController.update);
routes.delete('/labels/:id', LabelsController.delete);

export default routes;
