import { Router } from 'express';

import UsersController from './app/controllers/UsersController';
import SessionController from './app/controllers/SessionController';
import CompanyController from './app/controllers/CompanyController';
import CompanyAdressController from './app/controllers/CompanyAddressController';
import EventsController from './app/controllers/EventsController';
import CompanyEventsController from './app/controllers/CompanyEventsController';
import LabelsController from './app/controllers/LabelsController';
import GendersController from './app/controllers/GendersController';
import CompanyEventsLabelsController from './app/controllers/CompanyEventsLabelsController';

import authMiddleweare from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionController.store);

routes.get('/companies', CompanyController.index);
routes.get('/labels', LabelsController.index);
routes.get('/genders', GendersController.index);

routes.use(authMiddleweare);

routes.get('/users', UsersController.index);
routes.put('/users', UsersController.update);

routes.post('/companies', CompanyController.store);

routes.get('/companies/:id', CompanyAdressController.index);
routes.post('/companies/:id', CompanyAdressController.store);

routes.get('/events', EventsController.index);
routes.post('/events', EventsController.store);
routes.put('/events/:id', EventsController.update);

routes.get('/events/:id', CompanyEventsController.show);
routes.post('/events/associate', CompanyEventsController.store);

routes.post('/labels', LabelsController.store);
routes.put('/labels/:id', LabelsController.update);
routes.delete('/labels/:id', LabelsController.delete);

routes.post('/genders', GendersController.store);
routes.put('/genders/:id', GendersController.update);
routes.delete('/genders/:id', GendersController.delete);

routes.get(
  '/companies/associations/events',
  CompanyEventsLabelsController.show
);
routes.get(
  '/companies/associations/events/all',
  CompanyEventsLabelsController.index
);
routes.post('/companies/events/new', CompanyEventsLabelsController.store);
routes.delete(
  '/comapnies/associations/events/delete/:id',
  CompanyEventsLabelsController.delete
);

export default routes;
