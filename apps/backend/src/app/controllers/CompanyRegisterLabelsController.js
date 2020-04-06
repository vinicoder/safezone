import * as Yup from 'yup';

import Companies from '../models/Companies';
import CompanyEventsLabels from '../models/CompanyEventsLabels';
import Users from '../models/Users';
import Events from '../models/Events';
import CompanyAddress from '../models/CompanyAddress';
import CompanyEvents from '../models/CompanyEvents';

class CompanyRegisterLabelsController {
  async store(req, res) {
    try {
      const { user } = req.body;
      /**
       * validate step
       */
      // validate user
      if (user) {
        const userSchema = Yup.object().shape({
          name: Yup.string().required(),
          email: Yup.string()
            .email()
            .required(),
          password: Yup.string()
            .required()
            .min(6),
        });

        if (!(await userSchema.isValid(user))) {
          return res.status(400).json({ error: 'Validation fails' });
        }

        const userExists = await Users.findOne({
          where: {
            email: user.email,
          },
        });

        if (userExists) {
          return res.status(400).json({ error: 'User already exists' });
        }
      }

      if (!user && !req.userId) {
        return res.status(400).json({ error: 'User not logged' });
      }

      // validate company
      const companySchema = Yup.object().shape({
        company: Yup.object().shape({
          location: Yup.object().shape({
            lat: Yup.number().required(),
            lng: Yup.number().required(),
          }),
          name: Yup.string().required('Selecione uma empresa'),
          place_id: Yup.string().required(),
        }),
      });

      if (!(await companySchema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Failed to validade company, check your parameters' });
      }

      // validate labels
      const labelsSchema = Yup.object().shape({
        labels: Yup.array()
          .of(Yup.number())
          .required('Selecione pelo menos uma situação'),
      });

      if (!(await labelsSchema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Failed to validade labels, check your parameters' });
      }

      /**
       * register user step
       */
      // if logged
      // if not logged
      const currentUser = user
        ? await Users.create(user)
        : await Users.findByPk(req.userId);

      /**
       * register company step
       */
      const { company } = req.body;

      // if company exist
      const companyExists = await Companies.findOne({
        where: {
          name: company.name,
        },
      });

      // if company not exist
      const currentCompany =
        companyExists ||
        (await Companies.create({
          name: company.name,
        }));

      /**
       * register company address step
       */
      const addressExists = CompanyAddress.findOne({
        where: {
          place_id: company.place_id,
        },
      });

      // if company address exist
      // if company address not exist
      const currentAddress =
        addressExists ||
        (await CompanyAddress.create({
          place_id: company.place_id,
          latitude: company.latitude,
          longitude: company.longitude,
          company_id: currentCompany.id,
        }));

      /**
       * register company in event
       */
      const currentEvent = await Events.findOne({
        where: {
          description: 'COVID-19',
        },
      });

      const companyEventExists = await CompanyEvents.findOne({
        where: {
          company_id: currentCompany.id,
          event_id: currentEvent.id,
        },
      });

      const currentCompanyEvent =
        companyEventExists ||
        (await CompanyEvents.create({
          company_id: currentCompany.id,
          event_id: currentEvent.id,
        }));

      /**
       * register labels in company
       */
      const { labels } = req.body;

      const currentLabels = await Promise.all(
        labels.map(async label_id => {
          const companyEventLabelExists = await CompanyEventsLabels.findOne({
            where: {
              company_events_id: currentCompanyEvent.id,
              label_id,
            },
          });

          const companyEventLabel =
            companyEventLabelExists ||
            (await CompanyEventsLabels.create({
              company_events_id: currentCompanyEvent.id,
              label_id,
            }));

          return companyEventLabel;
        })
      );

      return res.json({
        user,
        company: currentCompany,
        address: currentAddress,
        event: currentEvent,
        labels: currentLabels,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error:
          'Failed to complete all steps, check your parameters and try again',
      });
    }
  }
}

export default new CompanyRegisterLabelsController();
