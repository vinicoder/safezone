import * as Yup from 'yup';

import Events from '../models/Events';

class EventsController {
  async index(req, res) {
    const events = await Events.findAll();

    return res.json(events);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      start_date: Yup.string().required(),
      end_date: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, description, start_date } = await Events.create(req.body);

    return res.json({ id, description, start_date });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const { end_date } = req.body;

    const event = await Events.findByPk(id);

    if (!event) {
      return res.status(400).json({ error: 'Event does not exists' });
    }

    event.end_date = end_date;

    await event.save();

    return res.json(event);
  }
}

export default new EventsController();
