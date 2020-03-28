import * as Yup from 'yup';

import Events from '../models/Events';
import Companies from '../models/Companies';
import CompanyEvents from '../models/CompanyEvents';

class CompanyEventsController {
  async show(req, res) {
    const { id: company_id } = req.params;

    const events = (await CompanyEvents.findAll()).filter(
      el => el.company_id.toString() === company_id
    );

    return res.json(events);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      company_id: Yup.string().required(),
      event_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Failed to login, check your parameters' });
    }

    const { company_id, event_id } = req.body;

    const company = await Companies.findByPk(company_id);

    if (!company) {
      return res.status(400).json({ error: 'Company not found' });
    }

    const event = await Events.findByPk(event_id);

    if (!event) {
      return res.status(400).json({ error: 'Event not found' });
    }

    const exists = await CompanyEvents.findOne({
      where: {
        company_id,
        event_id,
      },
    });

    if (exists) {
      return res
        .status(400)
        .json({ error: 'Event association already exists' });
    }

    const { id } = await CompanyEvents.create(req.body);

    return res.json({ id });
  }
}

export default new CompanyEventsController();
