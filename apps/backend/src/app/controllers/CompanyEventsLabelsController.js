import * as Yup from 'yup';

import CompanyEventsLabels from '../models/CompanyEventsLabels';
import CompanyEvents from '../models/CompanyEvents';
import Companies from '../models/Companies';
import Labels from '../models/Labels';

class CompanyEventsLabelsController {
  async index(_, res) {
    const companyEventsLabels = await CompanyEventsLabels.findAll();

    return res.json(companyEventsLabels);
  }

  async show(req, res) {
    const { company: company_id, company_event: events_id } = req.query;

    const companyEventsLabels = await CompanyEventsLabels.findOne({
      where: {
        company_events_id: events_id,
      },
      include: [
        {
          model: CompanyEvents,
          as: 'company_events',
          where: {
            id: events_id,
          },
          include: {
            model: Companies,
            as: 'company',
            where: {
              id: company_id,
            },
          },
        },
        {
          model: Labels,
          as: 'labels',
        },
      ],
    });

    return res.json(companyEventsLabels);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      company_events_id: Yup.string().required(),
      label_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Failed to validate request body' });
    }

    const { company_events_id: companyEventsId, label_id } = req.body;

    const companyEvents = await CompanyEvents.findByPk(companyEventsId);

    if (!companyEvents) {
      return res.status(400).json({ error: 'Company event not found' });
    }

    const labels = await Labels.findByPk(label_id);

    if (!labels) {
      return res.status(400).json({ error: 'Label not found' });
    }

    const companyEventsLabelsExists = await CompanyEventsLabels.findOne({
      where: {
        company_events_id: companyEventsId,
        label_id,
      },
    });

    if (companyEventsLabelsExists) {
      return res.status(400).json({ error: 'This association already exists' });
    }

    const companyEventsLabels = await CompanyEventsLabels.create(req.body);

    return res.json(companyEventsLabels);
  }

  async delete(req, res) {
    const { id } = req.params;

    await CompanyEventsLabels.destroy({ where: { id } });

    return res.status(200).json({ ok: 'Label x Event association deleted' });
  }
}

export default new CompanyEventsLabelsController();
